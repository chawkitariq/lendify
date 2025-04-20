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
  image?: string;
};

export type ItemUpdatePayload = Partial<ItemCreatePayload>;

export type ItemFormCreatePayload = Omit<ItemCreatePayload, 'image'> & {
  image?: File | string;
};

export type ItemFormUpdatePayload = Partial<ItemFormCreatePayload>;