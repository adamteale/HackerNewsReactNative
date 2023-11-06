import AsyncStorageImpl from '@Data/Storage/AsyncStorageImpl';
import NewsLocalDataSourceImpl from '@Data/DataSource/NewsLocalDataSource';

import {randomDate, randomString} from '@Helper/TestHelperFunctions';
import {NewsItem} from '@Domain/Entity/NewsItem';
import {LocalStorageKey} from '@Data/Storage/LocalStorageKey';

jest.mock('@Data/Storage/AsyncStorageImpl');

describe('NewsLocalDataSourceImpl', () => {
  const mockedLocalStorage = AsyncStorageImpl as jest.Mocked<
    typeof AsyncStorageImpl
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get a list of newsItems from local storage', async () => {
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
    mockedLocalStorage.get.mockResolvedValue(mockedResult);

    const result = await NewsLocalDataSourceImpl.getNewsItems();

    expect(result).toEqual(mockedResult);
  });

  it('should update a list of newsItems in local storage', async () => {
    const mockedItemsToStore: NewsItem[] = [
      // ... mocked items
    ];
    mockedLocalStorage.update.mockResolvedValue(mockedItemsToStore);

    const result = await NewsLocalDataSourceImpl.updateNewsItems(
      mockedItemsToStore,
    );

    expect(mockedLocalStorage.update).toBeCalledWith(
      LocalStorageKey.newsItems,
      mockedItemsToStore,
      false,
    );
    expect(result).toEqual(mockedItemsToStore);
  });

  it('should get a list of deleted news item ids from local storage', async () => {
    const mockedDeletedItemIds = ['1', '2', '3'];
    mockedLocalStorage.get.mockResolvedValue(mockedDeletedItemIds);

    const result = await NewsLocalDataSourceImpl.getDeletedNewsItems();

    expect(mockedLocalStorage.get).toBeCalledWith(
      LocalStorageKey.deletedNewsItems,
      false,
    );
    expect(result).toEqual(mockedDeletedItemIds);
  });

  it('should update a list of deleted news item ids in local storage', async () => {
    const mockedDeletedItemIds = ['1', '2', '3'];
    mockedLocalStorage.update.mockResolvedValue(mockedDeletedItemIds);

    const result = await NewsLocalDataSourceImpl.updateDeletedNewsItems(
      mockedDeletedItemIds,
    );

    expect(mockedLocalStorage.update).toBeCalledWith(
      LocalStorageKey.deletedNewsItems,
      mockedDeletedItemIds,
      false,
    );
    expect(result).toEqual(mockedDeletedItemIds);
  });
});
