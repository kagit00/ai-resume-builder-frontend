import { PlusSquare } from 'lucide-react'
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';

function AddResume() {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [resumeTitle, setResumeTitle] = React.useState();

  const onCreate = () => {
    const uuid = uuidv4();
    console.log(resumeTitle, uuid)
  }
  return (
    <div>
      <div className='p-14 py-24 border border-gray-800 items-center flex justify-center bg-gray-800 cursor-pointer border-dashed rounded-lg w-40 hover:scale-105 transition-all hover:shadow-md' onClick={() => setOpenDialog(true)}>
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>      
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Put a title for your resume
              <Input className='mt-2 mb-2' placeholder='Title' onChange={(e) => setResumeTitle(e.target.value)}/>
            </DialogDescription>
            <div className='flex justify-end gap-5'>
              <Button onClick={() => setOpenDialog(false)} variant='ghost'>Cancel</Button>
              <Button disabled={!resumeTitle} onClick={() => onCreate()}>Confirm</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddResume