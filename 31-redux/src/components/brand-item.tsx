import { brandActions } from "../redux/features/brand.slice";
import { useAppDispatch } from "../redux/hook";
import { IBrandStoreItem } from "../types/brand.type";

export const BrandItem: React.FC<IBrandStoreItem> = ({
  id,
  title_en,
  checked,
}) => {
  const dispatch = useAppDispatch();

  const toggleCheckbox: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.checked) {
      dispatch(brandActions.check(id));
    } else {
      dispatch(brandActions.uncheck(id));
    }
  };

  return (
    <div className="flex justify-between py-2">
      <span>{title_en}</span>
      <input type="checkbox" checked={checked} onChange={toggleCheckbox} />
    </div>
  );
};
