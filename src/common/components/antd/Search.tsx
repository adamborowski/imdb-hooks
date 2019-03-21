import React, { Component, ComponentType, memo, ReactNode, RefObject } from 'react';
import { AutoComplete, Input } from 'antd';
import withStyled from './Search.styled';
import { AutoCompleteProps, DataSourceItemType } from 'antd/es/auto-complete';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Assign } from 'utility-types';
import { SelectValue } from 'antd/lib/select';

type IProps = Assign<
  AutoCompleteProps,
  {
    dataSource: DataSourceItemType[];
    onSearch?: (searchText: string) => void;
    onSelect?: (value: SelectValue, option: Object) => any;
    value?: string;
    searchPrompt?: string;
    notFoundContent: ReactNode;
  }
>;

const chars = 'abcdefghijklmnoprstuwxyz0123456789'.split('');
const keys = [...chars, ...chars.map(x => 'shift+' + x)];
const focusKeys = ['ctrl+f'];

class Complete extends Component<IProps> {
  private ref: RefObject<AutoComplete>;
  static defaultProps = { searchPrompt: 'Search...' };

  constructor(props: IProps) {
    super(props);
    this.ref = React.createRef();
  }

  public render() {
    const { className, onSearch, onSelect, searchPrompt, ...rest } = this.props;
    return (
      <>
        <KeyboardEventHandler handleKeys={keys} onKeyEvent={this.handleKeyEvent} />
        <KeyboardEventHandler handleKeys={focusKeys} onKeyEvent={this.handleKeyEvent} handleFocusableElements />
        <AutoComplete
          tabIndex={0}
          ref={this.ref}
          className="certain-category-search"
          dropdownClassName={className}
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 300 }}
          size="large"
          style={{ width: 500 }}
          placeholder={searchPrompt}
          optionLabelProp="value"
          onSearch={onSearch}
          onSelect={onSelect}
          {...rest}
        >
          <Input />
        </AutoComplete>
      </>
    );
  }

  private handleKeyEvent = (char: string, e: KeyboardEvent) => {
    if (this.ref.current) {
      this.ref.current.focus();
      e.preventDefault();
    }
  };
}

export default memo(withStyled(Complete)) as ComponentType<IProps>;
