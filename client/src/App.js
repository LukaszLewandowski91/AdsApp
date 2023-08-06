import AdsBoard from "./components/features/AdsBoard/AdsBoard";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import { Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import Logout from "./components/pages/Logout/Logout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadLoggedUser } from "./redux/usersRedux";
import AdDetails from "./components/features/AdDetails/AdDetails";
import EditAd from "./components/pages/EditAd/EditAd";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLoggedUser());
  }, [dispatch]);
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<AdsBoard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/ads/:id" element={<AdDetails />} />
        <Route path="/edit/:id" element={<EditAd />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
