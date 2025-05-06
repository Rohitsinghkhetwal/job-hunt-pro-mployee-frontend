// stores/jobStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface JobStore {
  jobs: [],
  setJobs: (newJob:any) => void;
  
  
}

 const useJobStore = create<JobStore>()(
  persist(
    (set) => ({
      jobs: [],
      setJobs: (newJob:any) => set({jobs: newJob}),
    }),
    {
      name: "job-store",
    }
  )
);

export default useJobStore
