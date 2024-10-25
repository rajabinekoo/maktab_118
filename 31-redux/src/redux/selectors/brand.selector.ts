import { IBrandStoreItem } from "../../types/brand.type";
import { RootState } from "../store";

type brandSelectorType = (_: RootState) => {
  searchedItems: Array<IBrandStoreItem>;
  selectedItems: Array<IBrandStoreItem>;
};
export const brandSelector: brandSelectorType = (state) => {
  return {
    searchedItems: state.brands.list.filter((el) =>
      el.title_en.toLowerCase().includes(state.brands.searchValue.toLowerCase())
    ),
    selectedItems: state.brands.list.filter((el) => el.checked),
  };
};
