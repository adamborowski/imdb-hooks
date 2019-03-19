import React, {ComponentType, MouseEvent} from 'react';
// @ts-ignore RouterContext not present
import {__RouterContext as RouterContext} from 'react-router-dom';
import * as H from 'history';

function isModifiedEvent<T>(event: MouseEvent<T>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export interface RequiredProps<T> {
  onClick?: (event: MouseEvent<T>) => void | null;
}

export interface EnhancedProps {
  to: H.LocationDescriptor;
  replace?: boolean;
  innerRef?: (node: HTMLAnchorElement | null) => void;
  target?: string;
}

export default function withLink<T, P extends RequiredProps<T>>(
  Component: ComponentType<P>
): ComponentType<P & EnhancedProps> {
  return class Link extends React.Component<P & EnhancedProps> {
    // static defaultProps: Partial<EnhancedProps&P> = {
    //   replace: false
    // };

    public render() {
      const { innerRef, replace, to, target, ...rest } = this
        .props as EnhancedProps;

      return (
        <RouterContext.Consumer>
          {(context: RouterContext) => (
            <Component
              {...rest as P}
              onClick={event => this.handleClick(event, context)}
            />
          )}
        </RouterContext.Consumer>
      );
    }

    private handleClick(event: MouseEvent<T>, context: RouterContext) {
      if (this.props.onClick) {
        this.props.onClick(event);
      }

      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        (!this.props.target || this.props.target === '_self') && // let browser handle "target=_blank" etc.
        !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();

        const method = this.props.replace
          ? context.history.replace
          : context.history.push;

        method(this.props.to);
      }
    }
  };
}
