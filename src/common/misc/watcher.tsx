/*
// https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/#comments

    This is a redux utility which watches selectors values changes and calls a callback.
    This is useful when you need to trigger async action based on changes in state not actions themsalf.
    It was made to work with cache. For example: when new chart appeared, or it's properties changed, we propably need to fetch new data for this chart.
 */

import * as React from 'react';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';


export type WatcherSpec = { selector: any; callback: any; lastSelection: any[] };
export const createWatcher: (selector: any, callback: any) => WatcherSpec = (selector: any, callback: any) => ({selector, callback, lastSelection: []});


class Watcher extends React.Component {
    unsubscribeStore: any;
    static contextTypes = {
      store: PropTypes.any
    };


    componentDidMount(): void {
        this.unsubscribeStore   = (this as any).context.store.subscribe(this.handleChange);
        this.handleChange(); // force watcher calculation when mounting
    }

    componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    componentWillReceiveProps(newProps : string): void {
        // @ts-ignore
        if (newProps.match !== this.props.match ) {
            // @ts-ignore
            this.handleChange(newProps)
        }
    }


    handleChange = ({history, match, watchers}: Readonly<{ children?: React.ReactNode }> & Readonly<any> = this.props): void => {

        const {store} = (this as any).context;
//@ts-ignore
        Promise.resolve(1).then(() => {

            const newState = store.getState();
            const location = history.location;
            const actions: any[] = [];

            // @ts-ignore
            watchers.forEach(watcher => {

                const newSelection = watcher.selector(newState, location, match);

                if (!_.isEqual(newSelection, watcher.lastSelection)) {
                    const returnedActions = watcher.callback(watcher.lastSelection, newSelection, store.dispatch);

                    if (returnedActions) {
                        actions.push(...Array.isArray(returnedActions) ? returnedActions : [returnedActions]);
                    }
                }

                watcher.lastSelection = newSelection;
            });

            actions.forEach(a => store.dispatch(a))

        });

    };

    render(): React.ReactNode | undefined {
        return this.props.children;
    }
}

// @ts-ignore
export const RoutingAwareWatcher = withRouter(Watcher);
