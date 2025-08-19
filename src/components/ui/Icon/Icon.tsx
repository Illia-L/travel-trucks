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
      className={className}
    >
      <use href={`/img/icons/icons.svg#${id}`} />
    </svg>
  );
}

export default Icon;
