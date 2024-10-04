import React from "react";

const list: string[] = ["Milk", "Meat", "Egg", "Fish", "Tea", "Coffee"];

// closure review
// function outterFunc(a: string) {
//   function innerFunc() {
//     console.log(a);
//   }
//   return { innerFunc };
// }
// const b = outterFunc("test");
// b.innerFunc();

export function ShoppingList() {
  const [values, setValues] = React.useState<string[]>(list);

  const removeItem = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  return (
    <main className="pt-20 bg-slate-50 min-h-screen px-3">
      <p>OKala:</p>
      <ul className="indent-4">
        {/* {[
          <li>Milk</li>,
          <li>Meat</li>,
          <li>Egg</li>,
          <li>Fish</li>,
          <li>Tea</li>,
          <li>Coffee</li>,
        ]} */}
        {values.map((el, index) => (
          <li
            // onClick={removeItem.bind({el}, index)}
            key={index}
            onClick={() => removeItem(index)}
            className="cursor-pointer hover:bg-slate-300"
          >
            {el}
          </li>
        ))}
      </ul>
    </main>
  );
}
