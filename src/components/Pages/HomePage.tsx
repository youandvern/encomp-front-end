import React, { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { errorsActions } from "../../reduxSlices/errors";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);

  const signalNewAlert = () => {
    dispatch(errorsActions.throwError(`New alert #${count}`));
    setCount(count + 1);
  };

  return (
    <>
      <h1>Welcome Home</h1>
      <p>Here's some interesting content.</p>
      <button onClick={signalNewAlert}>Alert</button>
    </>
  );
}
