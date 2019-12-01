import React from 'react';
import { shallow } from 'enzyme';
import ItemDetailPopup from './ItemDetailPopup';

describe('ItemDetailPopup', () => {
  const props = {
    selectedCharacter: {
      thumbnail: {
        path: 'image',
        extension: 'jpg'
      },
      name: 'character A',
      id: 1,
      description: 'description',
      comics: {
        available: 1,
        items: [{ name: 'comic 1' }]
      },
      series: {
        available: 1,
        items: [{ name: 'series 1' }]
      },
      stories: {
        available: 1,
        items: [{ name: 'story 1' }]
      },
      events: {
        available: 1,
        items: [{ name: 'event 1' }]
      },
      urls: [
        { type: 'detail', url: 'detail url' },
        { type: 'wiki', url: 'wiki url' },
        { type: 'comiclink', url: 'comiclink url' },
      ]
    },
    closePopup: jest.fn(),
    likeCharacter: jest.fn(),
    isFavourite: false,
    goToSavedList: jest.fn(),
    showSavedListLink: false,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should not render anything when no selected item', () => {
    const wrapper = shallow(<ItemDetailPopup />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render item detail', () => {
    const wrapper = shallow(<ItemDetailPopup {...props} />);
    const popupHeader = wrapper.find('.popupHeader');
    const savedListLink = wrapper.find('.savedListLink');
    const sections = wrapper.find('section');
    const characterContent = sections.at(0);
    const refSection = sections.at(1);
    const comicSection = sections.at(2);
    const seriesSection = sections.at(3);
    const storySection = sections.at(4);
    const eventSection = sections.at(5);

    expect(popupHeader).toHaveLength(1);
    expect(popupHeader.children()).toHaveLength(2);
    expect(savedListLink).toHaveLength(0);
    expect(sections).toHaveLength(6);
    expect(characterContent.children()).toHaveLength(2);
    expect(refSection.children()).toHaveLength(2);
    expect(refSection.find('.sectionHeader').text()).toBe('References');
    expect(comicSection.children()).toHaveLength(2);
    expect(comicSection.find('.sectionHeader').text()).toBe('Comics');
    expect(seriesSection.children()).toHaveLength(2);
    expect(seriesSection.find('.sectionHeader').text()).toBe('Series');
    expect(storySection.children()).toHaveLength(2);
    expect(storySection.find('.sectionHeader').text()).toBe('Stories');
    expect(eventSection.children()).toHaveLength(2);
    expect(eventSection.find('.sectionHeader').text()).toBe('Events');
  });

  it('should call closePopup when clicking close button', () => {
    const wrapper = shallow(<ItemDetailPopup {...props} />);
    const closeButton = wrapper.find('[data-test-id="closePopupButton"]');

    closeButton.simulate('click');

    expect(props.closePopup).toHaveBeenCalledTimes(1);
  });

  it('should call likeCharacter when clicking save button', () => {
    const wrapper = shallow(<ItemDetailPopup {...props} />);
    const saveButton = wrapper.find('.saveButton');

    saveButton.simulate('click');

    expect(props.likeCharacter).toHaveBeenCalledTimes(1);
  });

  it('should show saved list link', () => {
    const wrapper = shallow(<ItemDetailPopup {...props} isFavourite showSavedListLink />);
    const savedListLink = wrapper.find('.savedListLink');

    savedListLink.simulate('click');

    expect(savedListLink).toHaveLength(1);
    expect(props.goToSavedList).toHaveBeenCalledTimes(1);
  });
});
