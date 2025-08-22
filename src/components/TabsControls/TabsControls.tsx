import { NavLink } from 'react-router';
import css from './TabsControls.module.css';
import clsx from 'clsx';

function TabsControls() {
  return (
    <div className={css.box}>
      <NavLink
        to=''
        end
        className={({ isActive }) =>
          clsx('text-h3', css.link, isActive && css.active)
        }
      >
        Features
      </NavLink>

      <NavLink
        to='reviews'
        className={({ isActive }) =>
          clsx('text-h3', css.link, isActive && css.active)
        }
      >
        Reviews
      </NavLink>
    </div>
  );
}

export default TabsControls;
