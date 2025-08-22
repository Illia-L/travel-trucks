import type { ButtonHTMLAttributes, ReactNode } from 'react';
import css from './Button.module.css';
import clsx from 'clsx';
import { PulseLoader } from 'react-spinners';

export type ButtonVariants = 'fill' | 'outline';

interface ButtonProps {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: ButtonVariants;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

function Button({
  type = 'button',
  variant = 'fill',
  isLoading = false,
  className = '',
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={clsx(css.button, css[variant], className)}
      type={type}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <PulseLoader
          size={7}
          margin={4}
          color={variant === 'fill' ? '#fff' : '#9599A1'}
        />
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
