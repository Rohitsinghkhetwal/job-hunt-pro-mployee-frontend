// stores/jobStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface JobStore {
  jobs: [];

  searchTerm: string;
  currentPage: number;
  totalCount: number;
  fetchJobs: () => Promise<void>;
  setJobs: (newjob: any) => void;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setTotalCount: (count: number) => void;
  
}

const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      jobs: [],
      searchTerm: "",
      currentPage: 1,
      totalCount: 0,
      setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setJobs: (newJob: any) => set({ jobs: newJob }),
      setTotalCount: (count: number) => set({ totalCount: count }),
      fetchJobs: async () => {
        const { searchTerm, currentPage, setJobs,setTotalCount } = get();

        try {
          const baseURL = import.meta.env.VITE_PUBLIC_SERVER_URL;
          const url =
          !searchTerm && searchTerm.trim() === ""
              ? `${baseURL}/get-jobs?page=${currentPage}&limit=20`
              : `${baseURL}/search?location=${searchTerm}&page=${currentPage}`;

          const res = await axios.get(url);
          setJobs(res.data.data);
          
          setTotalCount(res.data.numberOfJobs);
        } catch (err) {
          console.log("Error fetching jobs");
        }
      },
    }),
    {
      name: "job-store",
    }
  )
);

export default useJobStore;
