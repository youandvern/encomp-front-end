import { Typography } from "@mui/material";
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
      <br />
      <Typography variant="h2">Welcome Home</Typography>
      <Typography>Here's some interesting content.</Typography>
      <button onClick={signalNewAlert}>Alert</button>
    </>
  );
}
