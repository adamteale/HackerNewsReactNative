import NewsRepository from '@Data/Repository/NewsRepository';
import {randomDate, randomString} from '@Helper/TestHelperFunctions';
import {NewsItem} from '@Domain/Entity/NewsItem';
import UpdateDeletedNewsItemsUseCase from './UpdateDeletedNewsItemsUseCase';

jest.mock('../../Data/Repository/NewsRepository');

const mockedRepository = NewsRepository as jest.Mocked<typeof NewsRepository>;

describe('UpdateDeletedNewsItemsUseCase.spec.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of NewsItem without deleted items', async () => {
    const mockedResult: NewsItem[] = [
      {
        author: randomString(),
        id: '1',
        createdAt: randomDate(),
        title: randomString(),
        url: randomString(),
      },
      {
        author: randomString(),
        id: '2',
        createdAt: randomDate(),
        title: randomString(),
        url: randomString(),
      },
      {
        author: randomString(),
        id: '3',
        createdAt: randomDate(),
        title: randomString(),
        url: randomString(),
      },
    ];

    mockedRepository.getDeletedNewsItems.mockResolvedValue([]);
    mockedRepository.updateDeletedNewsItems.mockResolvedValue(['2']);
    mockedRepository.getNewsItems.mockResolvedValue(mockedResult);

    const result = await UpdateDeletedNewsItemsUseCase.execute(mockedResult);

    expect(mockedRepository.getDeletedNewsItems).toBeCalled();
    expect(mockedRepository.updateDeletedNewsItems).toBeCalled();
    expect(mockedRepository.getNewsItems).toBeCalled();

    expect(result[0]).toEqual(mockedResult[0]);
  });
});
