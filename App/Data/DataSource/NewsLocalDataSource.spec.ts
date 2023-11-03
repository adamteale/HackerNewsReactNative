import AsyncStorageImpl from '@Data/Storage/AsyncStorageImpl';
import NewsLocalDataSourceImpl from '@Data/DataSource/NewsLocalDataSource';

import {randomDate, randomString} from '@Helper/TestHelperFunctions';
import {makeApiGetItemsResponse} from '@Data/Entity/ApiGetItemsResponse+Helper';
import {NewsItem} from '@Domain/Entity/NewsItem';

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
});
