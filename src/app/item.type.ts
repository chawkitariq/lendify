export type Item = {
  id: number
  title: string;
  description: string;
  returnAt: Date;
  realReturnAt: Date;
};

export type Response<T> = {
  data: T;
};
