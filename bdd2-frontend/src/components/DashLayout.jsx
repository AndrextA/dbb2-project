import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div
        className="container-fluid d-flex flex-column dash-container flex-grow-1"
        style={{ minHeight: "89vh" }}
      >
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};
export default DashLayout;
