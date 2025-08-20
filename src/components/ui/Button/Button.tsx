import type { ButtonHTMLAttributes, ReactNode } from 'react';
import css from './Button.module.css';
import clsx from 'clsx';
import { FadeLoader } from 'react-spinners';

export type ButtonVariants = 'fill' | 'outline';

interface ButtonProps {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: ButtonVariants;
  isLoading?: boolean;
  className?: string;
  onClick: () => void
}

function Button({
  type = 'button',
  variant = 'fill',
  isLoading = false,
  className = '',
  children,
  onClick
}: ButtonProps) {
  return (
    <button
      className={clsx(css.button, css[variant], className)}
      type={type}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <FadeLoader color={variant === 'fill' ? '#fff' : '#000'} />
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
