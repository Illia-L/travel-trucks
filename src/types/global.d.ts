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
  form: 'Van' | 'Fully Integrated' | 'Alcove';
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: 'automatic' | 'manual';
  engine: 'diesel' | 'petrol';
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

export type Filter = {
  location?: string;
  form: 'Van' | 'Fully Integrated' | 'Alcove';
  transmission?: 'automatic';
  engine?: 'petrol';
  AC?: 'true';
  bathroom?: 'true';
  kitchen?: 'true';
  TV?: 'true';
  radio?: 'true';
  refrigerator?: 'true';
  microwave?: 'true';
  gas?: 'true';
  water?: 'true';
  page: number;
  perPage: number;
};

type FeatureKey =
  | 'transmission'
  | 'engine'
  | 'AC'
  | 'bathroom'
  | 'kitchen'
  | 'TV'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water';

type LabeledItem<K extends FeatureKey = FeatureKey> = {
  label: string;
  key: K;
  value: Filter[K];
};
