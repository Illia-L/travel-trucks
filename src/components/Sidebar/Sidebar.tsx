import css from './Sidebar.module.css';
import Button from '../ui/Button/Button';
import VehicleEquipmentFilters from '../VehicleEquipmentFilters/VehicleEquipmentFilters';
import { useAppDispatch } from '../../redux/hooks';
import { loadProducts } from '../../redux/products/operations';
import { setFilter } from '../../redux/products/slice';
import VehicleTypeFilter from '../VehicleTypeFilter/VehicleTypeFilter';
import LocationFilter from '../LocationFilter/LocationFilter';

function Sidebar() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setFilter({ page: 1 }));
    dispatch(loadProducts());
  };

  return (
    <aside className={css.sidebar}>
      <LocationFilter/>

      <section>
        <h3 className='text-body2'>Filters</h3>
        <VehicleEquipmentFilters />
        
        <VehicleTypeFilter />
      </section>

      <Button
        className={css.searchButton}
        onClick={handleClick}
      >
        Search
      </Button>
    </aside>
  );
}

export default Sidebar;
