// import React, {useState, useEffect} from 'react'
// import { IoSearch } from 'react-icons/io5'
// import { fetchUserDrafts } from '@/auth'
// import { auth } from '@/firebase';
// import { useAtom } from "jotai";
// import Image from 'next/image';
// import { draftAtom } from "@/utils/store";
// export default function DraftSidebar() {
//   const [drafts, setDrafts ] = useState([])
//   const user = auth.currentUser
//   const [_draft, setDraft] = useAtom(draftAtom);
//   const [searchText, setSearchText] = useState('');
//   useEffect(()=>{ 
//     fetchUserDrafts(user).then((userDrafts) => {
//       setDrafts(userDrafts); 
//       console.log("this is drafts"+ drafts)
//     })
//     .catch((error) => {
//       console.log('Cannot get Drafts'+error);
//     });
//   },[])

//   const handleDraft=(data:string)=>{
//       setDraft(data)
//   }

//   const filteredDrafts = drafts.filter((draft) =>
  
//       draft.toLowerCase().includes(searchText.toLowerCase())
  
// );

//   const handleSearchChange = (event: any) => {
//     setSearchText(event.target.value);
// };

//   const extractFirstFourWords = (text: string) => {
//     const words = text.split(' ');
//     const firstFourWords = words.slice(0, 4).join(' ');
//     return firstFourWords;
//   };

//   const renderDrafts = () => {
//     const rows: JSX.Element[] = [];
//     let currentRow: JSX.Element[] = [];

//     drafts.forEach((draft, index) => {
//       const shortenedDraft = extractFirstFourWords(draft);

//       currentRow.push(
//       <div onClick={()=>handleDraft(draft)} className='flex w-1/3 h-40 mr-2 dark:bg-[#1C1C1C] bg-[#D2D2D2] flex-col border-[#2B2B2B] dark:border overflow-hidden cursor-pointer '>
//         <div className='flex w-full h-3/4 items-center justify-center' >
//         <Image className='object-contain mt-1' width={36} height={32} src={'/icons/document.png'} alt='document' />
//         </div>
//         <div className='flex dark:bg-[#232323] bg-white w-full h-1/4'>
//         <li className=' text-xs pt-1 px-2' key={index}>{shortenedDraft}</li>
//         </div>
//         </div>
//         );

      

//       if ((index + 1) % 3 === 0 || index === drafts.length - 1) {
//         rows.push(
//           <div className='flex w-full my-2  h-40 ' key={index}>
           
            
//             {currentRow}
            
//           </div>
//         );
//         currentRow = [];
//       }
//     });

//     return rows;
//   };

//   const searchDrafts = () => {
//     const rows: JSX.Element[] = [];
//     let currentRow: JSX.Element[] = [];
  
//     filteredDrafts.forEach((draft, index) => {
//       const shortenedDraft = extractFirstFourWords(draft);
  
//       currentRow.push(
//         <div
//           onClick={() => handleDraft(draft)}
//           className='flex w-1/3 h-40 mr-2 dark:bg-[#1C1C1C] bg-[#D2D2D2] flex-col border-[#2B2B2B] dark:border overflow-hidden cursor-pointer'
//           key={index}
//         >
//           <div className='flex w-full h-3/4 items-center justify-center'>
//             <Image className='object-contain mt-1' width={36} height={32} src={'/icons/document.png'} alt='document' />
//           </div>
//           <div className='flex dark:bg-[#232323] bg-white w-full h-1/4'>
//             <li className='text-xs pt-1 px-2'>{draft.slice(0, 35)}</li>
//           </div>
//         </div>
//       );
  
//       if ((index + 1) % 3 === 0 || index === filteredDrafts.length - 1) {
//         rows.push(
//           <div className='flex w-full my-2  h-40  ' key={index}>
//             {currentRow}
//           </div>
//         );
//         currentRow = [];
//       }
//     });
  
//     return rows;
//   };
  
  
//   return (
//     <div className='flex h-full w-full dark:bg-[#141414] bg-[#F2F2F2] px-4 py-4 flex-col'>
//       <div className='flex w-2/5 h-8 dark:bg-[#232529] bg-white rounded-lg flex-row items-center px-2'>
//         <IoSearch></IoSearch>
//         <input onChange={handleSearchChange} className=' flex w-full h-full rounded-md dark:bg-[#232529] bg-white outline-none px-1' placeholder='Search Drafts'></input>
//       </div>
      
//       {searchText!==""?searchDrafts():null}
//       {searchText==""?

//       <div className='flex w-full h-full flex-col overflow-scroll mt-4'>

//         {drafts.length>=0?renderDrafts():  <h1 className='self-center place-self-center text-gray-400'>No drafts</h1>}
//       </div>:null
//       }
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import { fetchUserDrafts } from '@/auth';
import { auth } from '@/firebase';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { draftAtom } from '@/utils/store';
import Link from 'next/link';

interface Draft {
  draft: string;
  time: string;
  platform: string;
}

export default function DraftSidebar() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const user = auth.currentUser;
  const [_draft, setDraft] = useAtom(draftAtom);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    fetchUserDrafts(user)
      .then((userDrafts) => {
        setDrafts(userDrafts);
        console.log('These are the drafts', drafts);
      })
      .catch((error) => {
        console.log('Cannot get Drafts', error);
      });
  }, []);

  const handleDraft = (data: Draft) => {
    setDraft(data);
  };

  const filteredDrafts = drafts.filter((draft) =>
    draft.draft?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const extractFirstFourWords = (text: string) => {
    const words = text.split(' ');
    const firstFourWords = words.slice(0, 4).join(' ');
    return firstFourWords;
  };

  const renderDrafts = () => {
    const rows: JSX.Element[] = [];
    let currentRow: JSX.Element[] = [];
    
    drafts.forEach((draft, index) => {
      const shortenedDraft = extractFirstFourWords(draft.draft);

      currentRow.push(
        <div
          onClick={() => handleDraft(draft)}
          className="flex w-1/3 h-56 mr-2 dark:bg-[#1C1C1C] bg-[#D2D2D2] flex-col border-[#2B2B2B] dark:border overflow-hidden cursor-pointer"
          key={index}
        >
          <div className="flex w-full h-3/4 items-center justify-center">
            <Image
              className="object-contain mt-1"
              width={36}
              height={32}
              src={'/icons/document.png'}
              alt="document"
            />
          </div>
          <div className="flex flex-col dark:bg-[#232323] bg-white w-full py-2">
            <li className="text-xs  px-2" key={index}>
              {shortenedDraft}
            </li>
            <h1 className="text-xs pt-1 px-2">{draft.platform}</h1>
           
          </div>
        </div>
      );

      if ((index + 1) % 3 === 0 || index === drafts.length - 1) {
        rows.push(
          <div className="flex w-full my-2  h-56 " key={index}>
            {currentRow}
          </div>
        );
        currentRow = [];
      }
    });

    return rows;
  };

  const searchDrafts = () => {
    const rows: JSX.Element[] = [];
    let currentRow: JSX.Element[] = [];

    filteredDrafts.forEach((draft, index) => {
      const shortenedDraft = extractFirstFourWords(draft.draft);

      currentRow.push(
        <div
          onClick={() => handleDraft(draft)}
          className="flex  w-1/3 h-40 mr-2 dark:bg-[#1C1C1C] bg-[#D2D2D2] flex-col border-[#2B2B2B] dark:border overflow-hidden cursor-pointer"
          key={index}
        >
          <div className="flex w-full h-3/4 items-center justify-center">
            <Image
              className="object-contain mt-1"
              width={36}
              height={32}
              src={'/icons/document.png'}
              alt="document"
            />
          </div>
          <div className="flex flex-col dark:bg-[#232323] bg-white w-full h-1/4">
            <li className="text-xs pt-1 px-2">{draft.draft.slice(0, 30)}</li>
            <li className="text-xs pt-1 px-2">{draft.platform}</li>
          </div>
        </div>
      );

      if ((index + 1) % 3 === 0 || index === filteredDrafts.length - 1) {
        rows.push(
          <div className="flex w-full my-2  h-40  " key={index}>
            {currentRow}
          </div>
        );
        currentRow = [];
      }
    });

    return rows;
  };

  return (
    <div className="flex h-full w-full dark:bg-[#141414] bg-[#F2F2F2] px-4 py-4 flex-col">
      <div className="flex w-2/5 h-8 dark:bg-[#232529] bg-white rounded-lg flex-row items-center px-2">
        <IoSearch></IoSearch>
        <input
          onChange={handleSearchChange}
          className="flex w-full h-full rounded-md dark:bg-[#232529] bg-white outline-none px-1"
          placeholder="Search Drafts"
        />
      </div>

      {searchText !== '' ? searchDrafts() : null}
      {searchText === '' ? (
        <div className="flex w-full h-full flex-col overflow-scroll mt-4">
          {drafts.length>=1? 
            renderDrafts()
           : 
           <div className='flex w-full h-full items-center justify-center flex-col gap-y-2'>
             <h1 className="flex self-center text-md">The draft is currently empty.</h1>
              <Link href={'/homepage'} className='flex bg-blue-400 rounded-lg px-2 py-1'>
                  <h1>Create content</h1>
              </Link>
           </div>
          }
        </div>
      ) : null}
    </div>
  );
}
