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
import { useState, useEffect } from "react";
import LoginNavBar from "@/components/LoginNavBar";
interface Props {
  children: JSX.Element;
}

const HeaderMenu = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<null | any>(null);
  const [active, setActive] = useState<string>("0");
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
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
    setActive(index.toString());
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <>{auth.currentUser? <LoginNavBar></LoginNavBar>: 
      <div className="bg-[#3247CF] flex justify-between px-[7%] items-center h-10 py-10 w-12/12">
        <h1 className="font-semibold text-[20px] leading-[23px] text-black">
          <Link href={"/"}>Metridash</Link>
        </h1>
        <ul className=" justify-center gap-x-10 md:flex hidden">
         
            <li
              className={`cursor-pointer mr-4 ${
                active === "0" ? "text-white" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(0)}
            >
              <Link href="/">Home</Link>
            </li>
         
          
            <li
              className={`cursor-pointer mr-4 ${
                active === "1" ? "text-white" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(1)}
            >
              <Link href="/features">Features</Link>
            </li>
          
         
            <li
              className={`cursor-pointer mr-4 ${
                active === "2" ? "text-white" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(2)}
            >
              <Link href="/pricing">Pricing</Link>
            </li>
         
            <li
              className={`cursor-pointer mr-4 ${
                active === "3" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(3)}
            >
              <Link href="/contact">Contact Us</Link>
            </li>
         
            {/* <li
              className={`cursor-pointer mr-4 ${
                active === "4" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(4)}
            >
              <Link href="/home">Dashboard</Link>
            </li> */}
         
            <li
              className={`cursor-pointer mr-4 ${
                active === "4" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => handleClick(4)}
            >
              <Link href="/auth/signin">Sign in</Link>
            </li>
         
            {/* <li
              className={`cursor-pointer mr-4 ${
                active === "0" ? "text-[#fff]" : "text-[#8E9CF3]"
              }`}
              onClick={() => {
                handleClick(0), handleLogout();
              }}
            >
              <Link href="/">Log out</Link>
            </li> */}
        
        </ul>
    
        <div className="md:hidden flex relative">
          <div className="flex">
            <Image
              src={menu}
              width={20}
              height={20}
              alt="profile"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleClick(0);
                  }}
                >
                  Home
                </Link>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleClick(1);
                  }}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleClick(2);
                  }}
                >
                  Pricing
                </Link>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleClick(3);
                  }}
                >
                  Contact Us
                </Link>
                <Link
                  href="/auth/signin"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleClick(4);
                  }}
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleClick(4);
                  }}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    }
      <main>{props.children}</main>
    </>
  );
};

export default HeaderMenu;
