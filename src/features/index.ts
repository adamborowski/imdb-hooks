import { IPlugin } from '../common/plugins';
import movieBrowser from './movie-browser';
import peopleBrowser from './people-browser';
import core from './core';

const features: IPlugin[] = [core, movieBrowser, peopleBrowser];
export default features;
