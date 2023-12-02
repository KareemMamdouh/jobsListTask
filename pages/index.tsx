import Image from "next/image";
import { Inter } from "next/font/google";
import { useGetJobsQuery, useDeleteJobMutation } from "/store/api";
import Filters from "/components/Filters/Filters";
import JobCard from "/components/JobCard/JobCard";
import styles from "../styles/Home.module.scss";
import { InputField } from "/components/Inputs/Inputs";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState(undefined);

  const { data, isLoading, isError, refetch, ...props } = useGetJobsQuery({title:search});
  const [deleteJob] = useDeleteJobMutation();
  return (
    <main className={styles.jobsPage}>
      <section className={styles.filtersSection}>
        <Filters />
      </section>
      <section className={styles.jobsSection}>
        <div className={styles.jobsWrapper}>
          <div className={styles.headerWrapper}>
            <div className={styles.searchWrapper}>
              <InputField
                name="search"
                onChange={(e)=>setSearch(e)}
                placeholder={"Search By Job Title"}
              />
            </div>
            <button type="button" className={styles.addJobBtn}>
              Add New Job
            </button>
          </div>

          {data &&
            data?.map((job: any) => {
              return <JobCard key={job.id} {...job} />;
            })}
        </div>
      </section>
    </main>
  );
}
