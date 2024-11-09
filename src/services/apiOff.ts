import {listCountriesByPlatformsTypes} from "@/types/country";
import {EpisodesTypes} from "@/types/doram";
import {
  DetailDoramaGlobalType,
  PaginationDoramaTypes,
  SimilarDoramasType
} from "@/types/dorama";
import {
  DetailEpisodeGlobalType,
  NextEpisdodeType,
  PrevEpisdodeType
} from "@/types/episode";
import {DetailGenreTypes} from "@/types/genre";
import {DetailLabelTypes, listLabelsTypes} from "@/types/label";
import {DetailLangugueTypes} from "@/types/lang";
import {
  detailNetworkTypes,
  listNetworksTypes,
  NetworkType
} from "@/types/network";

class DramaApi {
  private url_base = process.env.API_URL as string;
  constructor() {}
  private async GetBase(query: Object) {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json"
    };
    const resp = await fetch(this.url_base, {
      method: "POST",
      body: JSON.stringify(query),
      headers,
      cache: "force-cache"
    });
    const data = await resp.json();
    return data;
  }
  async getListEpisodes(id: string) {
    const query = {
      operationName: "listEpisodesPagination",
      variables: {
        page: 1,
        perPage: 16,
        serie_id: String(id),
        season_number: 1
      },
      query:
        'query listEpisodesPagination($page: Int!, $serie_id: MongoID!, $season_number: Float!, $perPage: Int!) {\n  paginationEpisode(\n    page: $page\n    perPage: $perPage\n    sort: NUMBER_ASC\n    filter: {type_serie: "dorama", serie_id: $serie_id, season_number: $season_number}\n  ) {\n    count\n    items {\n      _id\n      name\n      still_path\n      episode_number\n      season_number\n      air_date\n      slug\n      serie_id\n      serie_slug\n      links_online\n      season_poster\n      serie_poster\n      poster\n      backdrop\n      __typename\n    }\n    pageInfo {\n      hasNextPage\n      __typename\n    }\n    __typename\n  }\n}'
    };
    const result: EpisodesTypes = await this.GetBase(query);
    return result?.data?.paginationEpisode?.items;
  }
  async getDetailDoramaBySlug(slug: string) {
    const query = {
      query: `query detailDorama($slug: String!) {
  detailDorama(filter: {slug: $slug}) {
    _id
    name
    slug
    cast
    names
    age_limit
    country
    number_of_seasons
    number_of_episodes
    episode_time
    name_es
    overview
    languages
    poster_path
    backdrop_path
    rating
    first_air_date
    isTVShow
    premiere
    poster
    trailer
    backdrop
    uploaders
    subbers
    schedule {
      startEmision
      endEmision
      days
      hour
      season
      episode
      __typename
    }
    genres {
      name
      slug
      __typename
    }
    labels {
      name
      slug
      __typename
    }
    __typename
  }
}`,
      variables: {slug: slug}
    };
    const result: DetailDoramaGlobalType = await this.GetBase(query);
    return result?.data?.detailDorama;
  }
  async getSimilarDoramas(id: string) {
    const query = {
      query: `query similarsDoramas($dorama_id: MongoID!) {
  similarsDoramas(dorama_id:$dorama_id) {
    _id
    name
    slug
    cast
    names
    age_limit
    country
    number_of_seasons
    number_of_episodes
    episode_time
    name_es
    overview
    languages
    poster_path
    backdrop_path
    rating
    first_air_date
    isTVShow
    premiere
    poster
    trailer
    backdrop
    uploaders
    subbers
    schedule {
      startEmision
      endEmision
      days
      hour
      season
      episode
      __typename
    }
    genres {
      name
      slug
      __typename
    }
    labels {
      name
      slug
      __typename
    }
    __typename
  }
}`,
      variables: {dorama_id: id}
    };
    const result: SimilarDoramasType = await this.GetBase(query);
    return result?.data?.similarsDoramas;
  }
  async getDetailEpisodeBySlug(slug: string) {
    const query = {
      query: `query detailEpisode($slug: String!) {
  detailEpisode(filter: {slug: $slug}) {
    id
    slug
    name
    name_es
    overview
    air_date
    date_string
    episode_number
    season_number
    still_path
    still_image
    languages
    links_online
    count_links
    type_serie
    serie_id
    serie_slug
    serie_name
    serie_name_es
    serie_backdrop_path
    serie_poster
    poster
    backdrop
    serie_tmdb
    season_id
    season_slug
    season_poster
    updatedAt
    countDownDate
    note
    premiere
    is_ova
    ova_number
    emision
    uploading
    pause
    commingSoon
    emision_days
    notShowDate
    vote_average
    vote_count
    _id
  }
}`,
      variables: {slug: slug}
    };
    const result: DetailEpisodeGlobalType = await this.GetBase(query);
    return result?.data?.detailEpisode;
  }
  async getNextEpisode(id: string) {
    const query = {
      query: `query nextEpisode($episode_id: MongoID!) {
  nextEpisode(episode_id: $episode_id) {
    _id
    name
    slug
    __typename
  }
}`,
      variables: {episode_id: id}
    };
    const result: NextEpisdodeType = await this.GetBase(query);
    return result.data.nextEpisode;
  }
  async getPrevEpisode(id: string) {
    const query = {
      query: `query prevEpisode($episode_id: MongoID!) {
  prevEpisode(episode_id: $episode_id) {
    _id
    name
    slug
    __typename
  }
}`,
      variables: {episode_id: id}
    };
    const result: PrevEpisdodeType = await this.GetBase(query);
    return result?.data?.prevEpisode;
  }
  async getDetailGenre(slug: string) {
    const query = {
      query: `query detailGenre($slug: String!) {
  detailGenre(filter: {slug: $slug}) {
    _id
    name
    slug
    id
    updatedAt
    number_of_series
    number_of_doramas
    number_of_movies
    number_of_animes
    number_of_films
    description
    types
    images
    images_doramas
    __typename
  }
}`,
      variables: {slug: slug}
    };
    const result: DetailGenreTypes = await this.GetBase(query);
    return result?.data?.detailGenre;
  }
  async paginationDramasByGenreId(id: string) {
    const query = {
      query: `query paginationDorama(
  $page: Int
  $perPage: Int
  $sort: SortFindManyDoramaInput
  $filter: FilterFindManyDoramaInput
) {
  paginationDorama(
    page: $page
    perPage: $perPage
    sort: $sort
    filter: $filter
  ) {
    count
    pageInfo {
      currentPage
      hasNextPage
      hasPreviousPage
      __typename
    }
    items {
      _id
      name
      name_es
      languages
      slug
      rating
      backdrop_path
      poster_path
      isTVShow
      backdrop
      __typename
    }
    __typename
  }
}`,
      variables: {
        page: 1,
        sort: "CREATEDAT_DESC",
        perPage: 20,
        filter: {genreId: id, isTVShow: false}
      }
    };
    const result: PaginationDoramaTypes = await this.GetBase(query);
    return result?.data?.paginationDorama;
  }
  async paginationDramasByCountry(country: string) {
    const query = {
      query: `query paginationDorama(
  $page: Int
  $perPage: Int
  $sort: SortFindManyDoramaInput
  $filter: FilterFindManyDoramaInput
) {
  paginationDorama(
    page: $page
    perPage: $perPage
    sort: $sort
    filter: $filter
  ) {
    count
    pageInfo {
      currentPage
      hasNextPage
      hasPreviousPage
      __typename
    }
    items {
      _id
      name
      name_es
      languages
      slug
      rating
      backdrop_path
      poster_path
      isTVShow
      backdrop
      __typename
    }
    __typename
  }
}`,
      variables: {
        page: 1,
        sort: "CREATEDAT_DESC",
        perPage: 20,
        filter: {country: country, isTVShow: false}
      }
    };
    const result: PaginationDoramaTypes = await this.GetBase(query);
    return result?.data?.paginationDorama;
  }
  async paginationDramasBynetworkId(id: string) {
    const query = {
      query: `query paginationDorama(
  $page: Int
  $perPage: Int
  $sort: SortFindManyDoramaInput
  $filter: FilterFindManyDoramaInput
) {
  paginationDorama(
    page: $page
    perPage: $perPage
    sort: $sort
    filter: $filter
  ) {
    count
    pageInfo {
      currentPage
      hasNextPage
      hasPreviousPage
      __typename
    }
    items {
      _id
      name
      name_es
      languages
      slug
      rating
      backdrop_path
      poster_path
      isTVShow
      backdrop
      __typename
    }
    __typename
  }
}`,
      variables: {
        page: 1,
        sort: "CREATEDAT_DESC",
        perPage: 20,
        filter: {networkId: id, isTVShow: false}
      }
    };
    const result: PaginationDoramaTypes = await this.GetBase(query);
    return result?.data?.paginationDorama;
  }
  async paginationDramasByLangId(id: string) {
    const query = {
      query: `query paginationDorama(
  $page: Int
  $perPage: Int
  $sort: SortFindManyDoramaInput
  $filter: FilterFindManyDoramaInput
) {
  paginationDorama(
    page: $page
    perPage: $perPage
    sort: $sort
    filter: $filter
  ) {
    count
    pageInfo {
      currentPage
      hasNextPage
      hasPreviousPage
      __typename
    }
    items {
      _id
      name
      name_es
      languages
      slug
      rating
      backdrop_path
      poster_path
      isTVShow
      backdrop
      __typename
    }
    __typename
  }
}`,
      variables: {
        page: 1,
        sort: "CREATEDAT_DESC",
        perPage: 20,
        filter: {bylanguage: id, isTVShow: false}
      }
    };
    const result: PaginationDoramaTypes = await this.GetBase(query);
    return result?.data?.paginationDorama;
  }
  async paginationDramasByLabelId(id: string) {
    const query = {
      query: `query paginationDorama(
  $page: Int
  $perPage: Int
  $sort: SortFindManyDoramaInput
  $filter: FilterFindManyDoramaInput
) {
  paginationDorama(
    page: $page
    perPage: $perPage
    sort: $sort
    filter: $filter
  ) {
    count
    pageInfo {
      currentPage
      hasNextPage
      hasPreviousPage
      __typename
    }
    items {
      _id
      name
      name_es
      languages
      slug
      rating
      backdrop_path
      poster_path
      isTVShow
      backdrop
      __typename
    }
    __typename
  }
}`,
      variables: {
        page: 1,
        sort: "CREATEDAT_DESC",
        perPage: 20,
        filter: {labelId: id, isTVShow: false}
      }
    };
    const result: PaginationDoramaTypes = await this.GetBase(query);
    return result?.data?.paginationDorama;
  }
  async getCountries() {
    const query = {
      query: `query listCountriesByPlatforms($platform: String!) {
  listCountriesByPlatforms(platform: $platform) {
    _id
    name
    slug
    flag
    code
    code_flix
    __typename
  }
}`,
      variables: {platform: "doramasgo"}
    };
    const result: listCountriesByPlatformsTypes = await this.GetBase(query);
    return result?.data?.listCountriesByPlatforms;
  }
  async getNetworks() {
    const query = {
      query: `query listNetworks {
  listNetworks(filter: {platform: "doramasgo"}, sort: NUMBER_DESC, limit: 30) {
    _id
    name
    slug
    __typename
  }
}
`
    };
    const result: listNetworksTypes = await this.GetBase(query);
    return result?.data.listNetworks;
  }
  async getNetworkBySlug(slug: string) {
    const query = {
      query: `query detailNetwork($slug: String!) {
  detailNetwork(filter: {slug: $slug}) {
    _id
    name
    slug
    __typename
  }
}`,
      variables: {slug: slug}
    };
    const result: detailNetworkTypes = await this.GetBase(query);
    return result?.data?.detailNetwork;
  }
  async getLabels() {
    const query = {
      query: `query listLabels {
  listLabels(filter: {platform: "doramasgo"}, sort: NUMBER_DESC) {
    _id
    name
    slug
    __typename
  }
}
`
    };
    const result: listLabelsTypes = await this.GetBase(query);
    return result?.data?.listLabels;
  }
  async getLabelBySlug(slug: string) {
    const query = {
      query: `query detailLabel($slug: String!) {
  detailLabel(filter: {slug: $slug}) {
    _id
    name
    slug
    __typename
  }
}`,
      variables: {slug: slug}
    };
    const result: DetailLabelTypes = await this.GetBase(query);
    return result?.data?.detailLabel;
  }
  async getLangBySlug(slug: string) {
    const query = {
      query: `query detailLangugue($slug: String!) {
  detailLangugue(filter: {slug: $slug}) {
    _id
    name
    slug
    flag
    code
    code_flix
    __typename
  }
}`,
      variables: {slug: slug}
    };
    const result: DetailLangugueTypes = await this.GetBase(query);
    return result?.data?.detailLangugue;
  }
}

export {DramaApi};
