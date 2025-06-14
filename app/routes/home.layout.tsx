import { Outlet } from "react-router";
import { Header } from "~/components/header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="w-11/12 mx-auto max-w-[1024px]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
