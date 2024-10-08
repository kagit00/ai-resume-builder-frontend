import { useState, useEffect } from 'react';
import SearchFilter from './SearchFilter';
import { deleteResume } from '@/services/ApiService';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from '../ConfirmModals/ConfirmDeleteModal';
import NothingToDisplay from '@/components/custom/UserDashboard/NothingToDisplay';
import { getResumeListByUserId } from '@/services/ApiService.js';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PendingResumes = ({ userDetails }) => {
     const navigate = useNavigate();
     const [titleFilter, setTitleFilter] = useState('');
     const [dateFilter, setDateFilter] = useState('');
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [selectedResumeId, setSelectedResumeId] = useState(null);
     const nothingToDisplayTextPendingResume = 'No Pending Resume Is Here.';
     const [filteredCards, setFilteredCards] = useState([]);
     const [isLoading, setIsLoading] = useState(false)
     const [pendingResumes, setPendingResumes] = useState([])

     useEffect(() => {
          fetchPendingResumesOfUser();
     }, [userDetails]);

     const fetchPendingResumesOfUser = async () => {
          try {
               setIsLoading(true)
               const data = await getResumeListByUserId(userDetails?.id, 'pending')
               setPendingResumes(data)
          } catch (err) {
               toast.error(err?.response?.data?.errorMsg, {
                    style: {
                         backgroundColor: '#1F2937',
                         color: '#fff'
                    },
               });
          } finally {
               setIsLoading(false)
          }
     }

     const filtered = useMemo(() => {
          if (pendingResumes && (titleFilter || dateFilter)) {
               return pendingResumes.filter(card => {
                    const titleMatch = card.title.toLowerCase().includes(titleFilter.toLowerCase());
                    const dateMatch = dateFilter ? card.updatedAt.includes(dateFilter) : true;
                    return titleMatch && dateMatch;
               });
          }
          return pendingResumes;
     }, [pendingResumes, titleFilter, dateFilter]);

     useEffect(() => {
          setFilteredCards(filtered);
     }, [filtered]);


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

     const confirmDelete = async () => {
          try {
               setIsLoading(true)
               setFilteredCards(prevCards => prevCards.filter(card => card.id !== selectedResumeId));
               await deleteResume(selectedResumeId);
          } catch (err) {
               console.error("Error deleting resume:", err);
          } finally {
               setIsLoading(false)
          }
          closeModal();
     };

     const handleResetFilter = () => {
          setTitleFilter('');
          setDateFilter('');
     };

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
          <>
               {isLoading && (
                    <div className="loader-overlay">
                         <div className="loader"></div>
                    </div>
               )}
               {pendingResumes.length > 0 ? (
                    <section id="pending-resumes" className="relative flex-1 flex flex-col py-20 px-10">
                         <div className="flex flex-col items-center mb-4">
                              <h2 className="text-3xl md:text-4xl lg:text-6xl mb-10 font-extralight leading-tight text-white">
                                   Pending Resumes
                              </h2>
                         </div>

                         <SearchFilter onApply={handleApplyFilter} onReset={handleResetFilter} />

                         <div className="flex space-x-8 overflow-x-auto hidden-scrollbar p-4 mt-10">
                              {filteredCards.map(card => (
                                   <div
                                        key={card.id}
                                        className="relative  max-w-300px min-w-[270px] md:max-w-[350px] md:min-w-[300px] bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 mb-6"
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
                                        <div className="flex flex-col justify-between h-full pt-2">
                                             <div className="mb-4">
                                                  <p className="font-thin text-4xl text-white mb-2 shadow-3xl p-2">
                                                       {card.title}
                                                  </p>
                                                  <p className="text-xs text-gray-200 leading-relaxed font-light px-2">
                                                       Enhance your chances of getting hired with a well-structured resume. Stand out from the crowd with a compelling CV!
                                                  </p>
                                             </div>

                                             <div className="flex items-center mt-4">
                                                  <span className="text-xs font-light text-gray-300 px-2">
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
                    </section>) : (
                    <NothingToDisplay text={nothingToDisplayTextPendingResume} userDetails={userDetails} />
               )
               }
          </>

     );
};

PendingResumes.propTypes = {
     userDetails: PropTypes.shape({
          id: PropTypes.number.isRequired,
     }).isRequired,
};

export default PendingResumes;
