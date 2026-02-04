import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

function UserLayout() {
  return (
    <>
      <UserHeader />
      <main className="container my-4">
        <Outlet />
      </main>
      <UserFooter />
    </>
  );
}

export default UserLayout;
