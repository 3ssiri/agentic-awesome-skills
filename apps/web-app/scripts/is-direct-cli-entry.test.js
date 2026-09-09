import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { isDirectCliEntry } from './is-direct-cli-entry.js';

describe('isDirectCliEntry', () => {
  it('matches percent-encoded module URLs against decoded argv paths', () => {
    const rawPath = path.resolve('/tmp/My Project/prerender-routes.js');
    const encodedUrl = 'file:///tmp/My%20Project/prerender-routes.js';

    expect(isDirectCliEntry(encodedUrl, rawPath)).toBe(true);
    expect(isDirectCliEntry(encodedUrl, '/tmp/My Project/prerender-routes.js')).toBe(true);
  });

  it('does not treat an importer process as the CLI entry', () => {
    expect(
      isDirectCliEntry(
        'file:///workspace/apps/web-app/scripts/prerender-routes.js',
        '/workspace/apps/web-app/node_modules/vitest/dist/cli.js',
      ),
    ).toBe(false);
  });

  it('returns false when argv is missing', () => {
    expect(isDirectCliEntry('file:///tmp/prerender-routes.js', '')).toBe(false);
    expect(isDirectCliEntry('file:///tmp/prerender-routes.js', undefined)).toBe(false);
  });
});
