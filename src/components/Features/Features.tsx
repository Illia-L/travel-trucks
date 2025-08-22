import clsx from 'clsx';
import type { Product } from '../../types/global';
import BadgeList from '../ui/BadgeList/BadgeList';
import css from './Features.module.css';
import { useOutletContext } from 'react-router';

type ProductDetailItem = keyof Pick<
  Product,
  'form' | 'length' | 'width' | 'height' | 'tank' | 'consumption'
>;

// interface FeaturesProps {
//   product: Product;
// }

const productDetailList: ProductDetailItem[] = [
  'form',
  'length',
  'width',
  'height',
  'tank',
  'consumption',
];

function Features() {
  const product: Product = useOutletContext();

  return (
    <section className={css.box}>
      <BadgeList product={product} />

      <h2 className={clsx('text-h3', css.detailTitle)}>Vehicle details</h2>

      <hr className={css.hr} />

      <dl className={clsx('text-body2', css.dataList)}>
        {productDetailList.map(item => (
          <div
            className={css.dataItem}
            key={item}
          >
            <dt>{item}</dt>
            <dd>{product[item]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default Features;
