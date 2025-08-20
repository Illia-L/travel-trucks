import type { FilterButtoListProps } from '../FilterButtonList/FilterButtonList';
import FilterButtonList from '../FilterButtonList/FilterButtonList';
import css from './FilterSection.module.css';

type FilterSectionProps = FilterButtoListProps & {
  title: string;
};

function FilterSection({
  title,
  filters,
  selectedFilters,
  onClick,
}: FilterSectionProps) {
  return (
    <section className={css.section}>
      <h4 className='text-h3'>{title}</h4>

      <hr className={css.hr} />

      <div>
        <FilterButtonList
          filters={filters}
          selectedFilters={selectedFilters}
          onClick={onClick}
        />
      </div>
    </section>
  );
}

export default FilterSection;
