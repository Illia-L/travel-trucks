type ProductForm = 'Van' | 'Fully Integrated' | 'Alcove';
type ProductTransmission = 'automatic' | 'manual';
type ProductEngine = 'diesel' | 'petrol';

type ProductGalleryItem = {
  thumb: string;
  original: string;
};

type ProductReviewItem = {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: ProductForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: ProductTransmission;
  engine: ProductEngine;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: ProductGalleryItem[];
  reviews: ProductReviewItem[];
};

export type FilterLabledItem = {
  [K in keyof Product]: {
    label: string;
    key: K;
    value: Product[K];
  };
}[keyof Product];

export type FilterItem = Pick<FilterLabledItem, 'key' | 'value'>;
