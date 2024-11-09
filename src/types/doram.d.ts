export interface DoramasTypes {
  data: DataDoramas;
}

export interface DataDoramas {
  listDoramas: ListDorama[];
}

export interface ListDorama {
  _id: string;
  name: string;
  name_es: string;
  slug: string;
  languages: string[];
  isTVShow: boolean;
  poster_path: string;
  poster: any;
  __typename: string;
}
// Detail dorama types
export interface DoramaDetailTypes {
  data: DataDetail;
}

export interface DataDetail {
  detailDoramaById: DetailDoramaById;
}

export interface DetailDoramaById {
  _id: string;
  name: string;
  slug: string;
  name_es: string;
  rating: number;
  country: string;
  overview: string;
  episode_time: number;
  languages: string[];
  number_of_seasons: number;
  number_of_episodes: number;
  backdrop_path: string;
  backdrop: any;
  genres: Genre[];
  labels: Label[];
  poster_path: string;
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
// types episodes
export interface EpisodesTypes {
  data: DataEpisodes;
}

export interface DataEpisodes {
  paginationEpisode: PaginationEpisode;
}

export interface PaginationEpisode {
  count: number;
  items: Item[];
  pageInfo: PageInfo;
  __typename: string;
}

export interface Item {
  _id: string;
  name?: string;
  still_path: string;
  episode_number: number;
  season_number: number;
  air_date?: string;
  slug: string;
  serie_id: string;
  serie_slug: string;
  links_online: any[];
  season_poster: string;
  serie_poster: string;
  poster: any;
  backdrop: any;
  __typename: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  __typename: string;
}
// Search types
export interface SearchDoramaTypes {
  data: DataSearch;
}

export interface DataSearch {
  searchDorama: SearchDorama[];
  searchMovie: SearchMovie[];
}

export interface SearchDorama {
  _id: string;
  slug: string;
  name: string;
  name_es?: string;
  poster_path: string;
  rating: number;
  poster: any;
  episode_time: number;
  __typename: string;
}

export interface SearchMovie {
  _id: string;
  name: string;
  name_es: string;
  slug: string;
  runtime: number;
  rating: number;
  poster_path: string;
  poster?: string;
  __typename: string;
}
// Episode types links
export interface EpisodesLinksTypes {
  data: DataLinks;
}

export interface DataLinks {
  getEpisodeLinks: GetEpisodeLinks;
}

export interface GetEpisodeLinks {
  links_online: LinksOnline[];
  __typename: string;
}

export interface LinksOnline {
  page: string;
  link: string;
  lang: string;
  quality: number;
  server: number;
}
// Detail doramas by slug types
export interface DetailDoramaBySlugTypes {
  data: DataDetailSlug;
}

export interface DataDetailSlug {
  detailDorama: DetailDorama;
}

export interface DetailDorama {
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
