import React, { useState } from 'react'
import EmailIcon from "@mui/icons-material/Email";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function Contact() {

  const [name , setName ] = useState('')
  return (
    <div className='flex flex-row bg-gray-50 w-screen h-screen'>
      <div className='w-2/5 h-screen bg-gray-200 flex flex-col items-center pt-14 px-10 '>
        <h1 className='font-medium text-5xl text-blue-800'>Ready to create some awesome content?</h1>
        <p className='text-gray-500 py-5 text-left text-lg'>We'd love to hear back from you and help you to generate the best content. Please get in touch with us by dropping an email or filling out the form.</p>
        <div className='flex flex-row self-start'>
          <EmailIcon color='primary' className='self-start mr-2'></EmailIcon>
          <p className=' underline  text-gray-600'>contact@metridash.com</p>
        </div>
      </div>
      <div className='flex flex-col w-3/5 h-screen items-center  pt-28  bg-white text-left'>
        <h1 className='font-medium text-5xl text-blue-800'>Contact Us</h1>
        <TextField
          sx={{
            marginTop: 1,
          }}
          id="outlined-controlled"
          className='w-8/12'
          label="Name"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TextField
           sx={{
            marginTop: 1,
          }}
          id="outlined-controlled"
          className='w-8/12 rounded-xl'
          label="Email"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TextField
          sx={{
            marginTop: 1,
            marginBottom:1
          }}
          id="outlined-multiline-static"
          label="message"
          multiline
          rows={4}
          className='w-8/12 my-1'
          // defaultValue="Default Value"
        />
        <Button variant="contained">Submit</Button>
      </div>
    </div>
  )
}
