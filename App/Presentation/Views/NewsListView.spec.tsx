import {randomDate, randomString} from '../../Helper/TestHelperFunctions';
import {NewsItem} from '../../Domain/Entity/NewsItem';
import {useNewsListViewModel} from '../ViewModel/useNewsListViewModel';
import {renderHook, act, waitFor} from '@testing-library/react-native';
import NewsListView from './NewsListView';

jest.mock('../../Domain/UseCase/GetNewsItemsUseCase');

describe('useNewsListView.spec.ts', () => {
  const mockedUseNewsListViewModel = useNewsListViewModel as jest.Mocked<
    typeof useNewsListViewModel
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should .....', async () => {
    const mockedResult: NewsItem[] = [
      {
        author: randomString(),
        createdAt: randomDate(),
        title: randomString(),
        url: randomString(),
      },
      {
        author: randomString(),
        createdAt: randomDate(),
        title: randomString(),
        url: randomString(),
      },
    ];

    mockedUseNewsListViewModel;

    const {result} = renderHook(() => NewsListView());
  });
});
