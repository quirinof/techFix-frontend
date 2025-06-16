"use client";

import { decrement, increment } from "@/lib/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Incrementar
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrementar
        </button>
      </div>
    </div>
  );
}
