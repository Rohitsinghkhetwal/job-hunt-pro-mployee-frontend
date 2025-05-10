import React, { useState } from "react";
import { BsBuilding } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import useJobStore from "../Store/Store";

const JobBoard: React.FC = () => {
  const {jobs, currentPage, setCurrentPage, fetchJobs,totalCount } = useJobStore();
  const [selectedJob, setSelectedJob] = useState(null);


  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchJobs();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchJobs();
    }
  };

  // useEffect(() => {
  //   fetchJobs(page);
  // }, [page]);

  return (
    <div className="flex h-screen mt-2">
      
      {/* Left Section  */}
      <div className="w-1/2 overflow-y-scroll border-r-2 border-gray-400 scrollbar-hide">
      {totalCount && (
        <h2 className="text-xl font-semibold mb-2 text-center">
        {totalCount} jobs found
      </h2>

      )}
      
        {jobs.map((job: any) => (
          <div
            key={job._id}
            className="p-6 hover:bg-gray-100 rounded-2xl cursor-pointer mx-4 my-2"
            onClick={() => setSelectedJob(job)}
          >
            <h2 className="text-lg font-semibold text-blue-600">{job.title}</h2>
            <p className="text-sm text-gray-600">
              {job.company} — {job.location}
            </p>
            {/* <p className="text-sm text-gray-500">{job.employment_type}</p> */}
            <div className="flex flex-row mt-2">
              <p className="text-sm text-gray-500 mt-1">From $19 per hour</p>
              <a href={job.job_link} className="px-6 rounded-xl py-1 text-pink-400 text-sm">
                Quick apply
              </a>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mx-4 my-4">
          <button
            className="text-pink-600 px-4 py-2 rounded cursor-pointer hover:to-pink-900"
            onClick={handlePrevPage}
          >
            Previous
          </button>


          <button
            className="text-pink-600 px-4 py-2 rounded hover:to-pink-900"
            onClick={handleNextPage}
            
          >
            Next
          </button>
        </div>
      </div>

      {/* Right section */}
      <div className="w-1/2 overflow-y-scroll">
        {selectedJob ? (
          <div>
            {/* Header Section */}
            <div className="flex items-center justify-between border-b-2 border-gray-400 p-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">{(selectedJob as any)?.title}</h1>

                <div className="flex flex-col gap-2 mt-2">
                  {/* Company Row */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <BsBuilding className="text-lg" />
                    <p>{(selectedJob as any)?.company}</p>
                  </div>

                  {/* Location Row */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <FaLocationDot className="text-base" />
                    <p>{(selectedJob as any)?.location}</p>
                  </div>
                </div>
              </div>

              <a
                href={(selectedJob as any)?.job_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-medium px-5 py-2 rounded-xl shadow-md transition duration-200"
              >
                Apply Now
              </a>
            </div>

            {/* Job Details Section */}
            <div className="">
              <h1 className="text-2xl font-bold mt-4 px-4">Job Details</h1>
              <div className="flex justify-between pl-4 w-1/2 mt-2">
                <p className="bg-gray-300 px-2 py-1 rounded-xl text-gray-700">
                  {(selectedJob as any)?.employment_type}
                </p>
                <p className="bg-gray-300 px-2 py-1 rounded-xl text-gray-700">
                  Posted on:{" "}
                  {new Date((selectedJob as any)?.postedDateTime.date).toDateString()}
                </p>
              </div>
              <p className="pl-4 mt-4 bg-gray-300 px-2 py-1 rounded-xl text-gray-700 w-fit ml-2">
                12 days ago
              </p>
            </div>
            <div className="border-b-2 border-gray-400 mt-6" />

            <div>
              <div>
                <h2 className="text-black font-bold text-xl p-4">
                  Full Job Description
                </h2>
                <h4 className="text-sm font-bold px-4">Role Description</h4>
                <p className="text-gray-700 text-[20px] pl-4 mt-4">
                  We are seeking a highly motivated and detail-oriented
                  professional to join our dynamic team. As a key member of our
                  organization, you will play a vital role in building,
                  improving, and maintaining digital solutions that drive real
                  impact. You’ll collaborate with cross-functional
                  teams—including design, engineering, and product management—to
                  deliver seamless user experiences and scalable systems. In
                  this role, you’ll take ownership of your work from concept to
                  deployment, contribute to team discussions, and bring a
                  proactive attitude toward problem-solving and innovation.
                  Whether working on user-facing features or improving backend
                  performance, your contributions will directly influence the
                  success of our products and services. We value a growth
                  mindset, team collaboration, and a strong sense of
                  accountability. If you are someone who enjoys learning new
                  technologies, solving complex problems, and delivering clean,
                  efficient work, we would love to hear from you.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10 text-2xl">
            Select a job to see details
          </p>
        )}
      </div>
    </div>
  );
};

export default JobBoard;
