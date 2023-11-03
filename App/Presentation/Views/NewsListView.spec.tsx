import React from 'react';
import {render, fireEvent, within} from '@testing-library/react-native';
import {useNewsListViewModel} from '@Presentation/ViewModel/useNewsListViewModel';
import NewsListView, {
  NewsListViewProps,
} from '@Presentation/Views/NewsListView';
import {randomDate, randomString} from '@Helper/TestHelperFunctions';
import {NewsItem} from '@Domain/Entity/NewsItem';

// Mock the hooks and components used in NewsListView
jest.mock('@Presentation/ViewModel/useNewsListViewModel');

describe('NewsListView.spec.ts', () => {
  const mockedResult: NewsItem[] = [
    {
      author: randomString(),
      id: randomString(),
      createdAt: randomDate(),
      title: randomString(),
      url: randomString(),
    },
    {
      author: randomString(),
      id: randomString(),
      createdAt: randomDate(),
      title: randomString(),
      url: randomString(),
    },
  ];

  const mockOnDeleteItem = jest.fn();
  const mockOnUpdateNewsItems = jest.fn();

  const mockedUseNewsListViewModel = useNewsListViewModel as jest.Mock;
  mockedUseNewsListViewModel.mockReturnValue({
    newsItems: mockedResult,
    onDeleteItem: mockOnDeleteItem,
    onUpdateNewsItems: mockOnUpdateNewsItems,
    refreshing: false,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Create a Stack Navigator
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
    setOptions: jest.fn(),
    dispatch: jest.fn(),
    isFocused: jest.fn(),
    canGoBack: jest.fn(),
    dangerouslyGetParent: jest.fn(),
    dangerouslyGetState: jest.fn(),
    getId: jest.fn(),
    getState: jest.fn(),
    getParent: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    replace: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
  };

  // Create an instance of NewsListViewProps
  const newsListViewProps: NewsListViewProps = {
    navigation: mockNavigation,
    route: {
      key: 'NewsList',
      name: 'NewsList',
      params: undefined,
    },
  };

  it('renders all items in the FlatList', () => {
    const {getAllByTestId} = render(<NewsListView {...newsListViewProps} />);

    // NewsItem component should have a "testID" prop set to 'NewsListCellView'
    const items = getAllByTestId('NewsListCellViewContainer');
    expect(items).toHaveLength(2); // Ensure the Flatlist rendered 2 items
    items.forEach((item, index) => {
      // Get the elements inside the item using the `within` function
      const {getByTestId} = within(item);
      const titleLabel = getByTestId('NewsListCellViewTitleLabel');
      expect(titleLabel.props.children).toBe(mockedResult[index].title);

      const dateAndAuthorLabel = getByTestId(
        'NewsListCellViewDateAndAuthorLabel',
      );
      const expectedDataAndAuthor = [
        mockedResult[index].author,
        ' - ',
        mockedResult[index].createdAt.toString(),
      ];
      expect(dateAndAuthorLabel.props.children).toStrictEqual(
        expectedDataAndAuthor,
      );
    });
  });

  it('should call the navigation.navigate method when pressed', () => {
    const {getAllByTestId} = render(<NewsListView {...newsListViewProps} />);

    getAllByTestId('NewsListCellViewPressable').forEach(item => {
      fireEvent.press(item);
      expect(mockNavigation.navigate).toBeCalled();
    });
    expect(mockNavigation.navigate).toBeCalledTimes(mockedResult.length);
  });

  it('should call onUpdateNewsItems when refresh control is called', async () => {
    const component = render(<NewsListView {...newsListViewProps} />);

    const scrollView = component.getByTestId('newsItemList');
    expect(scrollView).toBeDefined();

    const {refreshControl} = scrollView.props;
    refreshControl.props.onRefresh();

    expect(mockOnUpdateNewsItems).toHaveBeenCalledTimes(1);
  });

  // TODO: Add test for swipe to delete
  //
  //
});
