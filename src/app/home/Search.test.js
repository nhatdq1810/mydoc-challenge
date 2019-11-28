import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search';

describe('Search', () => {
  it('should render input', () => {
    const searchQuery = 'test';

    const wrapper = shallow(<Search searchQuery={searchQuery} onSearchProps={{}} />);
    const inputSearch = wrapper.find('.inputSearch');
    const loadingIndicator = wrapper.find('.loadingIndicator');

    expect(inputSearch).toHaveLength(1);
    expect(inputSearch.prop('value')).toBe(searchQuery);
    expect(inputSearch.prop('placeholder')).toBe('Start searching for images!');
    expect(loadingIndicator).toHaveLength(0);
  });

  it('should render loading indicator', () => {
    const wrapper = shallow(<Search searchQuery="" onSearchProps={{}} isLoading />);
    const loadingIndicator = wrapper.find('.loadingIndicator');

    expect(loadingIndicator).toHaveLength(1);
  });
});
