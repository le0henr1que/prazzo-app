/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FilterStateBatch {
  filters: {
    search: string;
    [key: string]: any;
  };
}
