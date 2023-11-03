import NewsRepository from '@Data/Repository/NewsRepository';
import {NewsItem} from '@Domain/Entity/NewsItem';

const repository = NewsRepository;

function filterDeletedItems(
  items: NewsItem[],
  deletedItems: string[],
): NewsItem[] {
  return items.filter(newsItem => {
    return !deletedItems.includes(newsItem.id);
  });
}

const execute = async (items: NewsItem[]): Promise<NewsItem[]> => {
  // Get ids of items marked for deletion
  const itemsToMarkAsDeleted = items.map(item => item.id);
  // Get ids of items previously marked for deletion from local storage
  const previouslyDeletedItems = (await repository.getDeletedNewsItems()) ?? [];
  const allItems = [...itemsToMarkAsDeleted, ...previouslyDeletedItems];
  // Updated list ids of items previously marked for deletion with new list
  const deletedItems =
    (await repository.updateDeletedNewsItems([...new Set(allItems)])) ?? [];

  const localNewsItems = await repository.getNewsItems();
  return filterDeletedItems(localNewsItems, deletedItems);
};

const UpdateDeletedNewsItemsUseCase = {
  execute,
};

export default UpdateDeletedNewsItemsUseCase;
