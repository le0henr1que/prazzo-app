/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FilterStateProduct {
  filters: {
    search: string;
    [key: string]: any;
  };
}
