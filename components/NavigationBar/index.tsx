import { useSession } from "next-auth/react";
import React from "react";
import HeaderMenu from "./HeaderMenu";
import SideBar from "./SideBar";

interface Props {
  children: JSX.Element;
}
const NavigationBar = ({ children }: Props): JSX.Element => {
  const { data, status } = useSession();

  if (status === "loading") return <h1> loading... please wait</h1>;

  if (status === "unauthenticated") {
    return (
      <HeaderMenu>
        <main className="flex-1">{children}</main>
      </HeaderMenu>
    );
  }
  return (
    <SideBar>
      <main className="flex-1">{children}</main>
    </SideBar>
  );
};

export default NavigationBar;
