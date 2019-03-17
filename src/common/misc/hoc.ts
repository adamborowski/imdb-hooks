import React, { ComponentType } from 'react';
import { Assign, Subtract } from 'utility-types';

export type HOCInnerType<P> = React.ComponentType<P>;

export type HOCOuterType<
  P extends I,
  I extends object,
  E extends object
> = ComponentType<Assign<Subtract<P, I>, E>>;

export type HOCOuterType2<
  TProps extends TInnerProps & TPassProps,
  TInnerProps extends object = {},
  TOuterProps extends object = {},
  TPassProps extends object = {}
> = ComponentType<
  Assign<Subtract<TProps, TInnerProps>, TOuterProps & TPassProps>
>;
