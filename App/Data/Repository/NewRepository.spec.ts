import NewsRemoteDataSourceImpl from '@Data/DataSource/NewsRemoteDataSource';
import {makeApiGetItemsResponse} from '@Data/Entity/ApiGetItemsResponse+Helper';

jest.mock('@Data/DataSource/NewsRemoteDataSource');

describe('NewsRepository.spec.ts', () => {
  const mockedRemoteDataSource = NewsRemoteDataSourceImpl as jest.Mocked<
    typeof NewsRemoteDataSourceImpl
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an ApiGetItemsResponse', async () => {
    const mockApiResponse = makeApiGetItemsResponse();

    mockedRemoteDataSource.getNewsItems.mockResolvedValue(mockApiResponse);

    const result = await NewsRemoteDataSourceImpl.getNewsItems();

    expect(mockedRemoteDataSource.getNewsItems).toBeCalled();

    expect(result).toEqual(mockApiResponse);
  });
});
