import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useState } from 'react';
import { Logout } from '@/auth';


export default function LoginNavBar() {
    const router = useRouter();
    const [toggle, setToggle] = useState(true);
    const [active, setActive] = useState();
    const [showSettings, setShowSettings] = useState(false);
    // const [theme, setTheme] = useState("Light");

    const toggleSpan = (e) => {
        e.preventDefault();
        setToggle(prev => !prev);

        // if(!theme) {
        //     setTheme("Dark")
        // } else {
        //     setTheme("Light")
        // }
    }

    const activeHandler = (value) => {
      setActive(value);
    }

    const toggleLogout = () => {
      setShowSettings(prev => !prev)
    }

    const handleLogout = async () => {
        try {
          await Logout();
          alert("User logged out successfully!");
          router.replace("/");
        } catch (err) {
          console.error(err);
        }
      };
  return (
    <div className='bg-dark mx-auto'>
      <div className={`w-screen h-20 container px-2 font-sans flex flex-row items-center justify-between ${toggle ? "bg-dark text-white"  : "bg-white text-dark"}`}>
          {/* <Link href='/homepage'>Dashboard</Link>
          <Link href='/homepage/contentCreation'>Content creation</Link>
          <Link href='/homepage/schedule'>Schedule</Link>
          <Link href='/homepage/drafts'>Drafts</Link>
          <div
                  className="text-white font-bold cursor-pointer"
                onClick={() => {
                  handleLogout();
                }}
              >
                <Link href="/">Log out</Link>
              </div> */}
            <h1  onClick={activeHandler.bind(null, "")}  className='w-1/4 bg-gradient-to-l from-[#00C5D7] to-[#0077BE] bg-clip-text tracking-widest text-transparent items-center ps-10 font-bold text-3xl mx-auto'>
              <Link href="/">Metridash</Link>
            </h1>
            <div className='w-2/4 flex justify-between px-3 items-center'>
                <div onClick={activeHandler.bind(null, "content")} 
                                className={`
                                          hover:font-bold 
                                          hover:px-1 
                                          hover:scale-110 
                                          hover:-mb-6 
                                          hover:pb-5 
                                          hover:border-b-2 
                                          hover:text-white 
                                          hover:border-white" 
                                          ${active === "content" && 
                                            "font-bold px-1 scale-110 -mb-6 pb-5 border-b-2 text-white border-white"}`}>
                  <Link href="/homepage/contentCreation" className={`flex flex-row items-center ${toggle ? 'text-grey3 hover:text-white' : 'text-grey6 font-medium'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" className='text-white' viewBox="0 0 25 25" fill="">
                      <path d="M3.35156 6.25C3.35156 5.52065 3.64129 4.82118 4.15702 4.30546C4.67274 3.78973 5.37222 3.5 6.10156 3.5H18.6016C19.3309 3.5 20.0304 3.78973 20.5461 4.30546C21.0618 4.82118 21.3516 5.52065 21.3516 6.25V12.522C20.7375 12.1285 20.0613 11.8418 19.3516 11.674V6.25C19.3516 6.05109 19.2725 5.86032 19.1319 5.71967C18.9912 5.57902 18.8005 5.5 18.6016 5.5H6.10156C5.90265 5.5 5.71188 5.57902 5.57123 5.71967C5.43058 5.86032 5.35156 6.05109 5.35156 6.25V18.75C5.35156 19.164 5.68756 19.5 6.10156 19.5H11.5256C11.6956 20.22 11.9856 20.895 12.3736 21.5H6.10156C5.37222 21.5 4.67274 21.2103 4.15702 20.6945C3.64129 20.1788 3.35156 19.4793 3.35156 18.75V6.25ZM23.3516 18C23.3516 16.5413 22.7721 15.1424 21.7407 14.1109C20.7092 13.0795 19.3103 12.5 17.8516 12.5C16.3929 12.5 14.9939 13.0795 13.9625 14.1109C12.931 15.1424 12.3516 16.5413 12.3516 18C12.3516 19.4587 12.931 20.8576 13.9625 21.8891C14.9939 22.9205 16.3929 23.5 17.8516 23.5C19.3103 23.5 20.7092 22.9205 21.7407 21.8891C22.7721 20.8576 23.3516 19.4587 23.3516 18ZM18.3516 18.5L18.3526 21.003C18.3526 21.1356 18.2999 21.2628 18.2061 21.3566C18.1123 21.4503 17.9852 21.503 17.8526 21.503C17.72 21.503 17.5928 21.4503 17.499 21.3566C17.4052 21.2628 17.3526 21.1356 17.3526 21.003V18.5H14.8476C14.715 18.5 14.5878 18.4473 14.494 18.3536C14.4002 18.2598 14.3476 18.1326 14.3476 18C14.3476 17.8674 14.4002 17.7402 14.494 17.6464C14.5878 17.5527 14.715 17.5 14.8476 17.5H17.3516V15C17.3516 14.8674 17.4042 14.7402 17.498 14.6464C17.5918 14.5527 17.719 14.5 17.8516 14.5C17.9842 14.5 18.1113 14.5527 18.2051 14.6464C18.2989 14.7402 18.3516 14.8674 18.3516 15V17.5H20.8486C20.9812 17.5 21.1083 17.5527 21.2021 17.6464C21.2959 17.7402 21.3486 17.8674 21.3486 18C21.3486 18.1326 21.2959 18.2598 21.2021 18.3536C21.1083 18.4473 20.9812 18.5 20.8486 18.5H18.3516Z" fill={`${active === "content" ? "white" :  "#A8AAB0"}`}/>
                    </svg>
                    <span className={`${active === "content" && "text-white"} ms-1`}>
                      Content Creation
                    </span>
                  </Link>
                </div>
                <div onClick={activeHandler.bind(null, "dashboard")}  className={`
                                                                  hover:font-bold 
                                                                  hover:px-1 
                                                                  hover:scale-110 
                                                                  hover:-mb-6 
                                                                  hover:pb-5 
                                                                  hover:border-b-2 
                                                                  hover:text-white 
                                                                  hover:border-white" 
                                                                  ${active === "dashboard" && 
                                                                    "font-bold px-1 scale-110 -mb-6 pb-5 border-b-2 text-white border-white"}`}>
                  <Link href="/homepage" className={`flex flex-row items-center ${toggle ? 'text-grey3 hover:text-white' : 'text-grey6 font-medium hover:text-white'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 26 25"  fill="">
                    <path d="M11.9677 21.609H5.89525C4.78196 21.609 3.87109 20.6981 3.87109 19.5849V5.41576C3.87109 4.30247 4.78196 3.3916 5.89525 3.3916H11.9677V21.609ZM13.9919 21.609H20.0644C21.1776 21.609 22.0885 20.6981 22.0885 19.5849V12.5003H13.9919V21.609ZM22.0885 10.4762V5.41576C22.0885 4.30247 21.1776 3.3916 20.0644 3.3916H13.9919V10.4762H22.0885Z" fill={`${active === "dashboard" ? "white" :  "#A8AAB0"}`}/>
                  </svg>
                  <span className={`${active === "dashboard" && "text-white"} ms-1`}>Dashboard</span>
                  </Link>
                </div>
                <div onClick={activeHandler.bind(null, "schedule")}  className={`
                                                                  hover:font-bold 
                                                                  hover:px-1 
                                                                  hover:scale-110 
                                                                  hover:-mb-6 
                                                                  hover:pb-5 
                                                                  hover:border-b-2 
                                                                  hover:text-white 
                                                                  hover:border-white" 
                                                                  ${active === "schedule" && 
                                                                    "font-bold px-1 scale-110 -mb-6 pb-5 border-b-2 text-white border-white"}`}>
                  <Link href="/homepage/schedule" className={`flex flex-row items-center ${toggle ? 'text-grey3 hover:text-white' : 'text-grey6 font-medium'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 25 25"  fill={`${active === "schedule" ? "white" :  "#A8AAB0"}`}>
                      <path d="M9.59236 20.5973H6.55613C5.48245 20.5973 4.45274 20.1708 3.69354 19.4116C2.93433 18.6524 2.50781 17.6227 2.50781 16.549V7.44028C2.50781 6.3666 2.93433 5.33689 3.69354 4.57769C4.45274 3.81848 5.48245 3.39196 6.55613 3.39196H17.689C18.7627 3.39196 19.7924 3.81848 20.5516 4.57769C21.3108 5.33689 21.7373 6.3666 21.7373 7.44028V10.4765M8.58028 2.37988V4.40404M15.6648 2.37988V4.40404M2.50781 8.45235H21.7373M19.2071 16.1877L17.689 17.7058" stroke="#A8AAB0" stroke-width="2.02416" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17.6854 22.6208C20.4802 22.6208 22.7458 20.3552 22.7458 17.5604C22.7458 14.7656 20.4802 12.5 17.6854 12.5C14.8906 12.5 12.625 14.7656 12.625 17.5604C12.625 20.3552 14.8906 22.6208 17.6854 22.6208Z" stroke="#A8AAB0" stroke-width="2.02416" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className={`${active === "schedule" && "text-white"} ms-1`}>Schedule</span>
                  </Link>
                </div>
                <div onClick={activeHandler.bind(null, "draft")}  className={`
                                                                  hover:font-bold 
                                                                  hover:px-1 
                                                                  hover:scale-110 
                                                                  hover:-mb-6 
                                                                  hover:pb-5 
                                                                  hover:border-b-2 
                                                                  hover:text-white 
                                                                  hover:border-white" 
                                                                  ${active === "draft" && 
                                                                    "font-bold px-1 scale-110 -mb-6 pb-5 border-b-2 text-white border-white"}`}>
                  <Link href="/homepage/drafts" className={`flex flex-row items-center ${toggle ? 'text-grey3 hover:text-white' : 'text-grey6 font-medium'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 21 21" fill="none">
                      <path d="M15.9415 8.79886L11.9579 4.81531L3.82286 12.9514L3.70445 13.081C3.51612 13.3052 3.37869 13.5676 3.30164 13.8501L2.18228 17.9541L2.1671 18.0351C2.15854 18.117 2.17011 18.1998 2.2008 18.2762C2.23149 18.3526 2.28037 18.4204 2.3432 18.4737C2.40603 18.5269 2.48091 18.564 2.56133 18.5818C2.64176 18.5995 2.7253 18.5974 2.80471 18.5755L6.90767 17.4562L7.07467 17.4025C7.34894 17.3013 7.59892 17.1424 7.8064 16.935L15.9415 8.79886ZM17.5284 3.22939C17.2669 2.9678 16.9564 2.7603 16.6146 2.61873C16.2729 2.47716 15.9066 2.4043 15.5367 2.4043C15.1667 2.4043 14.8005 2.47716 14.4587 2.61873C14.117 2.7603 13.8064 2.9678 13.5449 3.22939L12.6735 4.09978L16.657 8.08332L17.5274 7.21293L17.66 7.07124C18.1288 6.5333 18.3759 5.83749 18.3515 5.12438C18.3271 4.41126 18.0329 3.734 17.5284 3.22939ZM11.9286 3.4146H2.6701C2.53589 3.4146 2.40718 3.46791 2.31228 3.56281C2.21738 3.65771 2.16406 3.78643 2.16406 3.92064C2.16406 4.05485 2.21738 4.18356 2.31228 4.27846C2.40718 4.37336 2.53589 4.42668 2.6701 4.42668H10.9165L11.9286 3.4146ZM8.89236 6.45083H2.6701C2.53589 6.45083 2.40718 6.50415 2.31228 6.59905C2.21738 6.69395 2.16406 6.82266 2.16406 6.95687C2.16406 7.09108 2.21738 7.2198 2.31228 7.3147C2.40718 7.4096 2.53589 7.46291 2.6701 7.46291H7.88028L8.89236 6.45083ZM5.85613 9.48707L4.84405 10.4991H2.6701C2.53589 10.4991 2.40718 10.4458 2.31228 10.3509C2.21738 10.256 2.16406 10.1273 2.16406 9.99311C2.16406 9.8589 2.21738 9.73019 2.31228 9.63529C2.40718 9.54038 2.53589 9.48707 2.6701 9.48707H5.85613Z" fill={`${active === "draft" ? "white" :  "#A8AAB0"}`}/>
                    </svg>
                    <span className={`${active === "draft" && "text-white"} ms-1`}>Drafts</span>
                  </Link>
                </div>
            </div>
            <div className='flex flex-row w-1/4 pt-2 justify-between items-center px-5'>    
              <div className="relative">
                <input type="button" className={`${toggle ? "bg-white" : 'bg-grey5'} w-6 h-4 rounded-xl`} onClick={toggleSpan} />
                <span style={toggle ?  {top: "15%", right: "5%"} :{top: "15%", left: "5%"}} className={`${toggle ? "bg-dark" : "bg-white"} w-3 h-3 absolute rounded-xl`}></span>
              </div>
              <Link href="/pricing" className={`bg-blue rounded-md p-1 mx-7 flex flex-row justify-between text-white`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 34 33" fill="none">
                  <path d="M9.76562 9.69375C14.322 9.69375 18.0156 8.678 18.0156 7.425C18.0156 6.172 14.322 5.15625 9.76562 5.15625C5.20928 5.15625 1.51562 6.172 1.51562 7.425C1.51562 8.678 5.20928 9.69375 9.76562 9.69375Z" fill="#FFF27D"/>
                  <path d="M16.9844 6.31152C16.9991 6.38296 16.9991 6.45665 16.9844 6.52809C16.9844 7.76559 13.2925 8.79684 8.73438 8.79684C6.27419 8.89871 3.81879 8.50234 1.51562 7.63152C1.89719 8.78652 5.42406 9.69402 9.76562 9.69402C14.3238 9.69402 18.0156 8.66277 18.0156 7.42527C18.0156 7.02309 17.6238 6.64152 16.9844 6.31152Z" fill="#F7E76F"/>
                  <path d="M18.0156 7.4248V13.4679C18.0156 14.7261 14.3238 15.7367 9.76562 15.7367C5.2075 15.7367 1.51562 14.7054 1.51562 13.4679V7.4248C1.51562 8.67262 5.2075 9.69355 9.76562 9.69355C14.3238 9.69355 18.0156 8.67262 18.0156 7.4248Z" fill="#FFC661"/>
                  <path d="M10.2812 14.9014C5.72312 14.9014 2.03125 13.8701 2.03125 12.6326V8.2498C1.88406 8.16534 1.75998 8.04584 1.67004 7.90193C1.58009 7.75802 1.52705 7.59413 1.51562 7.4248V13.4679C1.51562 14.7261 5.2075 15.7367 9.76562 15.7367C14.3238 15.7367 18.0156 14.7054 18.0156 13.4679V13.4061C16.8503 14.2826 13.8906 14.9014 10.2812 14.9014Z" fill="#F7B54B"/>
                  <path d="M18.0156 13.4678V19.5315C18.0156 20.7793 14.3238 21.8003 9.76562 21.8003C5.2075 21.8003 1.51562 20.769 1.51562 19.5315V13.4678C1.51562 14.7259 5.2075 15.7365 9.76562 15.7365C14.3238 15.7365 18.0156 14.7259 18.0156 13.4678Z" fill="#FFF27D"/>
                  <path d="M10.2812 20.9551C5.72312 20.9551 2.03125 19.9238 2.03125 18.6863V14.2623C1.88945 14.1817 1.76879 14.0687 1.67915 13.9324C1.58952 13.7962 1.53348 13.6406 1.51562 13.4785V19.532C1.51562 20.7901 5.2075 21.8007 9.76562 21.8007C14.3238 21.8007 18.0156 20.7695 18.0156 19.532V19.4804C16.8503 20.3466 13.8906 20.9551 10.2812 20.9551Z" fill="#F7E76F"/>
                  <path d="M18.0156 19.5322V25.5754C18.0156 26.8129 14.3238 27.8441 9.76562 27.8441C5.2075 27.8441 1.51562 26.8129 1.51562 25.5754V19.5322C1.51562 20.78 5.2075 21.801 9.76562 21.801C14.3238 21.801 18.0156 20.78 18.0156 19.5322Z" fill="#FFC661"/>
                  <path d="M10.2812 27.0088C5.72312 27.0088 2.03125 25.9775 2.03125 24.74V20.316C1.88945 20.2354 1.76879 20.1224 1.67915 19.9861C1.58952 19.8499 1.53348 19.6943 1.51562 19.5322V25.5754C1.51562 26.8129 5.2075 27.8441 9.76562 27.8441C14.3238 27.8441 18.0156 26.8129 18.0156 25.5754V25.5238C16.8503 26.39 13.8906 27.0088 10.2812 27.0088Z" fill="#F7B54B"/>
                  <path d="M23.1719 27.8438C28.2978 27.8438 32.4531 23.6884 32.4531 18.5625C32.4531 13.4366 28.2978 9.28125 23.1719 9.28125C18.046 9.28125 13.8906 13.4366 13.8906 18.5625C13.8906 23.6884 18.046 27.8438 23.1719 27.8438Z" fill="#FFC661"/>
                  <path d="M24.2937 26.9159C22.4448 26.9127 20.6391 26.3573 19.108 25.3211C17.5768 24.2849 16.3901 22.815 15.6998 21.0998C15.0095 19.3847 14.8472 17.5025 15.2337 15.6945C15.6202 13.8865 16.5378 12.2352 17.869 10.9521C16.8027 11.6768 15.8991 12.6157 15.2157 13.7089C14.5324 14.8022 14.0843 16.0258 13.9 17.3018C13.7157 18.5778 13.7993 19.8782 14.1454 21.1201C14.4915 22.362 15.0926 23.5182 15.9103 24.5149C16.728 25.5117 17.7443 26.3272 18.8946 26.9094C20.0449 27.4916 21.3039 27.8278 22.5913 27.8965C23.8787 27.9652 25.1663 27.7649 26.372 27.3085C27.5778 26.852 28.6752 26.1493 29.5943 25.2453C28.0413 26.3341 26.1903 26.9175 24.2937 26.9159Z" fill="#F7B54B"/>
                  <path d="M23.1719 24.75C26.5891 24.75 29.3594 21.9798 29.3594 18.5625C29.3594 15.1452 26.5891 12.375 23.1719 12.375C19.7546 12.375 16.9844 15.1452 16.9844 18.5625C16.9844 21.9798 19.7546 24.75 23.1719 24.75Z" fill="#FFF27D"/>
                  <path d="M24.2008 23.7186C23.0481 23.7167 21.9189 23.3929 20.9404 22.7837C19.962 22.1745 19.1731 21.3041 18.6628 20.2706C18.1525 19.2371 17.941 18.0816 18.0521 16.9343C18.1633 15.787 18.5927 14.6936 19.292 13.7773C18.6026 14.3232 18.0374 15.0097 17.6342 15.7912C17.231 16.5726 16.9989 17.431 16.9536 18.3092C16.9082 19.1874 17.0505 20.0651 17.3711 20.884C17.6916 21.7028 18.183 22.4439 18.8125 23.0579C19.442 23.6719 20.1952 24.1447 21.0218 24.4447C21.8483 24.7447 22.7294 24.8651 23.6061 24.7978C24.4829 24.7306 25.3353 24.4772 26.1064 24.0546C26.8776 23.632 27.5498 23.0499 28.0783 22.347C26.98 23.233 25.6118 23.7169 24.2008 23.7186Z" fill="#F7E76F"/>
                </svg>
                <span className='ms-1 text-sm mt-1 font-semibold'>
                  1000 Tokens
                </span>
              </Link>
              <div className='relative'>
                <div onClick={toggleLogout} className='rounded-md p-1 flex flex-row items-center cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" className='bg-grey rounded-2xl me-1' width="30" height="30" viewBox="0 0 46 46" fill="none">
                    <path d="M38.3346 40.25V36.4167C38.3346 34.3833 37.5269 32.4333 36.0891 30.9955C34.6513 29.5577 32.7013 28.75 30.668 28.75H15.3346C13.3013 28.75 11.3513 29.5577 9.91348 30.9955C8.4757 32.4333 7.66797 34.3833 7.66797 36.4167V40.25" stroke="black" stroke-width="3.83333" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22.9987 21.0833C27.2329 21.0833 30.6654 17.6508 30.6654 13.4167C30.6654 9.18248 27.2329 5.75 22.9987 5.75C18.7645 5.75 15.332 9.18248 15.332 13.4167C15.332 17.6508 18.7645 21.0833 22.9987 21.0833Z" stroke="black" stroke-width="3.83333" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 17 11" fill="none">
                    <path d="M8.90132 10.5602L16.9979 0.439453H0.804688L8.90132 10.5602Z" fill="#A7A7A7"/>
                  </svg>
                </div>
                {showSettings && <div className={`absolute p-2 w-28 h-32 right-1 ${toggle ? "bg-grey" : " bg-grey2"}`}>
                  <Link href="/" className='flex flex-row items-center mb-2'>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-badge" viewBox="0 0 16 16">
                        <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
                      </svg>
                    <span className='ms-2'>Profile</span>
                  </Link>
                  <div className='flex flex-row items-center cursor-pointer'
                   onClick={() => {
                      handleLogout();
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                      <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                    </svg>
                    <span className='ms-2'>Log out</span>
                  </div>
                </div>
                }
              </div>
            </div>
            
      </div>
    </div>
  )
}
