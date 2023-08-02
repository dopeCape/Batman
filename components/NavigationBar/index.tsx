import { useSession } from "next-auth/react";
import React from "react";
import HeaderMenu from "./HeaderMenu";
import SideBar from "./SideBar";



interface Props {
  children: JSX.Element;
}
const NavigationBar = ({ children }: Props): JSX.Element => {
  const { data, status } = useSession();

  if (status === "loading") return (
      <div className=" flex w-full h-full justify-center items-center ">
        <h1 className="flex justify-center place-self-center mt-60 "> loading... please wait</h1>
        
      </div>
        );


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














// import { useSession } from "next-auth/react";
// import React from "react";
// import HeaderMenu from "./HeaderMenu";
// import SideBar from "./SideBar";

// interface Props {
//   children: JSX.Element;
// }
// const NavigationBar = ({ children }: Props): JSX.Element => {
//   const { data, status } = useSession();

//   if (status === "loading") return <h1 className="flex justify-center place-self-center mt-60 "> loading... please wait</h1>;

//   if (status === "unauthenticated") {
//     return (
//       <HeaderMenu>
//         <main className="flex-1">{children}</main>
//       </HeaderMenu>
//     );
//   }
//   return (
//     <SideBar>
//       <main className="flex-1">{children}</main>
//     </SideBar>
//   );
// };

// export default NavigationBar;
