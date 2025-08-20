
import clsx from "clsx";
import css from './Icon.module.css'

interface IconProps {
  id: string;
  width: number;
  height: number;
  className?: string
}

function Icon({ id, width, height, className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      style={{strokeWidth: '1px'}}
      className={clsx(css.icon, className)}
    >
      <use href={`/img/icons/icons.svg#${id}`} />
    </svg>
  );
}

export default Icon;
