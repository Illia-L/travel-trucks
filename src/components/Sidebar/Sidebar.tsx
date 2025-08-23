import css from './Sidebar.module.css';
import Button from '../ui/Button/Button';
import VehicleEquipmentFilters from '../VehicleEquipmentFilters/VehicleEquipmentFilters';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loadProducts } from '../../redux/products/operations';
import { setFilter } from '../../redux/products/slice';
import VehicleTypeFilter from '../VehicleTypeFilter/VehicleTypeFilter';
import LocationFilter from '../LocationFilter/LocationFilter';
import { selectFilter } from '../../redux/products/selectors';
import { convertObjectToQueryString } from '../../utils/helpers';
import { useNavigate } from 'react-router';

type SidebarProps = {
  isLoading: boolean;
};

function Sidebar({ isLoading }: SidebarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filter = useAppSelector(selectFilter);

  const queryString = convertObjectToQueryString(filter);

  const handleClick = async () => {
    dispatch(setFilter({ page: 1 }));
    navigate(`/campers${queryString}`);

    dispatch(loadProducts());
  };

  return (
    <aside className={css.sidebar}>
      <LocationFilter />

      <section>
        <h3 className='text-body2'>Filters</h3>
        <VehicleEquipmentFilters />

        <VehicleTypeFilter />
      </section>

      <Button
        className={css.searchButton}
        onClick={handleClick}
        isLoading={isLoading}
      >
        Search
      </Button>
    </aside>
  );
}

export default Sidebar;
