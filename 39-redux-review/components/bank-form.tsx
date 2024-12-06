"use client";

import { bankActions } from "@/redux/slices/bank-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const BankForm: React.FC = () => {
  const { balance } = useAppSelector((state) => state.bank);
  const dispatch = useAppDispatch();

  return (
    <section className="bg-white border border-gray-200 rounded-lg py-4 px-5 max-w-[300px] w-full">
      <p className="font-semibold text-3xl text-center">{balance}$</p>
      <div className="space-y-3 pt-6">
        <button
          onClick={() => dispatch(bankActions.incrementByAmount(10))}
          className="w-full py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-lg font-semibold"
        >
          Deposit
        </button>
        <button
          onClick={() => dispatch(bankActions.decrementByAmount(10))}
          className="w-full py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-lg font-semibold"
        >
          Withdrawal
        </button>
      </div>
    </section>
  );
};
