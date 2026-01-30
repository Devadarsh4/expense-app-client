import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";

function App() {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setUser={setUserDetails} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
