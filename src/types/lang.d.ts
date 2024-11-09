export interface DetailLangugueTypes {
  data: {
    detailLangugue: LangugueType;
  };
}

export interface LangugueType {
  _id: string;
  name: string;
  slug: string;
  flag: string;
  code: string;
  code_flix: string;
  __typename: string;
}
