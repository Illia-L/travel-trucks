import css from './ProductList.module.css';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../types/global';

type ProductListProps = {
  products: Product[]
}

function ProductList({products}:ProductListProps) {
  return (
    <ul className={css.list}>
      {products.map(product => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
