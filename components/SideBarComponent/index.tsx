import React from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import platforms from '@/data/sideBarPlatforms';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material';
// import InstagramIcon from '../../public/platformIcons/InstagramIcon.svg'
export default function SideBar() {




    const [openStates, setOpenStates] = React.useState(platforms.map(() => false));

    const handleClick = (index: number) => {
        const newOpenStates = [...openStates];
        newOpenStates[index] = !newOpenStates[index];
        setOpenStates(newOpenStates);
    };
    return (
        <div className='flex w-full bg-black h-full '>
            <div className='flex w-1/3 h-full bg-[#1B1D21] flex-col overflow-scroll'>
            <div className='h-8 flex flex-row mt-4 mx-4 bg-[#232529] rounded-md'>
                <SearchIcon className='text-white my-1 ml-2' />
                <input className=' bg-[#232529] rounded-md text-white outline-none pl-2' placeholder='Search' />
                
               
            </div>
                {platforms.map((platform, i) => (
                     
                    <List key={i}>
                      
                        <ListItemButton className='flex flex-row' onClick={() => handleClick(i)}>
                            <ListItemIcon className='flex flex-row justify-center ' >
                                <Image alt='' width={22} height={22} src={platform.icon} />
                            </ListItemIcon>
                            <h1 className='text-white justify-center text-md'  >{platform.name}</h1>
                            {openStates[i] ? <ExpandLess htmlColor='#FFFFFF' /> : <ExpandMore htmlColor='#FFFFFF' />}
                        </ListItemButton>
                        <Collapse in={openStates[i]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {platform.items.map((item, j) => (
                                    <button className='flex w-full items-end  pl-14 ' key={j}>
                                        <h1 className=' text-white pl-4 py-2 flex-row flex w-full text-left mb-4 text-md hover:border-r-2 border-gray-50 hover:bg-[#232529]' >{item}</h1>
                                    </button>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                ))}
            </div>
            <div className='flex w-2/3 bg-[#232529]'></div>
        </div>
    )
}
