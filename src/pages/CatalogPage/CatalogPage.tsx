import ProductList from '../../components/ui/ProductList/ProductList';
import css from './CatalogPage.module.css';

function CatalogPage() {
  return (
    <div className='container'>
      <div className={css.row}>
        <aside className={css.sidebar}></aside>
        <div className={css.products}>
          <ProductList />
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
