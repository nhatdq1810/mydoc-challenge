import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery';

describe('Gallery', () => {
  const likeImage = jest.fn();

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
    const favouriteImages = [renderGallery[0]];

    const wrapper = shallow(<Gallery renderGallery={renderGallery} favouriteImages={favouriteImages} likeImage={likeImage} />);
    const galleryComponent = wrapper.find('.gallery');
    const galleryItemComponent = wrapper.find('.galleryItem');
    const galleryImageComponent = wrapper.find('.galleryImage');
    const favouriteIconComponent = wrapper.find('.favouriteIcon');
    const fetchMoreButton = wrapper.find('.fetchMoreButton');

    expect(galleryComponent).toHaveLength(1);
    expect(galleryItemComponent).toHaveLength(2);
    expect(galleryImageComponent).toHaveLength(2);
    expect(galleryImageComponent.at(0).prop('src')).toBe('image1-url.jpg');
    expect(galleryImageComponent.at(0).prop('alt')).toBe(renderGallery[0].name);
    expect(favouriteIconComponent).toHaveLength(2);
    expect(favouriteIconComponent.at(0).prop('className')).toContain('active');
    expect(favouriteIconComponent.at(1).prop('className')).not.toContain('active');
    expect(fetchMoreButton).toHaveLength(0);
  });
});
