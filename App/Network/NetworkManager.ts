export enum HTTPMethod {
  get = 'GET',
  post = 'POST',
  patch = 'PATCH',
  delete = 'DELETE',
}

type HeadersType = {
  [key: string]: string;
};

type QueryParams = {
  [key: string]: string;
};

type HttpRequest<T> = {
  url?: string;
  query?: QueryParams;
  method?: HTTPMethod;
  body?: T;
  headers?: HeadersType | undefined;
};

export function createRequest<T>(
  request: Partial<HttpRequest<T>>,
): HttpRequest<T> {
  const defaultHeaders: HeadersType = {'Content-Type': 'application/json'};
  const defaultQuery: QueryParams = {};
  const defaultBody = undefined;
  const defaultMethod: HTTPMethod = HTTPMethod.get;

  return {
    url: request.url,
    method: request.method || defaultMethod,
    body: request.body || defaultBody,
    headers: request.headers || defaultHeaders,
    query: request.query || defaultQuery,
  };
}

export interface NetworkManager {
  request<T, R>(request: HttpRequest<T>): Promise<R>;
}

const NetworkManagerImpl: NetworkManager = {
  request: async <T, R>(request: HttpRequest<T>): Promise<R> => {
    const options: RequestInit = {method: request.method};

    if (request.headers) {
      options.headers = request.headers;
    }

    if (request.body) {
      options.body = JSON.stringify(request.body);
    }

    if (request.url) {
      let url = request.url;
      if (request.query) {
        const queryParamsAsString = Object.entries(request.query)
          .map(value => {
            return `${value[0]}=${value[1]}`;
          })
          .join('&');

        url = `${url}?${queryParamsAsString}`;
      }
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as R;
    }

    throw new Error(`Request error! No URL specified.`);
  },
};

export default NetworkManagerImpl;
