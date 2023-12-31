import {ApiGetItemsResponse} from '@Data/Entity/ApiGetItemsResponse';
import {API_BASE_URL} from '@env';
import {API} from '@Network/ServerConstants';
import NetworkManagerImpl, {HTTPMethod} from '@Network/NetworkManager';

interface NewsRemoteDataSource {
  getNewsItems(): Promise<ApiGetItemsResponse>;
}

const networkManager = NetworkManagerImpl;
const NewsRemoteDataSourceImpl: NewsRemoteDataSource = {
  getNewsItems: async (): Promise<ApiGetItemsResponse> => {
    const url = `${API_BASE_URL}${API.NEWS.searchByDate}`;
    const queryParams = {
      query: 'mobile',
    };

    const request = {
      url: url,
      query: queryParams,
      method: HTTPMethod.get,
      body: undefined,
      headers: undefined,
    };

    return await networkManager.request(request);
  },
};

export default NewsRemoteDataSourceImpl;
