import React from "react";
import { Input } from "./input";

interface IValuesType<T = string> {
  creditCard: T;
  quantity: T;
}

type validatorFunc = (_: string) => string | null;
const validator: IValuesType<validatorFunc> = {
  creditCard: (value: string) => {
    if (isNaN(Number(value))) return "Invalid number";
    return value?.length === 16 ? null : "Credit card length must be 16";
  },
  quantity: (value: string) => {
    const a = /^\d+([\\,\\.]\d+)?([e\\.]\d+)?$/;
    const b = /\d+([\\,\\.]\d+)?([e\\.]\d+)?/;
    console.log("salam mablaghe varizi 1.23".match(b));
    console.log("salam mablaghe varizi 1.23".replace(b, "---"));
    if (!a.test(value)) return "Invalid price";
    return "";
  },
};

export const Form: React.FC = () => {
  const [firstTimeLoading, setFirstTimeLoading] = React.useState<boolean>(true);
  const [values, setValues] = React.useState<IValuesType>({
    creditCard: "",
    quantity: "",
  });
  const [errors, setErrors] = React.useState<IValuesType>({
    creditCard: "",
    quantity: "",
  });

  const onChangeHandler = (fieldName: keyof IValuesType, value: string) => {
    const newValues = { ...values };
    newValues[fieldName] = value;
    setValues(newValues);
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (Object.values(errors).join("").length) return;
    console.log(values);
  };

  React.useEffect(() => {
    if (firstTimeLoading) {
      setFirstTimeLoading(false);
      return;
    }
    const newErrors = { ...errors };
    const creditCardError = validator.creditCard(values.creditCard);
    if (creditCardError) newErrors.creditCard = creditCardError;
    else newErrors.creditCard = "";
    const quantityError = validator.quantity(values.quantity);
    if (quantityError) newErrors.quantity = quantityError;
    else newErrors.quantity = "";
    setErrors(newErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <main className="bg-slate-100 min-h-screen">
      <section className="space-y-5 container mx-auto max-w-[500px] py-10 px-4">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white rounded-md shadow-md px-6 py-4"
        >
          <p className="text-gray-800 font-semibold text-3xl mb-8">
            Buyout Form
          </p>
          <div className="space-y-4">
            <Input
              type="text"
              label="Credit Card"
              placeholder="XXXX XXXX XXXX XXXX"
              error={errors.creditCard}
              onChange={(event) =>
                onChangeHandler("creditCard", event.target.value)
              }
            />
            <Input
              type="text"
              label="Price"
              placeholder="ex: 2"
              error={errors.quantity}
              onChange={(event) =>
                onChangeHandler("quantity", event.target.value)
              }
            />
            <button
              type="submit"
              className="bg-slate-700 hover:!bg-slate-950 text-white font-semibold rounded-md px-2 py-1 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};
