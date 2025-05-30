/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FilterStateSupplier {
  filters: {
    search: string;
    [key: string]: any;
  };
}
