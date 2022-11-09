import { useAppSelector } from "../hooks";
import { Navigate } from "react-router-dom";
import { getCurrentTemplateId } from "../reduxSlices/template";
import { routes } from "../routes";

interface Props {
  children: React.ReactNode;
}

export default function TemplateSelectedRoute({ children }: Props) {
  const currentTemplateId = useAppSelector(getCurrentTemplateId);
  const isTemplateSelected = currentTemplateId != null;

  return (
    <>{isTemplateSelected ? children : <Navigate to={routes.templates.path()} replace={true} />}</>
  );
}
