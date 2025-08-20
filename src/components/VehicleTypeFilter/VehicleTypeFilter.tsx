import FilterSection from '../ui/FilterSection/FilterSection';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectVehicleFormFilter } from '../../redux/products/selectors';
import { removeFilter, setFilter } from '../../redux/products/slice';

const filterLabels = ['Van', 'Fully Integrated', 'Alcove'];
const filterValues = ['panelTruck', 'fullyIntegrated', 'Alcove'];

function VehicleTypeFilter() {
  const dispatch = useAppDispatch();
  const selectedVehicleForm = useAppSelector(selectVehicleFormFilter);

  const selectedPosition = filterValues.indexOf(selectedVehicleForm);
  const selectedLabel = filterLabels[selectedPosition];

  const handleClick = (label: string) => {
    const position = filterLabels.indexOf(label);
    const value = filterValues[position];

    if (selectedVehicleForm === value) return dispatch(removeFilter('form'));

    dispatch(setFilter({ form: value }));
  };

  return (
    <FilterSection
      title='Vehicle equipment'
      filters={filterLabels}
      selectedFilters={[selectedLabel]}
      onClick={handleClick}
    />
  );
}

export default VehicleTypeFilter;
