export interface DetailGenreTypes {
  data: {
    detailGenre: GenreType;
  };
}

export interface GenreType {
  _id: string;
  name: string;
  slug: string;
  id: number[];
  updatedAt: string;
  number_of_series: number;
  number_of_doramas: number;
  number_of_movies: number;
  number_of_animes: number;
  number_of_films: number;
  description: any;
  types: string[];
  images: string[];
  images_doramas: string[];
  __typename: string;
}
