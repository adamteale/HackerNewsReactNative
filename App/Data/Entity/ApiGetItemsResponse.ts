export interface ApiGetItemsResponse {
  exhaustive: ApiExhaustive;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  hits: ApiHit[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: ApiProcessingTimingsMS;
  query: ApiQuery;
  serverTimeMS: number;
}

export interface ApiExhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface ApiHit {
  _highlightResult: ApiHighlightResult;
  _tags: string[];
  author: string;
  comment_text: string;
  created_at: Date;
  created_at_i: number;
  objectID: string;
  parent_id: number;
  story_id: number;
  story_title: string;
  updated_at: Date;
  story_url?: string;
  children?: number[];
}

export interface ApiHighlightResult {
  author: ApiAuthor;
  comment_text: ApiAuthor;
  story_title: ApiAuthor;
  story_url?: ApiAuthor;
}

export interface ApiAuthor {
  matchLevel: ApiMatchLevel;
  matchedWords: ApiQuery[];
  value: string;
  fullyHighlighted?: boolean;
}

export enum ApiMatchLevel {
  Full = 'full',
  None = 'none',
}

export enum ApiQuery {
  Mobile = 'mobile',
}

export interface ApiProcessingTimingsMS {
  _request: ApiRequest;
  afterFetch: ApiAfterFetch;
  fetch: ApiFetch;
  total: number;
}

export interface ApiRequest {
  roundTrip: number;
}

export interface ApiAfterFetch {
  format: ApiFormat;
  merge: ApiFormat;
  total: number;
}

export interface ApiFormat {
  total: number;
}

export interface ApiFetch {
  query: number;
  total: number;
}
