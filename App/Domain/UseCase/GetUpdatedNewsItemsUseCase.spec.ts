import NewsRepository from '@Data/Repository/NewsRepository';
import {randomDate, randomString} from '@Helper/TestHelperFunctions';
import {NewsItem} from '@Domain/Entity/NewsItem';
import GetUpdatedNewsItemsUseCase from './GetUpdatedNewsItemsUseCase';

jest.mock('../../Data/Repository/NewsRepository');

describe('GetUpdatedNewsItemsUseCase.spec.ts', () => {
  const mockedRepository = NewsRepository as jest.Mocked<typeof NewsRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of NewsItem', async () => {
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
    mockedRepository.getUpdatedNewsItems.mockResolvedValue(mockedResult);

    const result = await GetUpdatedNewsItemsUseCase.execute();

    expect(mockedRepository.getUpdatedNewsItems).toBeCalled();

    expect(result).toEqual(mockedResult);
  });
});
