import { Outlet, useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";
import Footer from "./Footer";

function UserLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Just navigate to logout route
    navigate("/logout");
  };

  return (
    <>
      <UserHeader onLogout={handleLogout} />

      <main className="container my-4">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default UserLayout;
