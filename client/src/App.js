import AdsBoard from "./components/features/AdsBoard/AdsBoard";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import { Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import Logout from "./components/pages/Logout/Logout";
const App = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<AdsBoard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </MainLayout>
);

export default App;
