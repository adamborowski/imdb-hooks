import {IPlugin} from '../common/plugins';
import movieBrowser from './movie-browser';
import core from './core';

const features: IPlugin[] = [core, movieBrowser];
export default features;
