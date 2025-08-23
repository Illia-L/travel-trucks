import { NavLink } from 'react-router';
import css from './Header.module.css';
import clsx from 'clsx';

type MenuItem = {
  label: string;
  to: string;
};

const menuItems: MenuItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Catalog', to: '/campers' },
];

function Header() {
  return (
    <header className={css.header}>
      <div className='container'>
        <div className={css.row}>
          <a
            className={css.logoLink}
            href='/'
          >
            <svg
              width={136}
              height={16}
            >
              <use href='/img/icons/icons.svg#logo' />
            </svg>
          </a>

          <nav className={css.nav}>
            <ul className={css.navList}>
              {menuItems.map((item, i) => (
                <li key={i}>
                  <NavLink
                    className={({ isActive }) =>
                      clsx('text-body2', css.navLink, isActive && css.active)
                    }
                    to={item.to}
                    end
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={css.space}></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
