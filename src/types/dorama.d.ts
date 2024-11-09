export interface DetailDoramaGlobalType {
  data: {
    detailDorama: DoramaType;
  };
}

export interface DoramaType {
  _id: string;
  name: string;
  slug: string;
  cast: Cast[];
  names: string;
  age_limit: number;
  country: string;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_time: number;
  name_es: string;
  overview: string;
  languages: string[];
  poster_path: string;
  backdrop_path: string;
  rating: number;
  first_air_date: string;
  isTVShow: boolean;
  premiere: boolean;
  poster: string;
  trailer: string;
  backdrop: any;
  uploaders: any[];
  subbers: any[];
  schedule: Schedule;
  genres: Genre[];
  labels: Label[];
  __typename: string;
}

export interface Cast {
  name: string;
  slug: string;
  ref: string;
  character: string;
  profile_path: string;
  id: number;
  gender: number;
}

export interface Schedule {
  startEmision: string;
  endEmision: any;
  days: string[];
  hour: any;
  season: any;
  episode: any;
  __typename: string;
}

export interface Genre {
  name: string;
  slug: string;
  __typename: string;
}

export interface Label {
  name: string;
  slug: string;
  __typename: string;
}
// Similar Dorama typese
export interface SimilarDoramasType {
  data: {
    similarsDoramas: DoramaType[];
  };
}
// Paginatio Dorama types by Genre Id
export interface PaginationDoramaTypes {
  data: {
    paginationDorama: {
      count: number;
      pageInfo: PageInfo;
      items: Partial<DoramaType>[];
      __typename: string;
    };
  };
}

export interface PageInfo {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  __typename: string;
}
