import FilterButton from '../FilterButton/FilterButton';
import Icon from '../Icon/Icon';
import css from './FilterButtonList.module.css';

export type FilterButtoListProps = {
  filters: string[];
  selectedFilters: string[];
  onClick: (filter: string) => void;
}

function FilterButtonList({
  filters,
  selectedFilters,
  onClick,
}: FilterButtoListProps) {
  console.log({filters});
  return (
    <ul className={css.list}>
      {filters.map((filter, i) => (
        <li key={i}>
          <FilterButton
            onClick={() => onClick(filter)}
            isSelected={selectedFilters.includes(filter)}
          >
            <Icon
              id={filter.toLowerCase().replaceAll(' ', '-')}
              width={32}
              height={32}
            />

            {filter}
          </FilterButton>
        </li>
      ))}
    </ul>
  );
}

export default FilterButtonList;
