import {ApiGetItemsResponse, ApiHit} from '@Data/Entity/ApiGetItemsResponse';
import {NewsItem} from '@Domain/Entity/NewsItem';

function mapToNewsItem(value: ApiHit): NewsItem {
  return {
    author: value.author,
    createdAt: value.created_at,
    id: value.objectID,
    title: value.story_title,
    url: value.story_url,
  };
}

function mapToNewsItems(value: ApiGetItemsResponse): NewsItem[] {
  return value.hits.map(item => {
    return mapToNewsItem(item);
  });
}

export const newsDataMapper = {
  mapToNewsItem,
  mapToNewsItems,
};
