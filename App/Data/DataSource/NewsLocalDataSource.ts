import {NewsItem} from '@Domain/Entity/NewsItem';
import KeychainStorageImpl from '@Data/Storage/KeychainStorageImpl';
import {LocalStorageKey} from '@Data/Storage/LocalStorageKey';
import AsyncStorageImpl from '@Data/Storage/AsyncStorageImpl';

type NewsItemId = string;

interface NewsLocalDataSource {
  getNewsItems(): Promise<NewsItem[] | null>;
  updateNewsItems(items: NewsItem[]): Promise<NewsItem[] | null>;

  getDeletedNewsItems(): Promise<NewsItemId[] | null>;
  updateDeletedNewsItems(items: NewsItemId[]): Promise<NewsItemId[] | null>;
}

const localKeychainStorage = new KeychainStorageImpl();
const localAsyncStorage = AsyncStorageImpl;

const NewsLocalDataSourceImpl: NewsLocalDataSource = {
  getNewsItems: async (): Promise<NewsItem[] | null> => {
    return await localAsyncStorage.get(LocalStorageKey.newsItems, false);
  },

  updateNewsItems: async (items: NewsItem[]): Promise<NewsItem[] | null> => {
    return await localAsyncStorage.update(
      LocalStorageKey.newsItems,
      items,
      false,
    );
  },

  getDeletedNewsItems: async (): Promise<NewsItemId[] | null> => {
    return await localAsyncStorage.get(LocalStorageKey.deletedNewsItems, false);
  },

  updateDeletedNewsItems: async (
    items: NewsItemId[],
  ): Promise<NewsItemId[] | null> => {
    return await localAsyncStorage.update(
      LocalStorageKey.deletedNewsItems,
      items,
      false,
    );
  },
};

export default NewsLocalDataSourceImpl;
