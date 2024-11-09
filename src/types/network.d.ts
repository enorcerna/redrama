export interface listNetworksTypes {
  data: {
    listNetworks: NetworkType[];
  };
}

export interface NetworkType {
  _id: string;
  name: string;
  slug?: string;
  __typename: string;
}
//detail
export interface detailNetworkTypes {
  data: {
    detailNetwork: NetworkType;
  };
}
