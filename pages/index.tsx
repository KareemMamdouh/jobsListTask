import Image from "next/image";
import { Inter } from "next/font/google";
import { useGetJobsQuery } from "/store/api";
import Filters from "/components/Filters/Filters";
import JobCard from "/components/JobCard/JobCard";
import styles from "../styles/Home.module.scss";
import { InputField } from "/components/Inputs/Inputs";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import JobModal, { ModalProps } from "/components/JobModal/JobModal";
export interface JobRequest {
  title: string;
  countries: string[];
  cities: string[];
  sectors: string[];
  page: string;
  perPage: string;
}

export default function Home() {
  const [state, setState] = useState<JobRequest>({
    title: "",
    countries: [],
    sectors: [],
    cities: [],
    page: "1",
    perPage: "10",
  });
  const [modal, setModal] = useState<ModalProps>({
    status: false,
    state: null,
  });
  const { data } = useGetJobsQuery(state);

  return (
    <main className={styles.jobsPage}>
      <section className={styles.filtersSection}>
        <Filters state={state} setState={setState} />
      </section>
      <section className={styles.jobsSection}>
        <div className={styles.jobsWrapper}>
          <div className={styles.headerWrapper}>
            <div className={styles.searchWrapper}>
              <InputField
                name="search"
                onChange={(e) => {
                  setState({ ...state, title: e });
                }}
                placeholder={"Search By Job Title"}
              />
            </div>
            <button
              type="button"
              onClick={() => setModal({ status: true, state: null })}
              className={styles.addJobBtn}
            >
              Add New Job
            </button>
          </div>
          <JobModal setModal={setModal} modal={modal} />
          {data &&
            data?.jobs?.map((job: any) => {
              return (
                <JobCard
                  key={job.id}
                  {...job}
                  handleEdit={(state) =>
                    setModal({ status: true, state: state })
                  }
                />
              );
            })}
          <div className={styles.pagination}>
            <ReactPaginate
              pageCount={
                data?.total ? Math.ceil(data?.total / +state.perPage) : 0
              }
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange={(e) =>
                setState({ ...state, page: `${e.selected + 1}` })
              }
              pageClassName={styles.pageNumber}
              activeClassName={styles.pageNumberActive}
              activeLinkClassName={styles.pageNumberActive}
              nextClassName={styles.pageNumber}
              previousClassName={styles.pageNumber}
              disableInitialCallback
            />
          </div>
        </div>
      </section>
    </main>
  );
}
