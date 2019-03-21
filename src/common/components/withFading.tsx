import classnames from 'classnames';
import React, {ComponentType} from 'react';
import styled from 'styled-components';

const FADED_CLASS_NAME_ACTIVE = 'fading-active';
const FADED_CLASS_NAME = 'fading';

interface IInjectProps {
  className?: string;
}

interface IEnhanceProps {
  loading: boolean;
}

interface IState {
  childrenProps: any;
}

export default function withFading<X>(passLoadingProp: boolean = false) {
  return (Component: ComponentType<X & IInjectProps>) => {
    const WithFading: ComponentType<
      X & IEnhanceProps & IInjectProps
    > = class extends React.Component<
      X & IEnhanceProps & IInjectProps,
      IState
    > {
      constructor(props: X & IEnhanceProps) {
        super(props);

        this.state = {
          childrenProps: props
        };
      }

      public static getDerivedStateFromProps = (
        nextProps: Readonly<X & IEnhanceProps>,
        prevState: IState
      ) => ({
        childrenProps: nextProps.loading ? prevState.childrenProps : nextProps
      });

      render() {
        const { loading, ...rest } = this.state.childrenProps as IEnhanceProps;
        const props = passLoadingProp ? this.state.childrenProps : rest;

        {
          const { className, ...rest } = props as IInjectProps;

          return (
            <Component
              {...rest as X & IEnhanceProps}
              className={classnames(className, FADED_CLASS_NAME, {
                [FADED_CLASS_NAME_ACTIVE]: this.props.loading
              })}
            />
          );
        }
      }
    };

    return styled(WithFading)`
      &.fading-active {
        opacity: 0.2 !important;
        transition: opacity 500ms !important;
        pointer-events: none;
      }

      &.fading {
        transition: opacity 500ms !important;
      }
    `;
  };
}
//todo do withFading only using HOOKS
