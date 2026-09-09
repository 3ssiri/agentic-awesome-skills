import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { assertPrerenderedRouteIdentities } from './verify-seo-assets.js';
import {
  buildHomeMeta,
  buildTopicLandingMeta,
  getSiteBaseUrl,
  toCatalogRootUrl,
} from './prerender-routes.js';

function writeIdentityHtml(distDir, routeUrl, catalogRootUrl, meta) {
  const routePath = new URL(routeUrl).pathname.replace(new URL(catalogRootUrl).pathname, '');
  const filePath = path.join(distDir, routePath || '.', 'index.html');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const socialImageUrl = `${catalogRootUrl.replace(/\/$/, '')}/social-card.png`;
  fs.writeFileSync(
    filePath,
    `<html><head>
      <link rel="canonical" href="${routeUrl}" />
      <meta property="og:url" content="${routeUrl}" />
      <meta property="og:image" content="${socialImageUrl}" />
      <meta name="twitter:image" content="${socialImageUrl}" />
      <script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>
    </head></html>`,
  );
}

const CANONICAL_CATALOG_ROOT = 'https://sickn33.github.io/agentic-awesome-skills/';
const FORK_CATALOG_ROOT = 'https://3ssiri.github.io/agentic-awesome-skills/';
const PACKAGE_URL = 'https://www.npmjs.com/package/agentic-awesome-skills';

function collectJsonLd(meta) {
  return Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd];
}

function findJsonLd(meta, typeName) {
  return collectJsonLd(meta).find((entry) => entry?.['@type'] === typeName);
}

describe('prerender hosted catalog identity', () => {
  it('defaults the live site base to the canonical first-party catalog', () => {
    const previous = process.env.SEO_SITE_URL;
    delete process.env.SEO_SITE_URL;
    try {
      expect(getSiteBaseUrl()).toBe(CANONICAL_CATALOG_ROOT.replace(/\/$/, ''));
      expect(toCatalogRootUrl(getSiteBaseUrl())).toBe(CANONICAL_CATALOG_ROOT);
    } finally {
      if (previous === undefined) {
        delete process.env.SEO_SITE_URL;
      } else {
        process.env.SEO_SITE_URL = previous;
      }
    }
  });

  it('binds home and topic JSON-LD identities to a fork hosted catalog root', () => {
    const homeMeta = buildHomeMeta({
      catalogCount: 2000,
      imageUrl: `${FORK_CATALOG_ROOT}social-card.png`,
      canonicalUrl: FORK_CATALOG_ROOT,
    });
    const homeOrganization = findJsonLd(homeMeta, 'Organization');
    const homeSource = findJsonLd(homeMeta, 'SoftwareSourceCode');

    expect(homeOrganization.sameAs).toEqual([
      'https://x.com/AASkills_',
      PACKAGE_URL,
      FORK_CATALOG_ROOT,
    ]);
    expect(homeSource.sameAs).toEqual([
      FORK_CATALOG_ROOT,
      PACKAGE_URL,
    ]);
    expect(JSON.stringify(homeMeta.jsonLd)).not.toContain(CANONICAL_CATALOG_ROOT);

    const topicCanonical = `${FORK_CATALOG_ROOT}topics/github-ai-skills-repository/`;
    const topicMeta = buildTopicLandingMeta({
      page: {
        slug: 'github-ai-skills-repository',
        title: 'GitHub AI skills',
        description: 'Installable GitHub skills.',
        h1: 'GitHub AI skills',
        eyebrow: 'GitHub',
        keywords: ['github'],
        sections: [],
      },
      imageUrl: `${FORK_CATALOG_ROOT}social-card.png`,
      canonicalUrl: topicCanonical,
    });
    const topicOrganization = findJsonLd(topicMeta, 'Organization');
    const topicSource = findJsonLd(topicMeta, 'SoftwareSourceCode');
    const topicBreadcrumb = findJsonLd(topicMeta, 'BreadcrumbList');

    expect(topicOrganization.sameAs).toContain(FORK_CATALOG_ROOT);
    expect(topicSource.sameAs).toEqual([
      topicCanonical,
      FORK_CATALOG_ROOT,
      PACKAGE_URL,
    ]);
    expect(topicBreadcrumb.itemListElement[0].item).toBe(FORK_CATALOG_ROOT);
    expect(JSON.stringify(topicMeta.jsonLd)).not.toContain(CANONICAL_CATALOG_ROOT);
  });

  it('keeps canonical first-party JSON-LD identities when hosted on sickn33 Pages', () => {
    const homeMeta = buildHomeMeta({
      catalogCount: 2000,
      imageUrl: `${CANONICAL_CATALOG_ROOT}social-card.png`,
      canonicalUrl: CANONICAL_CATALOG_ROOT,
    });
    const homeOrganization = findJsonLd(homeMeta, 'Organization');
    const homeSource = findJsonLd(homeMeta, 'SoftwareSourceCode');

    expect(homeOrganization.sameAs).toContain(CANONICAL_CATALOG_ROOT);
    expect(homeSource.sameAs).toEqual([
      CANONICAL_CATALOG_ROOT,
      PACKAGE_URL,
    ]);
  });

  it('passes hosted SEO identity verification for fork home and topic JSON-LD', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-prerender-'));
    const distDir = path.join(tmpDir, 'dist');
    const imageUrl = `${FORK_CATALOG_ROOT.replace(/\/$/, '')}/social-card.png`;
    const homeMeta = buildHomeMeta({
      catalogCount: 2000,
      imageUrl,
      canonicalUrl: FORK_CATALOG_ROOT,
    });
    const topicCanonical = `${FORK_CATALOG_ROOT}topics/github-ai-skills-repository/`;
    const topicMeta = buildTopicLandingMeta({
      page: {
        slug: 'github-ai-skills-repository',
        title: 'GitHub AI skills',
        description: 'Installable GitHub skills.',
        h1: 'GitHub AI skills',
        eyebrow: 'GitHub',
        keywords: ['github'],
        sections: [],
      },
      imageUrl,
      canonicalUrl: topicCanonical,
    });

    writeIdentityHtml(distDir, FORK_CATALOG_ROOT, FORK_CATALOG_ROOT, homeMeta);
    writeIdentityHtml(distDir, topicCanonical, FORK_CATALOG_ROOT, topicMeta);

    expect(() => assertPrerenderedRouteIdentities(
      [FORK_CATALOG_ROOT, topicCanonical],
      distDir,
      '/agentic-awesome-skills',
      FORK_CATALOG_ROOT,
    )).not.toThrow();
  });
});
