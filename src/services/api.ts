import {CategoriesTypes} from "@/types/cat";
import jwt from "jsonwebtoken";
import {
  DetailDoramaBySlugTypes,
  DoramaDetailTypes,
  DoramasTypes,
  EpisodesLinksTypes,
  EpisodesTypes,
  SearchDorama,
  SearchDoramaTypes
} from "@/types/doram";
import {TokenDecodeTypes} from "@/types/other";

class DoramaApi {
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
  async getCategories() {
    const glq = {
      operationName: "listGenres",
      variables: {},
      query:
        'query listGenres {\n  listGenres(filter: {platform: "doramasgo"}, sort: NUMBER_DESC) {\n    name\n    _id\n    slug\n    __typename\n  }\n}'
    };
    const result: CategoriesTypes = await this.GetBase(glq);
    return result?.data?.listGenres;
  }
  async getNewDrama() {
    const query = {
      operationName: "listLastDoramas",
      variables: {limit: 15, filter: {isTVShow: false}},
      query:
        "query listLastDoramas($limit: Int, $filter: FilterFindManyDoramaInput) {\n  listDoramas(limit: $limit, sort: _ID_DESC, filter: $filter) {\n    _id\n    name\n    name_es\n    slug\n    languages\n    isTVShow\n    poster_path\n    poster\n    __typename\n  }\n}"
    };
    const result: DoramasTypes = await this.GetBase(query);
    return result?.data?.listDoramas;
  }
  async getDrama(id: string) {
    const query = {
      operationName: "detailDoramaModalById",
      variables: {
        _id: String(id)
      },
      query:
        "query detailDoramaModalById($_id: MongoID!) {\n  detailDoramaById(_id: $_id) {\n    _id\n    name\n    slug\n    name_es\n    rating\n    country\n    overview\n    episode_time\n    languages\n    number_of_seasons\n    number_of_episodes\n    backdrop_path\n    backdrop\n    genres {\n      name\n      slug\n      __typename\n    }\n    labels {\n      name\n      slug\n      __typename\n    }\n    __typename\n    poster_path\n  }\n}"
    };
    const result: DoramaDetailTypes = await this.GetBase(query);
    const episodes = await this.getListEpisodes(id);
    return {...result?.data?.detailDoramaById, episodes};
  }
  private async getListEpisodes(id: string) {
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
  async getSearchDorama(q: string) {
    const query = {
      operationName: "searchAll",
      variables: {input: String(q)},
      query:
        "query searchAll($input: String!) {\n  searchDorama(input: $input, limit: 5) {\n    _id\n    slug\n    name\n    name_es\n    poster_path\n    rating\n    poster\n    episode_time\n    __typename\n  }\n  searchMovie(input: $input, limit: 5) {\n    _id\n    name\n    name_es\n    slug\n    runtime\n    rating\n    poster_path\n    poster\n    __typename\n  }\n}"
    };
    const result: SearchDoramaTypes = await this.GetBase(query);
    return result?.data;
  }
  async getEpisodelinks(id: string) {
    const query = {
      operationName: "GetEpisodeLinks",
      variables: {id: id, app: "com.asiapp.doramasgo"},
      query:
        "query GetEpisodeLinks($id: MongoID!, $app: String) {\n  getEpisodeLinks(id: $id, app: $app) {\n    links_online\n    __typename\n  }\n}"
    };
    const result: EpisodesLinksTypes = await this.GetBase(query);
    return result?.data?.getEpisodeLinks?.links_online;
  }
  async getDramaBySlug(slug: string) {
    const query = {
      operationName: "detailDorama",
      variables: {slug: slug},
      query:
        "query detailDorama($slug: String!) {\n  detailDorama(filter: {slug: $slug}) {\n    _id\n    name\n    slug\n    cast\n    names\n    age_limit\n    country\n    number_of_seasons\n    number_of_episodes\n    episode_time\n    name_es\n    overview\n    languages\n    poster_path\n    backdrop_path\n    rating\n    first_air_date\n    isTVShow\n    premiere\n    poster\n    trailer\n    backdrop\n    uploaders\n    subbers\n    schedule {\n      startEmision\n      endEmision\n      days\n      hour\n      season\n      episode\n      __typename\n    }\n    genres {\n      name\n      slug\n      __typename\n    }\n    labels {\n      name\n      slug\n      __typename\n    }\n    __typename\n  }\n}"
    };
    const result: DetailDoramaBySlugTypes = await this.GetBase(query);
    return result?.data?.detailDorama;
  }
}

const getUrlVideo = (url: string) => {
  const tk = url.split("xyz/e/").pop() as string;
  const payload = jwt.decode(tk) as TokenDecodeTypes;
  const value = Buffer.from(payload.link, "base64").toString("utf-8");
  return value;
};
export {DoramaApi, getUrlVideo};
