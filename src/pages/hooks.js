import { useCallback, useState } from "react";

export const useFilter = () => {
  const [filter, setFilter] = useState({ type: null, brand: null });

  const setTypeFilter = useCallback((type) => {
    setFilter((prev) => ({ ...prev, type }));
  }, []);

  const setBrandFilter = useCallback((brand) => {
    setFilter((prev) => ({ ...prev, brand }));
  }, []);

  const clearFilter = useCallback(() => {
    setFilter({ type: null, brand: null });
  }, []);

  const hasActiveFilters = filter.type !== null || filter.brand !== null;

  return {
    filter,
    setBrandFilter,
    setTypeFilter,
    clearFilter,
    hasActiveFilters,
  };
};
