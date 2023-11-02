import NewsRepository from '../../Data/Repository/NewsRepository';
import {NewsItem} from '../Entity/NewsItem';

const repository = NewsRepository;

function filterDeletedItems(
  items: NewsItem[],
  deletedItems: string[],
): NewsItem[] {
  console.log('deletedItems', deletedItems);
  return items.filter(newsItem => {
    return !deletedItems.includes(newsItem.id);
  });
}

const execute = async (): Promise<NewsItem[]> => {
  const deletedItems = (await NewsRepository.getDeletedNewsItems()) ?? [];
  const localNewsItems = await repository.getNewsItems();
  try {
    const remoteNewsItems = await repository.getUpdatedNewsItems();
    repository.updateNewsItems(remoteNewsItems);
    return filterDeletedItems(remoteNewsItems, deletedItems);
  } catch (error) {
    console.log(error);
    return filterDeletedItems(localNewsItems, deletedItems);
  }
};

const GetUpdatedNewsItemsUseCase = {
  execute,
};

export default GetUpdatedNewsItemsUseCase;
