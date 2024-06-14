import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import AdminLogin from "./Pages/AdminLogin.jsx";
import IsUser from "./Components/user/IsUser.jsx";
import IsAdmin from "./Components/admin/IsAdmin.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/profile" element={<IsUser><ProfilePage /></IsUser>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/home" element={<IsAdmin><HomePage /></IsAdmin>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
