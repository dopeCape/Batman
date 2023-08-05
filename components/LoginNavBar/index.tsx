import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import { Logout } from '@/auth';
import { useTheme } from 'next-themes';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export default function LoginNavBar() {
  const NavLink = ({ href, children }: any) => {
    const { asPath } = useRouter();
   
    const isActive = asPath === href;

    return (
      <div className='flex h-full items-center'>

        <Link className={`${isActive ? 'h-full items-center flex text-center dark:text-white border-b-4 dark:border-white border-[#3247CF] font-bold text-[#3247CF]' : 'dark:text-white text-[#3E4045] font-normal'
          } font-bold cursor-pointer`} href={href}>

        {children}

      </Link>
      </div>
    );
  };
  const { theme, setTheme } = useTheme();
  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark'); // Toggle between 'dark' and 'light'
  };
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch  focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 48,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'black',
          
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
      width: 26,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
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
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (

    <div className='w-screen h-20 dark:bg-[#1B1D21] flex bg-[#fff] flex-row items-center justify-evenly'>
      <h1 className='font-bold text-3xl bg-gradient-to-r text-transparent from-[#00C5D7] to-[#0077BE] bg-clip-text'>Metridash</h1>
      <NavLink href="/homepage">Dashboard</NavLink>
      <NavLink href="/homepage/contentCreation">Content creation</NavLink>
      <NavLink href="/homepage/schedule">Schedule</NavLink>
      <NavLink href="/homepage/drafts">Drafts</NavLink>
      <FormControlLabel
        control={<IOSSwitch onChange={handleThemeChange} defaultChecked={theme === 'dark'} sx={{ m: 1 }} />}
        label={theme}
      />
      {/* <span onClick={() => setTheme("dark")}>Dark</span> |
      <span onClick={() => setTheme("light")}>Light</span> | {theme} */}
      <div
        className="font-bold cursor-pointer "
        onClick={() => {
          handleLogout();
        }}
      >
        <Link href="/">Log out</Link>
      </div>
    </div>
  )
}
