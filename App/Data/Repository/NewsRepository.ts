import {NewsItem} from '../../Domain/Entity/NewsItem';
import NewsLocalDataSourceImpl from '../DataSource/NewsLocalDataSource';
import NewsRemoteDataSourceImpl from '../DataSource/NewsRemoteDataSource';
import {newsDataMapper} from '../Mapper/NewsDataMapper';

type NewsItemId = string;

const remote = NewsRemoteDataSourceImpl;
const local = NewsLocalDataSourceImpl;

interface NewsDataSource {
  getUpdatedNewsItems(): Promise<NewsItem[]>;
  getNewsItems(): Promise<NewsItem[]>;
  updateNewsItems(items: NewsItem[]): Promise<NewsItem[] | null>;
  getDeletedNewsItems(): Promise<NewsItemId[] | null>;
  updateDeletedNewsItems(items: NewsItemId[]): Promise<NewsItemId[] | null>;
}

const NewsRepository: NewsDataSource = {
  getUpdatedNewsItems: async (): Promise<NewsItem[]> => {
    return newsDataMapper.mapToNewsItems(await remote.getNewsItems());
  },

  getNewsItems: async (): Promise<NewsItem[]> => {
    return (await local.getNewsItems()) ?? [];
  },

  updateNewsItems: async (items: NewsItem[]): Promise<NewsItem[] | null> => {
    return await local.updateNewsItems(items);
  },

  getDeletedNewsItems: async (): Promise<NewsItemId[] | null> => {
    return await local.getDeletedNewsItems();
  },

  updateDeletedNewsItems: async (
    items: NewsItemId[],
  ): Promise<NewsItemId[] | null> => {
    return await local.updateDeletedNewsItems(items);
  },
};

export default NewsRepository;
