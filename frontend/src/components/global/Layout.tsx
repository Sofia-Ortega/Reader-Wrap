import { Outlet } from "react-router";
import Header from "./Header";

interface Props {
  showSubtitle: boolean;
}

function Layout({ showSubtitle }: Props) {
  return (
    <>
      <Header showSubtitle={showSubtitle} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
