import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../../../../store/aplication-state.type";
export const useFilterState = () => {
  const selectFilter = (state: ApplicationState) => state.filterBatch;

  const filterState = useSelector(selectFilter);

  return useMemo(() => filterState, [filterState]);
};
