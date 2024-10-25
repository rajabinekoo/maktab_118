import React from "react";
import { useAppSelector } from "../redux/hook";
import { BrandSearchInput } from "./brand-input";
import { BrandItem } from "./brand-item";
import { brandSelector } from "../redux/selectors/brand.selector";

// solution1
// export const BrandFilters: React.FC = () => {
//   const { list, searchValue } = useAppSelector((state) => state.brands);

//   const normalizedList = React.useMemo(() => {
//     return list.filter((el) =>
//       el.title_en.toLowerCase().includes(searchValue.toLowerCase())
//     );
//   }, [searchValue, list]);

//   return (
//     <aside className="max-w-[300px] w-full border border-gray-300 rounded-lg bg-white shadow-md p-4 max-h-[300px] overflow-auto">
//       <BrandSearchInput />
//       <div className="mt-4 pb-2 border-b-2 border-gray-300">
//         <p className="text-xs text-gray-500">Selected brands</p>
//         {list
//           .filter((el) => el.checked)
//           .map((el, index) => (
//             <BrandItem key={index} {...el} />
//           ))}
//       </div>

//       <div className="mt-4">
//         <p className="text-xs text-gray-500">All of brands</p>
//         {normalizedList.map((el, index) => (
//           <BrandItem key={index} {...el} />
//         ))}
//       </div>
//     </aside>
//   );
// };

// solution2
export const BrandFilters: React.FC = () => {
  const { searchedItems, selectedItems } = useAppSelector(brandSelector);

  return (
    <aside className="max-w-[300px] w-full border border-gray-300 rounded-lg bg-white shadow-md p-4 max-h-[300px] overflow-auto">
      <BrandSearchInput />
      <div className="mt-4 pb-2 border-b-2 border-gray-300">
        <p className="text-xs text-gray-500">Selected brands</p>
        {selectedItems.map((el, index) => (
          <BrandItem key={index} {...el} />
        ))}
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500">All of brands</p>
        {searchedItems.map((el, index) => (
          <BrandItem key={index} {...el} />
        ))}
      </div>
    </aside>
  );
};
