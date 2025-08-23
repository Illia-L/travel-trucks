import AppLink from '../AppLink/AppLink';
import css from './NotFound.module.css';

interface NotFoundProps {
  title?: string;
  message?: string;
  buttonText?: string;
}

function NotFound({ title, message, buttonText }: NotFoundProps) {
  return (
    <div className='container'>
      <div className={css.page}>
        <section
          className={css.box}
          aria-labelledby='nf-title'
        >
          <h1
            id='nf-title'
            className={css.title}
          >
            {title}
          </h1>

          <p className={css.text}>
            {message}
          </p>

          <AppLink
            to='/campers'
            variant='outline'
            className={css.link}
          >
            {buttonText}
          </AppLink>
        </section>
      </div>
    </div>
  );
}

export default NotFound;
