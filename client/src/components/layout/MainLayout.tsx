import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="my-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
