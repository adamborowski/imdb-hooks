import {toMovieListPage} from '../movie-browser/routing';
import {toPersonListPage} from '../people-browser/routing';
import {IMenuItem} from '../../common/getSelectedPaths';

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