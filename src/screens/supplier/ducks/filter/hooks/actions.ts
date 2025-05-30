/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { setSupplierFilter } from "../index";

export const useSupplierFilterActions = () => {
  const dispatch = useDispatch();
  const updateFilter: any = ({ key, value }: { key: string; value: any }) =>
    dispatch(setSupplierFilter({ key, value }));

  return { updateFilter };
};
