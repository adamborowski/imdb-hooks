import {toMovieListPage} from '../../routing';
import {Icon} from 'antd';
import {fixBreadcrumb} from '../../../../common/workarounds';
import React from 'react';
import {BreadcrumbItem} from '../../../../common/components/antd/BreadcrumbItem';
import {QueryLink} from '../../../../common/hooks/useHistoryPush';
import {listAspect} from '../../aspects';

type ListPureProps = { searchValue?: string; searchParam: string };

export const ListPure = ({ searchParam, searchValue }: ListPureProps) => (
    <>
        <BreadcrumbItem>
            <QueryLink to={toMovieListPage()} queryParams={{[searchParam]: undefined}}>
                Movies
            </QueryLink>
        </BreadcrumbItem>
        {searchValue && (
            <BreadcrumbItem>
                <QueryLink to={toMovieListPage()}>
                    <Icon type="search" style={{marginRight: 5}}/>
                    {searchValue}
                </QueryLink>
            </BreadcrumbItem>
        )}
    </>
);

const List = () => {
  const searchValue = listAspect.useSearchValue();

  return <ListPure searchValue={searchValue} searchParam={listAspect.searchParam} />;
};

export default fixBreadcrumb(List);
