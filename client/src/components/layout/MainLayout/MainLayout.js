import Footer from "../Footer/Footer";
import MainMenu from "../MainMenu/MainManu";

const MainLayout = ({ children }) => (
  <div>
    <MainMenu />
    {children}
    <Footer />
  </div>
);

export default MainLayout;
