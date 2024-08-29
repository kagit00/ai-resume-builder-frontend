import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createResume } from '@/services/ApiService';

function AddResume({userDetails}) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false)
  const [resumeTitle, setResumeTitle] = React.useState();
  const resumeDetails = {
    userDetails: userDetails,
    resumeTitle: resumeTitle,
  }

  const resume = {
    'title': resumeTitle,
  }

  const buildResume = async () => {
    const response = await createResume(resume, userDetails.id)
    navigate('/user/dashboard/resumeBuilder', {state: { resume: response, resumeDetails } }); 
  }

  return (
    <div>
      <div
        className="flex items-center justify-center  p-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"

        onClick={() => setOpenDialog(true)}
      >
        <div className="flex items-center justify-center mb-4 bg-gradient-to-r from-zinc-900 to-black rounded-full p-4 shadow-lg">
          <svg
            className="h-16 w-16 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>


      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-zinc-900 text-gray-100 rounded-lg border-none shadow-4xl">
          <DialogHeader className="pb-4 flex justify-between">
            <DialogTitle className="text-xl font-normal text-gray-200 tracking-wide">
              Create New Resume
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-400">
            Put a title for your resume
            <Input
              className="mt-2 mb-2 bg-zinc-900 text-gray-100 border-none rounded focus:ring-2 focus:ring-blue-600 placeholder-gray-500"
              placeholder="Title"
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </DialogDescription>
          <div className="flex justify-end gap-5 mt-4">
            <Button
              onClick={() => setOpenDialog(false)}
              className="text-gray-300 border-none bg-transparent"
            >
              Cancel
            </Button>
            <Button
              disabled={!resumeTitle}
              onClick={() => buildResume()}
              className="bg-blue-600 hover:bg-blue-700 text-white border-none"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume