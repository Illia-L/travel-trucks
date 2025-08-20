import { filterLabledItems } from '../../config/config';
import FilterSection from '../ui/FilterSection/FilterSection';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectFilter } from '../../redux/products/selectors';
import { removeFilter, setFilter } from '../../redux/products/slice';

function VehicleEquipmentFilters() {
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  const filterLabels = filterLabledItems.map(item => item.label);
  const selectedFilters = filterLabledItems
    .filter(item => !!filter[Object.keys(item)[1]])
    .map(item => item.label);

  const handleClick = (label: string) => {
    const filterLabeledObj = filterLabledItems.find(
      item => item.label === label
    );
    const filterLabeledObjCopy = { ...filterLabeledObj };

    delete filterLabeledObjCopy.label;

    if (selectedFilters.includes(label)) {
      dispatch(removeFilter(Object.keys(filterLabeledObjCopy)[0]));
    } else {
      dispatch(setFilter(filterLabeledObjCopy));
    }
  };

  return (
    <FilterSection
      title='Vehicle equipment'
      filters={filterLabels}
      selectedFilters={selectedFilters}
      onClick={handleClick}
    />
  );
}

export default VehicleEquipmentFilters;
