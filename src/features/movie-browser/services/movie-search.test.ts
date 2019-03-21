import { findMovies } from './movie-search';

describe('movie-search', () => {
  describe('api learning tests', () => {
    it('can find by title', done => {
      findMovies('star', 0).subscribe(value => {
        expect(value.results.length).toBeGreaterThan(0);
        value.results.forEach(movie => {
          expect(movie.title.toLowerCase()).toContain('star');
        });
        done();
      });
    });
    it('can find by title and release year', done => {
      findMovies('love', 0, 2019).subscribe(value => {
        expect(value.results.length).toBeGreaterThan(0);
        value.results.forEach(movie => {
          expect(movie.title.toLowerCase()).toContain('love');
          expect(movie.release_date).toEqual(expect.stringMatching(/^2019/));
        });
        done();
      });
    });
  });
});
