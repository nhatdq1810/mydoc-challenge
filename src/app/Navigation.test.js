import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

describe('Navigation', () => {
  const setPath = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render 2 nav items', () => {
    const wrapper = shallow(<Navigation path="/" setPath={setPath} favouriteCharactersSize={0} />);
    let navItems = wrapper.find('button');

    expect(navItems).toHaveLength(2);
    expect(navItems.at(0).prop('className')).toContain('active');
    expect(navItems.at(0).text()).toBe('Search');
    expect(navItems.at(1).prop('className')).not.toContain('active');
    expect(navItems.at(1).text()).toBe('Favourites');

    wrapper.setProps({ path: '/favourites', favouriteCharactersSize: 1 });
    navItems = wrapper.find('button');

    expect(navItems.at(0).prop('className')).not.toContain('active');
    expect(navItems.at(1).prop('className')).toContain('active');
    expect(navItems.at(1).text()).toBe('Favourites (1)');
  });

  it('should call setPath when click on each nav items', () => {
    const wrapper = shallow(<Navigation path="/" setPath={setPath} favouriteCharactersSize={0} />);
    const navItems = wrapper.find('button');
    const searchNavItem = navItems.at(0);
    const favouritesNavItem = navItems.at(1);

    favouritesNavItem.simulate('click');
    expect(setPath.mock.calls[0][0]).toBe('/favourites');

    searchNavItem.simulate('click');
    expect(setPath.mock.calls[1][0]).toBe('/');
  });
});

