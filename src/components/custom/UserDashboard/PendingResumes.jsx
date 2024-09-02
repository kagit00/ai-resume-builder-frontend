import React, { useState, useEffect } from 'react';
import SearchFilter from './SearchFilter';
import { deleteResume } from '@/services/ApiService';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from '../ConfirmModals/ConfirmDeleteModal';

const PendingResumes = ({ pendingResumes, userDetails }) => {
  const navigate = useNavigate();
  const [titleFilter, setTitleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [filteredCards, setFilteredCards] = useState(pendingResumes); 
  
  useEffect(() => {
    const filtered = pendingResumes.filter(card => {
      const titleMatch = card.title.toLowerCase().includes(titleFilter.toLowerCase());
      const dateMatch = dateFilter ? card.updatedAt.includes(dateFilter) : true;
      return titleMatch && dateMatch;
    });
    setFilteredCards(filtered);
  }, [pendingResumes, titleFilter, dateFilter]);

  const handleApplyFilter = (title, date) => {
    setTitleFilter(title);
    setDateFilter(date);
  };

  const openModal = (resumeId) => {
    setSelectedResumeId(resumeId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResumeId(null);
  };

  const confirmDelete = () => {
    setFilteredCards(prevCards => prevCards.filter(card => card.id !== selectedResumeId));
    deleteResume(selectedResumeId); // Ensure this calls your backend to delete the resume
    closeModal();
  };

     const handleResetFilter = () => {
          setTitleFilter('');
          setDateFilter('');
     };

     const deleteResumeById = async (id) => {
          await deleteResume(id);
     }

     const handleEditResume = (id, title) => {
          navigate('/user/dashboard/resumeBuilder', {
               state: {
                    resume: {
                         id: id,
                         title: title
                    },
                    resumeDetails: {
                         isEditMode: true,
                         userDetails
                    }
               }
          });
     }

     return (
          <section id="pending-resumes" className="relative flex-1 flex flex-col py-20 px-10">
               <div className="flex flex-col items-center mb-4">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl mb-10 font-extralight leading-tight text-white">
                         Pending Resumes
                    </h2>
               </div>

               <SearchFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

               <div className="flex space-x-4 overflow-x-auto hidden-scrollbar p-4 mt-10">
                    {filteredCards.map(card => (
                         <div
                              key={card.id}
                              className="relative min-w-[250px] bg-gradient-to-r from-black to-zinc-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 mb-6 mr-6"
                         >
                              {/* Action Icons */}
                              <div className="absolute top-4 right-4 flex items-center space-x-4">
                                   {/* Edit Icon */}
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6 p-1 rounded-full bg-white text-blue-500 hover:bg-blue-200 transition-colors cursor-pointer"
                                        onClick={() => handleEditResume(card.id, card.title)}

                                   >
                                        <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             d="M4 17v5h5l11-11-5-5L4 17zM13 4l3 3m0 0l-3 3m3-3L9 7"
                                        />
                                   </svg>

                                   {/* Delete Icon */}
                                   <svg
                                        onClick={() => openModal(card.id)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6 p-1 rounded-full bg-white text-red-500 hover:bg-red-200 transition-colors cursor-pointer"
                                   >
                                        <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             d="M3 6h18M4 6V4a1 1 0 011-1h14a1 1 0 011 1v2M5 6v12a2 2 0 002 2h10a2 2 0 002-2V6M10 11v6M14 11v6"
                                        />
                                   </svg>
                              </div>

                              {/* Card Content */}
                              <div className="flex flex-col justify-between h-full pt-8">
                                   <div className="mb-4">
                                        <p className="text-sm font-bold text-white mb-2 rounded-full truncate shadow-xl bg-gradient-to-r from-black via-zinc-900 to-zinc-700 p-2">
                                             {card.title}
                                        </p>
                                        <p className="text-xs text-gray-300 leading-relaxed px-2">
                                             Enhance your chances of getting hired with a well-structured resume. Stand out from the crowd with a compelling CV!
                                        </p>
                                   </div>

                                   <div className="flex items-center mt-4">
                                        <span className="text-xs font-semibold text-gray-500 px-2">
                                             {new Date(card.updatedAt).toLocaleString('en-US', {
                                                  month: 'long',
                                                  day: 'numeric',
                                                  year: 'numeric',
                                                  hour: 'numeric',
                                                  minute: 'numeric',
                                                  hour12: true,
                                             })}
                                        </span>
                                   </div>
                              </div>
                         </div>
                    ))}
                    <ConfirmDeleteModal
                         isOpen={isModalOpen}
                         onClose={closeModal}
                         onConfirm={confirmDelete}
                    />
               </div>
          </section>
     );
};

export default PendingResumes;
