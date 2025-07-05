import { describe, it, expect } from 'vitest';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from './consts';

describe('consts', () => {
  it('SITE_TITLE should be a non-empty string', () => {
    expect(typeof SITE_TITLE).toBe('string');
    expect(SITE_TITLE.length).toBeGreaterThan(0);
  });
  it('SITE_DESCRIPTION should be a non-empty string', () => {
    expect(typeof SITE_DESCRIPTION).toBe('string');
    expect(SITE_DESCRIPTION.length).toBeGreaterThan(0);
  });
  it('SITE_URL should be a valid URL', () => {
    expect(typeof SITE_URL).toBe('string');
    expect(SITE_URL.startsWith('http')).toBe(true);
  });
});
