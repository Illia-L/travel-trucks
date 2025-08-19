import { useEffect, useState } from 'react';
import css from './ProductList.module.css';
import ProductCard from '../../ProductCard/ProductCard';
import type { Product } from '../../../types/global';
import { fetchAllProducts } from '../../../utils/api';

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async() => {
    try {
      const productsData = await fetchAllProducts()
      const products = productsData.items

      setProducts(products)
    }catch{console.log('There was an error fetching products');}
  }

  useEffect(()=>{
    getProducts()
  }, [])

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
