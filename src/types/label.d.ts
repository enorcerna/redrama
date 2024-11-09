export interface listLabelsTypes {
  data: {
    listLabels: LabelType[];
  };
}

export interface LabelType {
  _id: string;
  name: string;
  slug: string;
  __typename: string;
}
//Detail label
export interface DetailLabelTypes {
  data: {
    detailLabel: LabelType;
  };
}
