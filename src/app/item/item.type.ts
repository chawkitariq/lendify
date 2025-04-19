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
};

export type ItemUpdatePayload = Partial<ItemCreatePayload>;
