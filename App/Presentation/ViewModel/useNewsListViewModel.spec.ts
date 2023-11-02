import GetUpdatedNewsItemsUseCase from '../../Domain/UseCase/GetUpdatedNewsItemsUseCase';
import {randomDate, randomString} from '../../Helper/TestHelperFunctions';
import {NewsItem} from '../../Domain/Entity/NewsItem';
import {useNewsListViewModel} from './useNewsListViewModel';
import {renderHook, act, waitFor} from '@testing-library/react-native';

jest.mock('../../Domain/UseCase/GetNewsItemsUseCase');

describe('useNewsListViewModel.spec.ts', () => {
  const mockedGetNewsItemsUseCase = GetUpdatedNewsItemsUseCase as jest.Mocked<
    typeof GetUpdatedNewsItemsUseCase
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get an array of NewsItem from the GetNewsItemsUseCase', async () => {
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

    mockedGetNewsItemsUseCase.execute.mockResolvedValue(mockedResult);

    const {result} = renderHook(() => useNewsListViewModel());

    await waitFor(async () => {
      await result.current.onUpdateNewsItems();
      expect(result.current.newsItems).toEqual(mockedResult);
    });
  });
});
