/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { setBatchFilter } from "../index";

export const useBatchFilterActions = () => {
  const dispatch = useDispatch();
  const updateFilter: any = ({ key, value }: { key: string; value: any }) =>
    dispatch(setBatchFilter({ key, value }));

  return { updateFilter };
};
