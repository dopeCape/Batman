import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
export default function Questions() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
      }));

  return (
    <div className='flex flex-col items-center w-full py-20 md:px-28 px-4'>
        <h1 className='text-3xl font-semibold'><span className="font-semibold text-[48px] leading-[54px] text-center text-transparent bg-clip-text bg-gradient-to-r from-[#009FFD] to-[#2A2A72] pb-2">Have Questions?</span>We've Got Answers.</h1>
        <h1 className='text-lg my-2'>Explore our FAQs or contact our support team. We're here to help.</h1>
        <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>
            <h1 className='text-lg font-semibold'>1. What is Metridash?</h1>
            <p className='px-2'>Metridash is an all-in-one content creation platform designed to empower creators like you. It combines AI-driven content generation, seamless multichannel publishing, content management, and real-time analytics to streamline your content creation process.</p>
        </Item>
        <Item>
            <h1 className='text-lg font-semibold'>2. How can Metridash help me as a creator?</h1>
            <p className='px-2'>Metridash helps creators overcome creative blocks by generating personalized content ideas and prompts. It simplifies content management across multiple platforms, saving you time and effort. Additionally, it provides real-time analytics to help you track content performance and make data-driven decisions.</p>
        </Item>
        <Item>
            <h1 className='text-lg font-semibold'>3. Do I need to be tech-savvy to use Metridash?</h1>
            <p className='px-2'>Not at all! Metridash is designed with user-friendliness in mind. Whether you're a tech guru or a beginner, you'll find our platform intuitive and easy to navigate.</p>
        </Item>
        <Item>
            <h1 className='text-lg font-semibold'>4. Can I use Metridash for different content platforms like YouTube, Instagram, and my TikTok?</h1>
            <p className='px-2'>Absolutely! Metridash supports content creation and publishing across a wide range of platforms, including YouTube, Instagram, Twitter, Facebook, TikTok, LinkedIn, and blogs. You can manage all your content in one place.
</p>
        </Item>
        <Item>
            <h1 className='text-lg font-semibold'>5. How does Metridash generate content ideas?</h1>
            <p className='px-2'>Metridash uses a proprietary algorithm that takes your niche, target audience, and other details into account to generate personalized content ideas and prompts. It's like having a creative brainstorming partner at your side.</p>
        </Item>
        <Item>
            <h1 className='text-lg font-semibold'>6. Is my data safe with Metridash?</h1>
            <p className='px-2'>We take data security seriously. Metridash employs robust security measures to protect your data. You can refer to our Privacy Policy for more details on how we handle and safeguard your information.</p>
        </Item>
        <Item>
            <h1 className='text-lg font-semibold'>7. How can I get started with Metridash?</h1>
            <p className='px-2'>Getting started is easy. Simply sign up for a Metridash account, and you'll gain access to a world of content creation possibilities. We offer both free and premium plans to suit your needs.</p>
        </Item>
        
      </Stack>
    </Box>
    </div>
  )
}
