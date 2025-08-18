import type { ButtonHTMLAttributes, ReactNode } from 'react';
import css from './Button.module.css';
import clsx from 'clsx';

export type ButtonVariants = 'fill' | 'outline';

interface ButtonProps {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: ButtonVariants;
  className?: string;
}

function Button({
  type = 'button',
  variant = 'fill',
  className = '',
  children,
}: ButtonProps) {
  return (
    <button
      className={clsx(css.button, css[variant], className)}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
