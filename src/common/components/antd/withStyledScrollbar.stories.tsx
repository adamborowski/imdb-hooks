import React, {HTMLProps} from 'react';
import withSublimeScrollbar from './withStyledScrollbar';
import {storiesOf} from '../../storiesOf';

const content = (
  <>
    <p>Menu content 1</p>
    <p>Menu content 2</p>
    <p>Menu content 3</p>
    <p>Menu content 4</p>
    <p>Menu content 5</p>
    <p>Menu content 6</p>
    <p>Menu content 7</p>
    <p>Menu content 8</p>
    <p>Menu content 9</p>
    <p>Menu content 10</p>
    <p>Menu content 11</p>
    <p>Menu content 12</p>
    <p>Menu content 13</p>
    <p>Menu content 14</p>
    <p>Menu content 15</p>
    <p>Menu content 16</p>
    <p>Menu content 17</p>
    <p>Menu content 18</p>
    <p>Menu content 19</p>
    <p>Menu content 20</p>
  </>
);
const Scroll = withSublimeScrollbar('light')((p: HTMLProps<HTMLDivElement>) => (
  <div {...p} />
));
const ScrollDark = withSublimeScrollbar('dark')(
  (p: HTMLProps<HTMLDivElement>) => <div {...p} />
);
const ScrollCustom = withSublimeScrollbar({ thumb: '#fcdf3f' })(
  (p: HTMLProps<HTMLDivElement>) => <div {...p} />
);

storiesOf(module)
  .add('default, light', () => (
    <Scroll style={{ height: 400, overflow: 'auto', background: '#333333' }}>
      {content}
    </Scroll>
  ))
  .add('dark', () => (
    <ScrollDark style={{ height: 400, overflow: 'auto' }}>{content}</ScrollDark>
  ))
  .add('custom theme', () => (
    <ScrollCustom style={{ height: 400, overflow: 'auto' }}>
      {content}
    </ScrollCustom>
  ));
