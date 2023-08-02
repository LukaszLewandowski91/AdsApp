import AdsBoard from "./components/features/AdsBoard/AdsBoard";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import { Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register/Register";
const App = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<AdsBoard />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </MainLayout>
);

export default App;
