import type { ReactNode } from 'react';
import css from './Layout.module.css';

interface LayoutProps {
  children?: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={css.app}>
      <header>Header</header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
