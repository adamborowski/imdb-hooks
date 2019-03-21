import {toMovieListPage} from './features/movie-browser/routing';
import {toPersonListPage} from './features/people-browser/routing';
import {IMenuItem} from './common/misc';

export const menuConfiguration = [
    {
        link: toMovieListPage(),
        path: toMovieListPage(),
        label: 'Movies',
        icon: 'play-circle'
    },
    {
        link: toPersonListPage(),
        path: toPersonListPage(),
        label: 'People',
        icon: 'user'
    }
] as IMenuItem[];