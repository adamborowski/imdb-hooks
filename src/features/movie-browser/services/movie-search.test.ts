import {findMoviesByPerson, findMoviesByTitle} from './movie-search';

describe('movie-search', () => {
  describe('api learning tests', () => {
    it('can find by title', done => {
      findMoviesByTitle('star', 0).subscribe(value => {
        expect(value.results.length).toBeGreaterThan(0);
        value.results.forEach(movie => {
          expect(movie.title.toLowerCase()).toContain('star');
        });
        expect(value).toMatchSnapshot();
        done();
      });
    });
    it('can find by title and release year', done => {
      findMoviesByTitle('love', 0, 2019).subscribe(value => {
        expect(value.results.length).toBeGreaterThan(0);
        value.results.forEach(movie => {
          expect(movie.title.toLowerCase()).toContain('love');
          expect(movie.release_date).toEqual(expect.stringMatching(/^2019/));
        });
        expect(value).toMatchSnapshot();
        done();
      });
    });
    it('can find by person', done => {
      findMoviesByPerson('chabior', undefined, 0).subscribe(value => {
        expect(value.results.length).toBeGreaterThan(0);
        value.results.forEach(person => {
          expect(person.name.toLowerCase()).toContain('chabior');
        });
        expect(value).toMatchSnapshot();
        done();
      });
    });
  });
});
