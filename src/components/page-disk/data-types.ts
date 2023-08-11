export type TData = {
  comment_ids: object;
  created: Date;
  exif: object;
  modified: Date;
  name: string;
  path: string;
  resource_id: string;
  revision: number;
  type: string;
  _embedded: TEmbedded;
};

export type TEmbedded = {
  items: TItem[];
  limit: number;
  offset: number;
  path: string;
  sort: string;
  total: number;
};

export type TItem = {
  comment_ids: {
    private_resource: string;
    public_resource: string;
  };
  created: Date;
  exif: object;
  modified: Date;
  name: string;
  path: string;
  resource_id: string;
  revision: number;
  type: string;
};
