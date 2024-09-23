import './SkeletonUserDashboard.css';


const SkeletonUserDashboard = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
      <header className="p-6 bg-zinc-00">
        <div className="skeleton h-40 w-full rounded-md"></div>
      </header>

      <section id="home" className="relative flex-1 flex flex-col py-0 px-10">

        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Add Resume Card */}
          <div className="relative p-6 rounded-lg shadow-lg bg-black border border-zinc-800 hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            <div className="skeleton h-48 w-full rounded-lg"></div>
            <div className="mt-4">
              <h4 className="text-xl font-semibold text-white blur-text">Add Resume</h4>
              <p className="text-sm text-gray-400 mt-2 blur-text">Quickly add and manage your resumes.</p>
            </div>
          </div>

          {/* Resume Tips Card */}
          <div className="relative p-6 rounded-lg shadow-lg bg-black border border-zinc-800 hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            <div className="skeleton h-48 w-full rounded-lg"></div>
            <div className="mt-4">
              <h4 className="text-xl font-semibold text-white blur-text">Resume Tips</h4>
              <p className="text-sm text-gray-400 mt-2 blur-text">Discover best practices for resume writing.</p>
            </div>
          </div>

          {/* Profile Settings Card */}
          <div className="relative p-6 rounded-lg shadow-lg bg-black border border-zinc-800 hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            <div className="skeleton h-48 w-full rounded-lg"></div>
            <div className="mt-4">
              <h4 className="text-xl font-semibold text-white blur-text">Profile Settings</h4>
              <p className="text-sm text-gray-400 mt-2 blur-text">Customize and view your profile settings.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkeletonUserDashboard;
