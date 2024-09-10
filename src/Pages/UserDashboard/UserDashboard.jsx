import React, { useState, useEffect } from 'react';
import Header from '@/components/custom/Home/Header/GlobalHeader.jsx';
import { fetchUserDetailsFromToken, getResumeListByUserId } from '@/services/ApiService.js';
import DownloadableResumes from '@/components/custom/UserDashboard/DownloadableResumes';
import PendingResumes from '@/components/custom/UserDashboard/PendingResumes';
import SkeletonUserDashboard from './SkeletonUserDashboard';
import { useQuery } from '@tanstack/react-query';
import ProfileSection from './ProfileSection';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("section1");

  const { data: userDetails, isLoading: isUserDetailsLoading } = useQuery({
    queryKey: ['userDetails'],
    queryFn: fetchUserDetailsFromToken,
    staleTime: 50 * 60 * 1000,
    cacheTime: 50 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const isSkeletonLoading = isUserDetailsLoading;

  if (isSkeletonLoading) {
    return <SkeletonUserDashboard />;
  }

  return (
    <>
      {!isSkeletonLoading ? (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col font-sans overflow-x-hidden scroll-smooth">
          <Header onSectionChange={handleSectionChange} activeSection={activeSection} />
          {activeSection === "section1" && <ProfileSection userDetails={userDetails} />}
          {activeSection === "section2" && (<PendingResumes userDetails={userDetails} />)}
          {activeSection === "section3" && (<DownloadableResumes userDetails={userDetails} />)}
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  )
}

export default UserDashboard


