import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery';

describe('Gallery', () => {
  const props = {
    renderGallery: [{
      thumbnail: {
        path: 'image',
        extension: 'jpg'
      },
      name: 'character A',
      id: 1,
    }],
    favouriteCharacters: [],
    likeCharacter: jest.fn(),
    emptyMessage: '',
    onClickNextProps: {
      gallery: [], searchQuery: '', setGallery: jest.fn(),
      setIsLoadingMore: jest.fn(), paginationOffset: 0, setPaginationOffset: jest.fn(),
      setRenderGallery: jest.fn()
    },
    showPagination: false,
    isLoadingMore: false,
    onClickPrevProps: { gallery: [], setRenderGallery: jest.fn(), setPaginationOffset: jest.fn() },
    isStartOfGallery: false,
    isEndOfGallery: false,
    setPath: jest.fn(),
    showSavedListLink: false
  }

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

  it('should render pagination', () => {
    const wrapper = shallow(<Gallery {...props} showPagination />);
    const paginationButtons = wrapper.find('.paginationButton');
    const prevButton = paginationButtons.at(0);

    prevButton.simulate('click');

    expect(paginationButtons).toHaveLength(2);
    expect(props.onClickPrevProps.setPaginationOffset).toHaveBeenCalledTimes(1);
  });

  it('should not fetch more characters when characters are existed', () => {
    const gallery = [{}, {}, {}];
    const customProps = {
      ...props,
      showPagination: true,
      onClickNextProps: { ...props.onClickNextProps, gallery }
    };
    const wrapper = shallow(<Gallery {...customProps} />);
    const paginationButtons = wrapper.find('.paginationButton');
    const nextButton = paginationButtons.at(1);

    nextButton.simulate('click');

    expect(customProps.onClickNextProps.setPaginationOffset).toHaveBeenCalledTimes(1);
    expect(customProps.onClickNextProps.setRenderGallery).toHaveBeenCalledTimes(1);
    expect(customProps.onClickNextProps.setRenderGallery).toHaveBeenCalledWith(gallery);
  });

  it('should fetch more characters when characters are not existed', () => {
    const characters = [{}];
    global.fetch = jest.fn(() => Promise.resolve({
      status: 200,
      json: jest.fn(() => Promise.resolve({
        data: {
          results: characters,
          count: characters.length
        }
      }))
    }));
    const wrapper = shallow(<Gallery {...props} showPagination />);
    const paginationButtons = wrapper.find('.paginationButton');
    const nextButton = paginationButtons.at(1);

    nextButton.simulate('click');

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
