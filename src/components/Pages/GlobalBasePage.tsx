import { Outlet } from "react-router-dom";
import ErrorManager from "../ErrorManager";
import ErrorSnackbar from "../ErrorSnackbar";
import HomeBar from "../HomeBar";

export default function GlobalBasePage() {
  return (
    <>
      <HomeBar />
      <ErrorManager />
      <ErrorSnackbar />
      <Outlet />
    </>
  );
}
