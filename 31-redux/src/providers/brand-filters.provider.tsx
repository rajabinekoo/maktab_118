import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { brandActions } from "../redux/features/brand.slice";
import { brands } from "../utils/brands";

export const BrandProvider: React.FC<{
  children: React.ReactNode | JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const list = useAppSelector((state) => state.brands.list);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (list?.length > 0) return;
    dispatch(brandActions.setBrands(brands));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return <>{children}</>;
};
