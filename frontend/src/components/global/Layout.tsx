import { Outlet } from "react-router";
import Header from "./Header";
import BackgroundPattern from "./BackgroundPattern";

interface Props {
  showSubtitle: boolean;
}

function Layout({ showSubtitle }: Props) {
  return (
    <>
      <BackgroundPattern />
      <Header showSubtitle={showSubtitle} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
