import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ResumeCreationPopUp = ({ isOpen, onClose, onSubmit }) => {
  const [resumeTitle, setResumeTitle] = useState('');

  const handleConfirm = () => {
    if (resumeTitle) {
      onSubmit(resumeTitle);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-gray-300 rounded-lg border-none shadow-2xl p-6">
        <DialogHeader className="pb-4 flex justify-between items-center">
          <DialogTitle className="text-xl font-semibold text-gray-200 tracking-wide">
            Create New Resume
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-400">
          Please provide a title for your resume:
          <Input
            className="mt-3 mb-4 w-full bg-transparent text-gray-200 rounded-none placeholder-gray-500 border-b-1 border-gray-100 border-t-0 border-l-0 border-r-0  px-4 py-2"
            placeholder="Enter resume title"
            onChange={(e) => setResumeTitle(e.target.value)}
          />
        </DialogDescription>
        <div className="flex justify-end gap-4">
          <Button
            disabled={!resumeTitle}
            onClick={handleConfirm}
            className={`${resumeTitle ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"
              } text-white border-none rounded-full px-6 py-2 transition-colors duration-200`}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeCreationPopUp;
