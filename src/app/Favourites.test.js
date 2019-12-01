import React from 'react';
import { shallow } from 'enzyme';
import Favourites from './Favourites';
import Gallery from '../components/Gallery';

describe('Favourites', () => {
  it('should render nothing when path is not /favourites', () => {
    const wrapper = shallow(<Favourites path="/" />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render gallery', () => {
    const favouriteCharacters = [{ id: 1 }];
    const likeCharacter = jest.fn();

    const wrapper = shallow(<Favourites path="/favourites" favouriteCharacters={favouriteCharacters} likeCharacter={likeCharacter} />);
    const galleryComponent = wrapper.find(Gallery);

    expect(galleryComponent).toHaveLength(1);
    expect(galleryComponent.prop('emptyMessage')).toBe('Nothing here!');
    expect(galleryComponent.prop('renderGallery')).toBe(favouriteCharacters);
    expect(galleryComponent.prop('favouriteCharacters')).toBe(favouriteCharacters);
  });
});

