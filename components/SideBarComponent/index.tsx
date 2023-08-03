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
// import InstagramIcon from '../../public/platformIcons/InstagramIcon.svg'
export default function SideBar() {




    const [openStates, setOpenStates] = React.useState(platforms.map(() => false));

    const handleClick = (index: number) => {
        const newOpenStates = [...openStates];
        newOpenStates[index] = !newOpenStates[index];
        setOpenStates(newOpenStates);
    };
    return (
        <div className='flex w-full bg-slate-300 h-full '>
            <div className='flex w-1/3 h-full bg-[#1B1D21] flex-col'>
                {platforms.map((platform, i) => (
                    <List key={i}>
                        <ListItemButton className='flex flex-row' onClick={() => handleClick(i)}>
                            <ListItemIcon className='flex flex-row justify-center ' >
                                <Image alt='' width={20} height={20} src={platform.icon} />
                            </ListItemIcon>
                            <ListItemText className='text-[#A7A7A7] justify-center' primary={platform.name} />
                            {openStates[i] ? <ExpandLess htmlColor='#FFFFFF' /> : <ExpandMore htmlColor='#FFFFFF' />}
                        </ListItemButton>
                        <Collapse in={openStates[i]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {platform.items.map((item, j) => (
                                    <button className='flex w-full items-end  pl-14 ' key={j}>
                                        <h1 className=' text-[#A7A7A7] pl-4  text-sm py-2 flex-row flex w-full text-left font-medium hover:border-r-2 border-gray-50 hover:bg-[#232529]' >{item}</h1>
                                    </button>
                                ))}
                            </List>
                        </Collapse>
                    </List>
                ))}
            </div>
        </div>
    )
}
