import {makeApiGetItemsResponse} from '@Data/Entity/ApiGetItemsResponse+Helper';
import {newsDataMapper} from '@Data/Mapper/NewsDataMapper';
import {ApiHit} from '@Data/Entity/ApiGetItemsResponse';
import {NewsItem} from '@Domain/Entity/NewsItem';

describe('NewsDataMapper.spec.ts', () => {
  it('should map ApiGetItemsResponse to a NewsItem array', async () => {
    const mockApiResponse = makeApiGetItemsResponse();
    const expectedMappedResult = newsDataMapper.mapToNewsItems(mockApiResponse);

    const zipped: [ApiHit, NewsItem][] = mockApiResponse.hits.map(
      (item: ApiHit, index: number) => [item, expectedMappedResult[index]],
    );

    zipped.forEach((value: [ApiHit, NewsItem]) => {
      const apiHit = value[0];
      const newsItem = value[1];

      expect(apiHit.author).toEqual(newsItem.author);
      expect(apiHit.story_title).toEqual(newsItem.title);
      expect(apiHit.created_at).toEqual(newsItem.createdAt);
      expect(apiHit.story_url).toEqual(newsItem.url);
    });
  });
});
