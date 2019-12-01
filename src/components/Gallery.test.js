import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery';

describe('Gallery', () => {
  const likeCharacter = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should not render when no gallery', () => {
    const wrapper = shallow(<Gallery />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render empty state when gallery is empty', () => {
    const emptyMessage = 'empty';

    const wrapper = shallow(<Gallery renderGallery={[]} emptyMessage={emptyMessage} />);
    const emptyState = wrapper.find('.emptyState');
    const galleryComponent = wrapper.find('.gallery');

    expect(emptyState).toHaveLength(1);
    expect(emptyState.text()).toBe(emptyMessage);
    expect(galleryComponent).toHaveLength(0);
  });

  it('should render gallery', () => {
    const renderGallery = [
      { id: 1, name: 'name', thumbnail: { path: 'image1-url', extension: 'jpg' } },
      { id: 2, name: 'name2', thumbnail: { path: 'image2-url', extension: 'jpg' } },
    ];
    const favouriteCharacters = [renderGallery[0]];

    const wrapper = shallow(
      <Gallery
        renderGallery={renderGallery}
        favouriteCharacters={favouriteCharacters}
        likeCharacter={likeCharacter}
      />
    );
    const galleryComponent = wrapper.find('.gallery');
    const galleryItemComponent = wrapper.find('.galleryItem');
    const galleryImageComponent = wrapper.find('.galleryImage');

    expect(galleryComponent).toHaveLength(1);
    expect(galleryItemComponent).toHaveLength(2);
    expect(galleryImageComponent).toHaveLength(2);
    expect(galleryImageComponent.at(0).prop('src')).toBe('image1-url.jpg');
    expect(galleryImageComponent.at(0).prop('alt')).toBe(renderGallery[0].name);
  });
});
