import { FirebaseParameters } from "@/constants/firebaseParameters";
import { getConfigValue } from "@/services/firebase/remoteConfig";
import Image from "next/image";
import Link from "next/link";
import menu from "../../../public/Images/menu.png";
import { useRouter } from "next/router";
import { Logout } from "../../../auth";
import { Auth } from "firebase/auth";
import { auth } from "@/firebase";
import { firestore } from "firebase-admin";
import React, { useEffect, useState } from "react";
import classes from "./index.module.css";

interface Props {
  children: JSX.Element;
}

const HeaderMenu = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<null | any>(null);
  const [active, setActive] = useState<string>("0");
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    (async () => {
      await getConfigValue(FirebaseParameters.SHOW_LOGIN, setShowLogin, true);
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await Logout();
      alert("User logged out successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("HeaderMenu showlogin", showLogin);
  }, [showLogin]);

  const handleClick = (index: number) => {
    setTimeout(() => {
      setToggle(false)
    }, 1500)
    setActive(index.toString());
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [user]);

  const toggleNavbar = () => {
    setToggle(prev => !prev)
  }




  // return (
  //   <>
  //     <div className="bg-[#3247CF] flex justify-between px-[7%] items-center h-10 py-10 w-12/12">
  //       <h1 className="font-semibold text-[20px] leading-[23px] text-black">
  //         Metridash
  //       </h1>
  //       <ul className=" justify-center gap-x-10 md:flex hidden">
  //         {user ? (
  //           <></>
  //         ) : (
  //           <li
  //             className={`cursor-pointer mr-4 ${
  //               active === "0" ? "text-white" : "text-[#8E9CF3]"
  //             }`}
  //             onClick={() => handleClick(0)}
  //           >
  //             <Link href="/">Home</Link>
  //           </li>
  //         )}
  //         {user ? (
  //           <></>
  //         ) : (
  //           <li
  //             className={`cursor-pointer mr-4 ${
  //               active === "1" ? "text-white" : "text-[#8E9CF3]"
  //             }`}
  //             onClick={() => handleClick(1)}
  //           >
  //             <Link href="/features">Features</Link>
  //           </li>
  //         )}
  //         {user ? (
  //           <></>
  //         ) : (
  //           <li
  //             className={`cursor-pointer mr-4 ${
  //               active === "2" ? "text-white" : "text-[#8E9CF3]"
  //             }`}
  //             onClick={() => handleClick(2)}
  //           >
  //             <Link href="/pricing">Pricing</Link>
  //           </li>
  //         )}

  //         {user ? (
  //           <></>
  //         ) : (



  
 

  return (
    <>
      <div className={`bg-[#3247CF] flex justify-between px-[7%] items-center h-10 py-10`}>
        <h1 className="font-semibold text-[20px] leading-[23px] text-black">
          Metridash
        </h1>
        <ul className={`${classes.desktop_nav} flex justify-center gap-x-10`}>
          {/* <li
            className={`cursor-pointer mr-4 ${
              active === "0" ? "text-white" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(0)}
          >
            Home
          </li> */}
          {user ? (
            <></>
          ) : (
            <li
              className={`cursor-pointer mr-4 ${
                active === "0" ? "text-white" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(0)}
            >
              <Link href="/">Home</Link>
            </li>
          )}
          {/* <li
            className={`cursor-pointer mr-4 ${
              active === "1" ? "text-white" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(1)}
          >
            Features
          </li> */}
          {user ? (
            <></>
          ) : (
            <li
              className={`cursor-pointer mr-4 ${
                active === "1" ? "text-white" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(1)}
            >
              <Link href="/features">Features</Link>
            </li>
          )}

          {/* <li
            className={`cursor-pointer mr-4 ${
              active === "2" ? "text-white" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(2)}
          >
            Pricing
          </li> */}

          {user ? (
            <></>
          ) : (
            <li
              className={`cursor-pointer mr-4 ${
                active === "2" ? "text-white" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(2)}
            >
              <Link href="/pricing">Pricing</Link>
            </li>
          )}

          {user ? (
              <></>
            ) : 
          <li
            className={`cursor-pointer mr-4 ${
              active === "3" ? "text-[#fff]" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(3)}
          >
            <Link href="/contact">Contact us</Link>
          </li>}
          {/* {showLogin && (
            <li
              className={`cursor-pointer mr-4 ${
                active === "3" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(3)}
            >
              <Link href="/contact">Contact Us</Link>
            </li>
          )} */}

          {user ? (
            <li
              className={`cursor-pointer mr-4 ${
                active === "4" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(4)}
            >
              <Link href="/home">Dashboard</Link>
            </li>
          ) : (
            <li
              className={`cursor-pointer mr-4 ${
                active === "4" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(4)}
            >
              <Link href="/auth/signin">Sign in</Link>
            </li>
          )}
          {user ? (
            <li
              className={`cursor-pointer mr-4 ${
                active === "0" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => {
                handleClick(0), handleLogout();
              }}
            >
              <Link href="/">Log out</Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
        
        <button onClick={toggleNavbar} className={`${classes.toggle__nav} ${toggle ? classes.toggle_true : null}`}>
            <span className={`${classes.top_toggle} ${toggle ? classes.top_true : null}`}></span>
            <span className={`${classes.toggle_middle} ${toggle ? classes.middle_true : null}`}></span>
            <span className={`${classes.toggle_bottom} ${toggle ? classes.bottom_true : null}`}></span>
        </button>
      </div>
      {toggle &&
        <ul className={`${classes.mobile_nav} flex justify-center gap-x-10`}>
          {!user && <li
            className={`cursor-pointer mr-4 ${
              active === "0" ? "text-white" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(0)}
          >
            <Link href="/">Home</Link>
          </li>}
          {!user && <li
            className={`${classes.mobile_navlink} cursor-pointer mr-4 ${
              active === "1" ? "text-white" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(1)}
          >
            <Link href="/features">Features</Link>
          </li>}
          {!user && <li
            className={`${classes.mobile_navlink} cursor-pointer mr-4 ${
              active === "2" ? "text-white" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(2)}
          >
            <Link href="/pricing">Pricing</Link>
          </li>}
          {!user && <li
            className={`${classes.mobile_navlink} cursor-pointer mr-4 ${
              active === "3" ? "text-[#fff]" : "text-[#8E9CF3]"
            }`}
            onClick={() => handleClick(3)}
          >
            <Link href="/contact">Contact us</Link>
          </li>}
          {/* {showLogin && (
            <li
              className={`${classes.mobile_navlink} cursor-pointer mr-4 ${
                active === "3" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(4)}
            >
              <Link href="/auth/signin">Sign in</Link>
            </li>
          )} */}
            {user ? (
            <li
              className={`${classes.mobile_navlink} cursor-pointer mr-4 ${
                active === "3" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(4)}
            >
              <Link href="/home">Dashboard</Link>
            </li>
          ) : (
            <li
              className={`${classes.mobile_navlink} cursor-pointer mr-4 ${
                active === "4" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(4)}
            >
              <Link href="/auth/signin">Sign in</Link>
            </li>
          )}
           {user ? (
            <li
              className={`${classes.mobile_navlink} cursor-pointer mr-4 ${
                active === "0" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => {
                handleClick(0), handleLogout();
              }}
            >
              <Link href="/">Log out</Link>
            </li>
            ) : (
              <></>
            )}
        </ul>
      }
      <main>{props.children}</main>
    </>
  );
};

export default HeaderMenu;