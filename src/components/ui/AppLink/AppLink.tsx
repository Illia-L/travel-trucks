import type { ReactNode } from 'react';
import css from '../Button/Button.module.css';
import { Link } from 'react-router';
import clsx from 'clsx';
import type { ButtonVariants } from '../Button/Button';

interface AppLinkProps {
  children: ReactNode;
  to: string;
  variant?: ButtonVariants;
  className?: string;
}

function AppLink({
  to,
  variant = 'fill',
  className = '',
  children,
}: AppLinkProps) {
  return (
    <Link
      to={to}
      className={clsx(css.button, css[variant], className)}
    >
      {children}
    </Link>
  );
}

export default AppLink;
