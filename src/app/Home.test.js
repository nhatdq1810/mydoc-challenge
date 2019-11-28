import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import Search from './home/Search';
import Gallery from '../components/Gallery';

describe('Home', () => {
  it('should render nothing if path is not /', () => {
    const wrapper = shallow(<Home path="/abc" />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render Search and Gallery components', () => {
    const favouriteImages = [];

    const wrapper = shallow(<Home path="/" favouriteImages={favouriteImages} likeImage={jest.fn()} />);
    const searchComponent = wrapper.find(Search);
    const galleryComponent = wrapper.find(Gallery);

    expect(searchComponent).toHaveLength(1);
    expect(galleryComponent).toHaveLength(1);
  });
});
