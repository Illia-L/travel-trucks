import { useId, useState } from 'react';
import css from './LocationFilter.module.css';
import clsx from 'clsx';
import Icon from '../ui/Icon/Icon';
import { useAppDispatch } from '../../redux/hooks';
import { setFilter } from '../../redux/products/slice';

function LocationFilter() {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch()
  const id = useId();

  const handleBlur = () => {
    dispatch(setFilter({location: value}))
  }

  return (
    <section>
      <h3>
        <label
          htmlFor={id}
          className={clsx('text-body', css.label)}
        >
          Location
        </label>
      </h3>

      <div className={css.inputBox}>
        <input
          id={id}
          type='text'
          value={value}
          placeholder='City'
          className={clsx('text-body', css.input)}
          onChange={e => setValue(e.target.value)}
          onBlur={handleBlur}
        />

        <Icon
          id='map'
          width={20}
          height={20}
          className={css.locationIcon}
        />
      </div>
    </section>
  );
}

export default LocationFilter;
