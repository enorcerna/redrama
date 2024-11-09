export interface DetailEpisodeGlobalType {
  data: Data;
}

export interface Data {
  detailEpisode: DetailEpisodeType;
}

export interface DetailEpisodeType {
  id: number;
  slug: string;
  name: string;
  name_es: string;
  overview: string;
  air_date: string;
  date_string: string;
  episode_number: number;
  season_number: number;
  still_path: string;
  still_image: any;
  languages: string[];
  links_online: LinksOnline[];
  count_links: any;
  type_serie: string;
  serie_id: string;
  serie_slug: string;
  serie_name: string;
  serie_name_es: string;
  serie_backdrop_path: string;
  serie_poster: string;
  poster: string;
  backdrop: any;
  serie_tmdb: number;
  season_id: string;
  season_slug: string;
  season_poster: string;
  updatedAt: string;
  countDownDate: any;
  note: any;
  premiere: boolean;
  is_ova: any;
  ova_number: any;
  emision: boolean;
  uploading: boolean;
  pause: boolean;
  commingSoon: boolean;
  emision_days: string[];
  notShowDate: boolean;
  vote_average: number;
  vote_count: number;
  _id: string;
}

export interface LinksOnline {
  page: string;
  server: string;
  lang: string;
  link: string;
}
// next episode types

export interface NextEpisdodeType {
  data: {
    nextEpisode: Pick<DetailEpisodeType, "_id" | "name" | "slug">;
  };
}
// prev episode types

export interface PrevEpisdodeType {
  data: {
    prevEpisode: Pick<DetailEpisodeType, "_id" | "name" | "slug">;
  };
}
