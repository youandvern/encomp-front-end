import { isUserLoggedIn } from "../reduxSlices/auth";
import { useAppSelector } from "../hooks";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function LoggedInRoute({ children }: Props) {
  const isLoggedIn = useAppSelector(isUserLoggedIn);

  return <>{isLoggedIn ? children : <Navigate to="/" replace={true} />}</>;
}
