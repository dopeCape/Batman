import React from 'react'
import Image from 'next/image'
import idea from '../../public/icons/idea.png'
import caption from '../../public/icons/caption.png'
import hashtag from '../../public/icons/hashtag.png'
import thumbnail from '../../public/icons/thumbnail.png'
import magic from '../../public/icons/magic.png'
const features = () => {
  return (
    <div className='flex flex-row bg-gray-50 w-screen h-screen'>
        <div className='flex flex-col w-1/2 h-screen items-center justify-center bg-white'>
        
        <Image
                src={magic}
                alt="Picture of the author"
                className='w-32 object-contain h-34 mb-10'
              />
          <h1 className='text-blue-600 text-4xl font-medium px-28 text-left'>Create content by using the power of AI</h1>
          <p className='text-gray-500 px-28 py-5 text-left text-lg'>Generate personalized conten ideas for your social media, blogs, websites and more with the power of AI.</p>
        </div>

        <div className='w-1/2 h-screen bg-gradient-to-r from-[#009FFD] to-[#2A2A72] flex flex-col items-center pt-14 '>
          <h1 className='text-black text-3xl font-medium text-white mb-4'>Features</h1>
          <div className='flex flex-row'>
            
          <div>
              <div className=' drop-shadow-lg w-80 h-96 bg-white my-5 mx-1 flex flex-col items-center justify-center px-6'>
              <Image
                src={idea}
                alt="Picture of the author"
                className='w-32 object-contain h-34 mb-5'
              />
                <h2 className='text-gray-500 text-center text-md'>Generate engaging post ideas that spark conversations and drive interactions.</h2>
              </div>
              
              <div className='w-80 h-40 bg-white drop-shadow-lg my-1 mx-1 flex flex-col items-center justify-center px-2'>
              <Image
                src={caption}
                alt="Picture of the author"
                className='w-12 object-contain h-14 mb-2'
              />
                <h2  className='text-gray-500 text-center text-sm'>Write scroll-stopping captions that encourage people to stop, look, and like.</h2>
              </div>
          </div>
          <div>
              <div className='drop-shadow-lg w-80 h-40 bg-white my-5 mx-1 flex flex-col items-center justify-center px-2'>
                <Image
                src={hashtag}
                alt="Picture of the author"
                className='w-12 object-contain h-14 mb-2'
              />
                <h2  className='text-gray-500 text-center text-sm'>Discover relevant tags to optimize your videos for better search rankings.</h2>
              </div>
              <div className='drop-shadow-lg w-80 h-96 bg-white my-1 mx-1 flex flex-col items-center justify-center px-6'>
                <Image
                  src={thumbnail}
                  alt="Picture of the author"
                  className='w-18 object-contain h-20 mb-5'
                />
                <h2 className='text-gray-500 text-center text-md'>Grab viewers' attention and increase click-through rates with eye-catching thumbnail ideas that make your YouTube videos stand out.</h2>
              </div>
          </div>
          </div>
        </div>
    </div>
    
  )
}

export default features