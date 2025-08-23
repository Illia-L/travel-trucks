import type { ReactNode } from 'react';
import css from './Layout.module.css';
import Header from '../Header/Header';

interface LayoutProps {
  children?: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={css.app}>
      <Header />
      
      <main className={css.main}>{children}</main>
    </div>
  );
}

export default Layout;
