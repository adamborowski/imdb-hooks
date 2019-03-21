import {optional} from './utils';

describe('utils', () => {
  describe('when working with strings', () => {
    it('returns value if set', () => expect(optional('override', 'default')).toBe('override'));
    it('returns empty string if empty string is set', () => expect(optional('', 'default')).toBe(''));
    it('returns default if current not defined', () => expect(optional(undefined, 'default')).toBe('default'));
  });
});
