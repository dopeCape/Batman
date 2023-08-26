import React, {useState, useEffect} from 'react'
import { IoSearch } from 'react-icons/io5'
import { fetchUserDrafts } from '@/auth'
import { auth } from '@/firebase';
import Image from 'next/image';
export default function DraftSidebar() {
  const [drafts, setDrafts ] = useState<string[]>([])
  const user = auth.currentUser
  
  useEffect(()=>{ 
    fetchUserDrafts(user).then((userDrafts) => {
      setDrafts(userDrafts); 
      console.log("this is drafts"+ drafts)
    })
    .catch((error) => {
      console.log('Cannot get Drafts'+error);
    });
  },[])


  const extractFirstFourWords = (text: string) => {
    const words = text.split(' ');
    const firstFourWords = words.slice(0, 4).join(' ');
    return firstFourWords;
  };

  const renderDrafts = () => {
    const rows: JSX.Element[] = [];
    let currentRow: JSX.Element[] = [];

    drafts.forEach((draft, index) => {
      const shortenedDraft = extractFirstFourWords(draft);

      currentRow.push(
      <div className='flex w-1/3 h-40 mr-2 dark:bg-[#1C1C1C] flex-col border-[#2B2B2B] border overflow-hidden'>
        <div className='flex w-full h-3/4 items-center justify-center' >
        <Image className='object-contain mt-1' width={36} height={32} src={'/icons/document.png'} alt='document' />
        </div>
        <div className='flex dark:bg-[#232323] w-full h-1/4'>
        <li className=' text-xs' key={index}>{shortenedDraft}</li>
        </div>
        </div>
        );

      

      if ((index + 1) % 3 === 0 || index === drafts.length - 1) {
        rows.push(
          <div className='flex w-full my-2  h-40 ' key={index}>
           
            
            {currentRow}
            
          </div>
        );
        currentRow = [];
      }
    });

    return rows;
  };
  
  return (
    <div className='flex h-full w-full dark:bg-[#141414] bg-[#F2F2F2] px-4 py-4 flex-col'>
      <div className='flex w-2/5 h-8 dark:bg-[#232529] bg-white rounded-lg flex-row items-center px-2'>
        <IoSearch></IoSearch>
        <input className=' flex w-full h-full rounded-md dark:bg-[#232529] bg-white outline-none px-1' placeholder='Search Drafts'></input>
      </div>
      <div className='flex w-full h-full flex-col overflow-scroll mt-4'>

        {drafts.length>=0?renderDrafts():  <h1 className='self-center place-self-center text-gray-400'>No drafts</h1>}
      </div>
    </div>
  )
}
