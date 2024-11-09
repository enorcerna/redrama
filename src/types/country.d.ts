export interface listCountriesByPlatformsTypes {
  data: {
    listCountriesByPlatforms: CountryType[];
  };
}
export interface CountryType {
  _id: string;
  name: string;
  slug: string;
  flag: string;
  code: string;
  code_flix: any;
  __typename: string;
}
