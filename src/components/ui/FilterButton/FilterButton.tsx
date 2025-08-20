import type { ReactNode } from 'react';
import css from './FilterButton.module.css';
import clsx from 'clsx';

interface FilterButtonProps {
  isSelected: boolean;
  children?: ReactNode;
  onClick: () => void;
}

function FilterButton({ isSelected, children, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx('text-button', css.button, isSelected && css.selected)}
    >
      {children}
    </button>
  );
}

export default FilterButton;
