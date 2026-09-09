import { describe, it, expect } from 'vitest';
import { buildSitemap, generateRobotsTxt, getSeoLandingPaths, selectTopSkillEntries } from './generate-sitemap.js';

describe('sitemap generation script helpers', () => {
  it('builds top skill entries sorted by stars/date/name without duplicates', () => {
    const catalog = [
      { id: 'alpha', stars: 5, date_added: '2026-01-01' },
      { id: 'beta', stars: 4, date_added: '2026-01-02' },
      { id: 'alpha', stars: 3, date_added: '2026-01-03' },
    ];

    const topEntries = selectTopSkillEntries(catalog, 5);

    expect(topEntries).toEqual(['/skill/alpha', '/skill/beta']);
  });

  it('builds sitemap XML with homepage and selected skill paths', () => {
    const catalog = [
      { id: 'gamma', stars: 2 },
      { id: 'delta', stars: 1 },
    ];

    const xml = buildSitemap(catalog, 1, 'https://example.com');

    expect(xml).toContain('https://example.com/</loc>');
    expect(xml).toContain('https://example.com/workbench/</loc>');
    expect(xml).toContain('https://example.com/topics/antigravity-cli-skills/</loc>');
    expect(xml).toContain('https://example.com/skill/gamma/</loc>');
    expect(xml).not.toContain('/skill/delta');
  });

  it('escapes XML reserved characters in generated sitemap URLs', () => {
    const catalog = [{ id: 'safe&id', stars: 10 }];

    const xml = buildSitemap(catalog, 1, 'https://example.com/search?q=ai&lang=en');

    expect(xml).toContain('https://example.com/search?q=ai&amp;lang=en/</loc>');
    expect(xml).toContain('/safe%26id/</loc>');
  });

  it('returns homepage, workbench, and topic routes when top skill limit is zero', () => {
    const catalog = [
      { id: 'gamma', stars: 2 },
      { id: 'delta', stars: 1 },
    ];

    const xml = buildSitemap(catalog, 0, 'https://example.com');

    expect(xml).toContain('https://example.com/</loc>');
    expect(xml).toContain('https://example.com/workbench/</loc>');
    expect(xml).toContain('https://example.com/topics/github-ai-skills-repository/</loc>');
    expect(xml).not.toContain('https://example.com/skill');
  });

  it('loads stable SEO landing paths from shared catalog data', () => {
    expect(getSeoLandingPaths()).toEqual(
      expect.arrayContaining([
        '/topics/antigravity-cli-skills/',
        '/topics/github-ai-skills-repository/',
        '/topics/antigravity-plugins/',
        '/topics/skills-para-antigravity/',
      ]),
    );
  });

  it('keeps the default public sitemap skill count reproducible', () => {
    const catalog = Array.from({ length: 43 }, (_, index) => ({
      id: `skill-${String(index).padStart(2, '0')}`,
      stars: 43 - index,
    }));

    const xml = buildSitemap(catalog, undefined, 'https://example.com');
    const skillRoutes = xml.match(/https:\/\/example\.com\/skill\//g) || [];

    expect(skillRoutes).toHaveLength(42);
    expect(xml).toContain('https://example.com/skill/skill-41/</loc>');
    expect(xml).not.toContain('https://example.com/skill/skill-42/</loc>');
  });

  it('rewrites robots.txt Sitemap to the live hosted catalog root', () => {
    const template = `User-agent: GPTBot
Allow: /

Sitemap: https://sickn33.github.io/agentic-awesome-skills/sitemap.xml
`;

    expect(generateRobotsTxt(template, 'https://3ssiri.github.io/agentic-awesome-skills')).toBe(
      `User-agent: GPTBot
Allow: /

Sitemap: https://3ssiri.github.io/agentic-awesome-skills/sitemap.xml
`,
    );
    expect(generateRobotsTxt(template, 'https://sickn33.github.io/agentic-awesome-skills/')).toContain(
      'Sitemap: https://sickn33.github.io/agentic-awesome-skills/sitemap.xml',
    );
  });

  it('rejects a robots.txt template without a Sitemap line', () => {
    expect(() => generateRobotsTxt('User-agent: *\nAllow: /\n', 'https://example.com')).toThrow(
      'robots.txt template must include a Sitemap line.',
    );
  });
});
