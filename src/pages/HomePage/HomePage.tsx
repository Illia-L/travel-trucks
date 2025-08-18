import clsx from 'clsx';
import css from './HomePage.module.css';
import AppLink from '../../components/ui/AppLink/AppLink';

function HomePage() {
  return (
    <div className={css.hero}>
      <div className='container'>
        <h1 className={clsx(css.title, 'text-h1')}>Campers of your dreams</h1>
        <p className={clsx(css.desc, 'text-h2')}>
          You can find everything you want in our catalog
        </p>
        <AppLink
          to='/campers'
          className={css.button}
        >
          View Now
        </AppLink>
      </div>
    </div>
  );
}

export default HomePage;
