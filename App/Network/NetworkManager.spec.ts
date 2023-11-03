import NetworkManagerImpl, {HTTPMethod} from '@Network/NetworkManager';

let mockedFetch = jest.fn();

describe('NetworkManager.spec.ts', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockedFetch);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return a 200 status code with "2" in the response json', async () => {
    type MockRequestBody = {
      name: string;
    };

    type MockResponse = {
      id: number;
    };

    const request = {
      name: 'steve',
    };

    const mockJson = {
      id: 1234,
    };

    expect(fetch).toHaveBeenCalledTimes(0);

    mockedFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockJson),
    });

    const networkManager = NetworkManagerImpl;
    const response = await networkManager.request<
      MockRequestBody,
      MockResponse
    >({
      url: 'http://test.com',
      method: HTTPMethod.get,
      body: request,
      headers: undefined,
    });

    expect(response).toEqual(mockJson);
    expect(response.id).toEqual(mockJson.id);
  });
});
