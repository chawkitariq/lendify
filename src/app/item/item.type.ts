export type Item = {
  id: number;
  title: string;
  description: string;
  image?: string
  returnAt: Date;
  realReturnAt: Date;
};

export type ItemCreatePayload = {
  title: string;
  description?: string;
  returnAt?: Date;
  file?: File | string;
};

export type ItemUpdatePayload = Partial<ItemCreatePayload>;
