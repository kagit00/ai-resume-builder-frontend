import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

const ResumeCreationPopUp = ({ isOpen, onClose, onSubmit }) => {
  const [resumeTitle, setResumeTitle] = useState('');

  const isValidTitle = (title) => {
    const titleRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9 ]*$/
    return titleRegex.test(title) && title.length >= 3
  }

  const handleConfirm = () => {
      onSubmit(resumeTitle);
      onClose();
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
            disabled={!isValidTitle(resumeTitle)}
            onClick={handleConfirm}
            className={`${isValidTitle(resumeTitle) ? "bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]" : "bg-gray-500 cursor-not-allowed"
              } text-white border-none rounded-full transition-colors duration-200`}
          >
            Confirm <ChevronRight className="ml-2 h-5 w-5 inline" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

ResumeCreationPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ResumeCreationPopUp;
