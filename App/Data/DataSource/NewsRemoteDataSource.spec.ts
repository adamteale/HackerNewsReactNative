import NewsRemoteDataSourceImpl from './NewsRemoteDataSource';

import NetworkManagerImpl, {HTTPMethod} from '@Network/NetworkManager';
import {API_BASE_URL} from '@env';
import {API} from '@Network/ServerConstants';
import {makeApiGetItemsResponse} from '@Data/Entity/ApiGetItemsResponse+Helper';

jest.mock('../../Network/NetworkManager');

describe('NewsRemoteDataSourceImpl', () => {
  const mockedNetworkManager = NetworkManagerImpl as jest.Mocked<
    typeof NetworkManagerImpl
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the correct endpoint with the correct parameters', async () => {
    const mockResponse = makeApiGetItemsResponse();
    mockedNetworkManager.request.mockResolvedValue(mockResponse);

    const expectedUrl = `${API_BASE_URL}${API.NEWS.searchByDate}`;
    const expectedQueryParams = {
      query: 'mobile',
    };
    const expectedRequest = {
      url: expectedUrl,
      query: expectedQueryParams,
      method: HTTPMethod.get,
      body: undefined,
      headers: undefined,
    };

    const result = await NewsRemoteDataSourceImpl.getNewsItems();

    expect(mockedNetworkManager.request).toHaveBeenCalledWith(expectedRequest);

    expect(result).toEqual(mockResponse);
  });
});
