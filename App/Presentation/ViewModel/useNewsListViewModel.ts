import {useEffect, useState} from 'react';
import GetUpdatedNewsItemsUseCase from '@Domain/UseCase/GetUpdatedNewsItemsUseCase';
import UpdateDeletedNewsItemsUseCase from '@Domain/UseCase/UpdateDeletedNewsItemsUseCase';
import {NewsItem} from '@Domain/Entity/NewsItem';

export const useNewsListViewModel = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    onUpdateNewsItems();
  }, []);

  const onUpdateNewsItems = async () => {
    setRefreshing(true);
    const result = await GetUpdatedNewsItemsUseCase.execute();
    setNewsItems(result);
    setRefreshing(false);
  };

  const onDeleteItem = async (item: NewsItem) => {
    const result = await UpdateDeletedNewsItemsUseCase.execute([item]);
    setNewsItems(result);
  };

  return {
    newsItems,
    onDeleteItem,
    onUpdateNewsItems,
    refreshing,
  };
};
