import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { brandActions } from "../redux/features/brand.slice";

export const BrandSearchInput: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const searchValue = useAppSelector((state) => state.brands.searchValue);
  const dispatch = useAppDispatch();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const search = () => {
    dispatch(brandActions.setSearchValue(value));
  };

  const clear = () => {
    dispatch(brandActions.clearSearchValue());
    setValue("");
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md shadow-md w-full px-2 py-1"
      />
      {!searchValue ? (
        <button
          onClick={search}
          className="bg-gray-700 text-white font-semibold px-3 py-1 rounded-lg w-full"
        >
          Search
        </button>
      ) : (
        <button
          onClick={clear}
          className="bg-red-500 text-white font-semibold px-3 py-1 rounded-lg w-full"
        >
          Clear
        </button>
      )}
    </div>
  );
};
