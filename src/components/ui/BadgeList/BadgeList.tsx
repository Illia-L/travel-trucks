import clsx from 'clsx';
import Icon from '../Icon/Icon';
import css from './BadgeList.module.css';
import type { Product } from '../../../types/global';

interface BadgeListProps {
  product: Product;
}

type BadgeId =
  | 'automatic'
  | 'petrol'
  | 'AC'
  | 'bathroom'
  | 'kitchen'
  | 'TV'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water';

// type BadgeId = keyof ProductBadgeKeys;

type Badge = {
  id: BadgeId;
  shouldShow: boolean | ((product: Product) => boolean);
};

const badges: Badge[] = [
  {
    id: 'automatic',
    shouldShow: true,
  },

  {
    id: 'petrol',
    shouldShow: true,
  },

  {
    id: 'AC',
    shouldShow: product => product.AC,
  },

  {
    id: 'bathroom',
    shouldShow: product => product.bathroom,
  },

  {
    id: 'kitchen',
    shouldShow: product => product.kitchen,
  },

  {
    id: 'TV',
    shouldShow: product => product.TV,
  },

  {
    id: 'radio',
    shouldShow: product => product.radio,
  },

  {
    id: 'refrigerator',
    shouldShow: product => product.refrigerator,
  },

  {
    id: 'microwave',
    shouldShow: product => product.microwave,
  },

  {
    id: 'gas',
    shouldShow: product => product.gas,
  },

  {
    id: 'water',
    shouldShow: product => product.water,
  },
];

function BadgeList({ product }: BadgeListProps) {
  const productBadgeList: Badge[] = badges.filter((badge: Badge) =>
    typeof badge.shouldShow === 'boolean'
      ? badge.shouldShow
      : badge.shouldShow(product)
  );

  return (
    <ul className={css.list}>
      {productBadgeList.map(badge => (
        <li
          key={badge.id}
          className={clsx('text-body2', css.badge)}
        >
          <Icon
            id={badge.id.toLowerCase()}
            width={20}
            height={20}
            className={css.icon}
          />

          {badge.id}
        </li>
      ))}
    </ul>
  );
}

export default BadgeList;
