export interface CategoriesTypes {
  data: Data;
}

export interface Data {
  listGenres: ListGenre[];
}

export interface ListGenre {
  name: string;
  _id: string;
  slug?: string;
  __typename: string;
}
