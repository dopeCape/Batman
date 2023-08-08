// import React from 'react'
// import Link from 'next/link'
// import { useRouter } from "next/router";
// import { Logout } from '@/auth';
// import { useTheme } from 'next-themes';
// import { styled } from '@mui/material/styles';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch, { SwitchProps } from '@mui/material/Switch';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';


// export default function LoginNavBar() {
//   const NavLink = ({ href, children }: any) => {
//     const { asPath } = useRouter();
   
//     const isActive = asPath === href;

//     return (
//       <div className='flex h-full items-center'>

//         <Link className={`${isActive ? 'h-full items-center flex text-center dark:text-white border-b-4 dark:border-white border-[#3247CF] font-bold text-[#3247CF]' : 'dark:text-white text-[#3E4045] font-normal'
//           } font-bold cursor-pointer`} href={href}>

//         {children}

//       </Link>
//       </div>
//     );
//   };
//   const { theme, setTheme } = useTheme();
//   const handleThemeChange = () => {
//     setTheme(theme === 'dark' ? 'light' : 'dark'); // Toggle between 'dark' and 'light'
//   };
//   const IOSSwitch = styled((props: SwitchProps) => (
//     <Switch  focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
//   ))(({ theme }) => ({
//     width: 48,
//     height: 26,
//     padding: 0,
//     '& .MuiSwitch-switchBase': {
      
//       padding: 0,
//       margin: 2,
//       transitionDuration: '300ms',
//       '&.Mui-checked': {
        
//         transform: 'translateX(16px)',
//         color: '#fff',
//         '& + .MuiSwitch-track': {
//           backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'black',
          
//           opacity: 1,
//           border: 0,
//         },
//         '&.Mui-disabled + .MuiSwitch-track': {
//           opacity: 0.5,
//         },
//       },
//       '&.Mui-focusVisible .MuiSwitch-thumb': {
        
//         color: '#33cf4d',
//         border: '6px solid #fff',
//       },
//       '&.Mui-disabled .MuiSwitch-thumb': {
//         color:
//           theme.palette.mode === 'light'
//             ? theme.palette.grey[100]
//             : theme.palette.grey[600],
//       },
//       '&.Mui-disabled + .MuiSwitch-track': {
        
//         opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
//       },
//     },
//     '& .MuiSwitch-thumb': {
//       boxSizing: 'border-box',
//       width: 26,
//       height: 22,
//     },
//     '& .MuiSwitch-track': {
//       borderRadius: 26 / 2,
      
//       backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
//       opacity: 1,
//       transition: theme.transitions.create(['background-color'], {
//         duration: 500,
//       }),
//     },
//   }));
//   const router = useRouter();
//   const handleLogout = async () => {
//     try {
//       await Logout();
//       alert("User logged out successfully!");
//       router.push("/");
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   return (

//     <div className='w-screen h-20 dark:bg-[#1B1D21] flex bg-[#fff] flex-row items-center justify-around'>
//       <h1 className='font-bold text-3xl bg-gradient-to-r text-transparent from-[#00C5D7] to-[#0077BE] bg-clip-text'>Metridash</h1>
//       <NavLink href="/homepage">Content Creation</NavLink>
//       <NavLink href="/homepage/Dashboard">Dashboard</NavLink>
//       <NavLink href="/homepage/schedule">Schedule</NavLink>
//       <NavLink href="/homepage/drafts">Drafts</NavLink>
//       <FormControlLabel
//         control={<IOSSwitch onChange={handleThemeChange} defaultChecked={theme === 'dark'} sx={{ m: 1 }} />}
//         label={theme}
//       />
//       {/* <span onClick={() => setTheme("dark")}>Dark</span> |
//       <span onClick={() => setTheme("light")}>Light</span> | {theme} */}
//       <div
//         className="font-bold cursor-pointer "
//         onClick={() => {
//           handleLogout();
//         }}
//       >
//         <Link href="/">Log out</Link>
//       </div>
//     </div>
//   )
// }
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from "next/router";
import { useState } from 'react';
import { Logout } from '@/auth';
import { useTheme } from 'next-themes';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import coins from "../../public/navbarIcons/Coins.png";
import content from "../../public/navbarIcons/content-creation.png";
import dashboard from "../../public/navbarIcons/dashboard.png";
import draft from "../../public/navbarIcons/draft.png";
import profile from "../../public/navbarIcons/profile-dropdown.png";
import schedule from "../../public/navbarIcons/schedule.png";
import user from "../../public/navbarIcons/user.png";


export default function LoginNavBar() {
  const [showSettings, setShowSettings] = useState(false);
  const [toggle, setToggle] = useState(true);

  const toggleLogout = (e:any) => {
          e.preventDefault();
          setShowSettings(prev => !prev);
        };

  const NavLink = ({ href, src, alt, children }: any) => {
    const { asPath } = useRouter();
   
    const isActive = asPath === href;
    

    return (
      <div className='flex h-full items-center'>

      <Link className={`flex flex-row items-center ${isActive ? 'h-full items-center flex text-center px-3 dark:text-white border-b-4 dark:border-white border-[#3247CF] font-bold text-[#3247CF]' : 'dark:text-white text-[#3E4045] font-normal'
          } font-bold cursor-pointer`} href={href}>
        <Image src={src} alt={alt} width={15} height={15} className={isActive ? "text-white" : "text-dark"} />
        {children}
      </Link>
      </div>
    );
  };
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark'); // Toggle between 'dark' and 'light';
    setToggle(prev => !prev);
  };
  
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch  focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 35,
    height: 20,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        
        transform: 'translateX(16px)',
        color: 'black',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white',
          
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 15,
      height: 15,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      
      backgroundColor: theme.palette.mode === 'light' ? '#A7A7A7' : '#A7A7A7',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));
  const router = useRouter();
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
    <div className='w-screen h-20 dark:bg-[#1B1D21] flex bg-[#fff] flex-row items-center justify-around '>
      
      <Link href="/homepage" className='font-bold text-3xl bg-gradient-to-r text-transparent from-[#00C5D7] to-[#0077BE] bg-clip-text w-1/4 text-center'>Metridash</Link>
      <div className='flex flex-row items-center justify-around w-full h-full'>
      <NavLink href="/homepage" src={content} alt="content"> 
        <p className='ms-1'>
          Content creation
        </p>
      </NavLink>
      <NavLink href="/homepage/Dashboard" src={dashboard} alt="dashboard">
        <p className='ms-1'>
          Dashboard
        </p>
      </NavLink>
      
      <NavLink href="/homepage/schedule" src={schedule} alt="schedule">
        <p className='ms-1'>Schedule</p> 
      </NavLink>
      <NavLink href="/homepage/drafts" src={draft} alt="draft">
        <p className='ms-1'>Drafts</p>
      </NavLink>
      <FormControlLabel
        control={<IOSSwitch onChange={handleThemeChange} defaultChecked={theme === 'dark'} sx={{ m: 1 }} />}
        label=''
      />
      {/* <span onClick={() => setTheme("dark")}>Dark</span> |
      <span onClick={() => setTheme("light")}>Light</span> | {theme} */}

        <Link href="/pricing" className={`bg-[#3247CF] rounded-md p-1 flex flex-row justify-between text-white`}>
          <Image src={coins} alt='coins' width={20} height={20} />
          <span className='ms-1  text-white'>
            1000 Tokens
          </span>
        </Link>
        <div className='relative'>
                <div onClick={toggleLogout} className='rounded-md p-1 flex flex-row items-center cursor-pointer'>
                  <Image src={user} alt='user' className='bg-grey rounded-2xl me-1' width={30} height={30} /> 
                  <Image src={profile} alt='user' width={10} height={10} /> 
                </div>
                {showSettings && <div className={`absolute right-0 p-2 w-28 h-32 ${toggle ? "bg-grey" : " bg-grey2"}`}>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                      <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                    </svg>
                    <span className='ms-2'>Log out</span>
                  </div>
                </div>
                }
        </div>
        </div>
      {/* <div
        className="font-bold cursor-pointer "
        onClick={() => {
          handleLogout();
        }}
      >
        <Link href="/">Log out</Link>
      </div> */}
    </div>
  )
}