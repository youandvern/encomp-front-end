import { useAppSelector } from "../hooks";
import { Navigate } from "react-router-dom";
import { routes } from "../routes";
import { getCalculationRunResults } from "../reduxSlices/calculation";

interface Props {
  children: React.ReactNode;
}

export default function CalculationRunRequiredRoute({ children }: Props) {
  const currentCalcRun = useAppSelector(getCalculationRunResults);
  const isCalcRunActive = currentCalcRun != null;

  return <>{isCalcRunActive ? children : <Navigate to={routes.projects.path} replace={true} />}</>;
}
