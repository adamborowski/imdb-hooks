import React from 'react';
import SearchPure from '../../../../common/components/antd/Search';
import { typeAheadAspect } from '../../aspects';

const Search = () => {
  const { dataSource, onSearch, cancel, onApply, value } = typeAheadAspect.useSearchInput();

  return (
    <SearchPure
      onDropdownVisibleChange={opened => !opened && cancel()}
      notFoundContent="No people found"
      value={value}
      dataSource={dataSource}
      onSearch={onSearch}
      onSelect={onApply}
      searchPrompt="Search for people..."
    />
  );
};
export default Search;
