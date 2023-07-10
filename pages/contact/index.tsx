import React, { useState } from 'react'
import EmailIcon from "@mui/icons-material/Email";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import classes from "./contact.module.css";

export default function Contact() {

  const [name , setName ] = useState('')
  return (
    <div className={`${classes.contact__container} bg-gray-50`}>
      <div className={`${classes.contact_confirm} bg-gray-200 flex flex-col items-center pt-14 px-5`}>
        <h1 className='font-medium text-3xl text-blue-800'>Ready to create some awesome content?</h1>
        <p className='text-gray-500 py-5 text-left text-lg'>We'd love to hear back from you and help you to generate the best content. Please get in touch with us by dropping an email or filling out the form.</p>
        <div className='flex flex-row self-start'>
          <EmailIcon color='primary' className='self-start mr-2'></EmailIcon>
          <p className=' underline  text-gray-600'>contact@metridash.com</p>
        </div>
      </div>
      <div className={`${classes.contact__form} items-center bg-white text-left`}>
        <h1 className='font-medium text-2xl text-blue-800 mb-4'>Contact Us</h1>
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
        <Button className={classes.contact_btn} variant="contained">Submit</Button>
      </div>
    </div>
  )
}
