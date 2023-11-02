import {
  randomBoolean,
  randomDate,
  randomInt,
  randomString,
} from '../../Helper/TestHelperFunctions';

import {
  ApiHighlightResult,
  ApiHit,
  ApiProcessingTimingsMS,
  ApiFetch,
  ApiMatchLevel,
  ApiRequest,
  ApiAuthor,
  ApiQuery,
  ApiFormat,
  ApiAfterFetch,
  ApiGetItemsResponse,
} from './ApiGetItemsResponse';

const start = new Date(2023, 0, 1);
const end = new Date();

export function makeApiGetItemsResponse(): ApiGetItemsResponse {
  return {
    exhaustive: {
      nbHits: randomBoolean(),
      typo: randomBoolean(),
    },
    exhaustiveNbHits: randomBoolean(),
    exhaustiveTypo: randomBoolean(),
    hits: [makeApiHit()],
    hitsPerPage: randomInt(0, 10),
    nbHits: randomInt(0, 100),
    nbPages: randomInt(0, 100),
    page: randomInt(0, 100),
    params: 'query=mobile&advancedSyntax=true&analyticsTags=backend',
    processingTimeMS: randomInt(0, 100),
    processingTimingsMS: makeApiProcessingTimingsMS(),
    query: ApiQuery.Mobile,
    serverTimeMS: randomInt(0, 100),
  };
}

function makeApiHit(): ApiHit {
  return {
    _highlightResult: makeApiHighlightResult(),
    _tags: [randomString(10)],
    author: randomString(10),
    comment_text: randomString(10),
    created_at: randomDate(start, end),
    created_at_i: randomInt(1698688000, 1698688482),
    objectID: randomString(10),
    parent_id: randomInt(0, 100),
    story_id: randomInt(0, 100),
    story_title: randomString(10),
    updated_at: randomDate(start, end),
    story_url: randomString(10),
    children: [randomInt(0, 100)],
  };
}

function makeApiHighlightResult(): ApiHighlightResult {
  return {
    author: makeApiAuthor(),
    comment_text: makeApiAuthor(),
    story_title: makeApiAuthor(),
    story_url: makeApiAuthor(),
  };
}

function makeApiAuthor(): ApiAuthor {
  return {
    matchLevel: makeApiMatchLevel(),
    matchedWords: [ApiQuery.Mobile],
    value: randomString(10),
    fullyHighlighted: randomBoolean(),
  };
}

function makeApiProcessingTimingsMS(): ApiProcessingTimingsMS {
  return {
    _request: makeApiRequest(),
    afterFetch: makeApiAfterFetch(),
    fetch: makeApiFetch(),
    total: randomInt(0, 10),
  };
}

function makeApiMatchLevel(): ApiMatchLevel {
  if (Math.random() < 0.5) {
    return ApiMatchLevel.Full;
  }
  return ApiMatchLevel.None;
}

function makeApiRequest(): ApiRequest {
  return {
    roundTrip: randomInt(0, 10),
  };
}

function makeApiAfterFetch(): ApiAfterFetch {
  return {
    format: makeApiFormat(),
    merge: makeApiFormat(),
    total: randomInt(0, 10),
  };
}

function makeApiFormat(): ApiFormat {
  return {
    total: randomInt(0, 10),
  };
}

function makeApiFetch(): ApiFetch {
  return {
    query: randomInt(1, 10),
    total: randomInt(0, 10),
  };
}
