/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { setProductFilter } from "../index";

export const useProductFilterActions = () => {
  const dispatch = useDispatch();
  const updateFilter: any = ({ key, value }: { key: string; value: any }) =>
    dispatch(setProductFilter({ key, value }));

  return { updateFilter };
};
