export interface IConnectionUser {
  _id: string;
  username: string;
  avatar: string;
}

export interface IConnectionData {
  _id: string;
  followers?: IConnectionUser[];
  following?: IConnectionUser[];
}