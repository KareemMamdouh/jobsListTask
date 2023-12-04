import Image from "next/image";
import placeholder from "/assets/placeholder.png";
import eyeIcon from "/assets/eyeIcon.png";
import trashIcon from "/assets/trashIcon.png";
import { useGetJobsQuery, useDeleteJobMutation } from "/store/api";
import { useEffect, useState } from "react";
import { InputField } from "/components/Inputs/Inputs";
import { countries, cities, sectors } from "/components/Filters/Filters.config";
import { Job } from "/pages/api/jobs";
import { usePostJobMutation } from "/store/api";
import { usePutJobMutation } from "/store/api";
import { useDispatch, useSelector } from "react-redux";
import styles from "./JobModal.module.scss";
export interface ModalProps {
  status: boolean;
  state: Job | null;
}

interface JobModalProps {
  modal: ModalProps;
  setModal: (e: any) => void;
}
const JobModal = ({ modal, setModal }: JobModalProps) => {
  const [state, setState] = useState<Job>({
    id: "",
    title: "",
    city: "",
    sector: "",
    country: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [postJob] = usePostJobMutation();
  const [putJob] = usePutJobMutation();
  useEffect(() => {
    if (modal?.state?.id) {
      setState(modal.state);
    }
  }, [modal.state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      state.title &&
      state.city &&
      state.sector &&
      state.country &&
      state.description
    ) {
      setError(null);
      if (modal?.state?.id) {
        putJob(state).then(() => {
          setModal({ status: false, state: null });
          setState({
            id: "",
            title: "",
            city: "",
            sector: "",
            country: "",
            description: "",
          });
        });
      } else {
        postJob(state).then(() => {
          setModal({ status: false, state: null });
          setState({
            id: "",
            title: "",
            city: "",
            sector: "",
            country: "",
            description: "",
          });
        });
      }
    } else {
      setError("please fill all inputs");
    }
  };
  return (
    <div className={styles.jobModal}>
      <div className={modal.status ? styles.ModalShow : styles.ModalHidden}>
        <div className={styles.ModalContent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.ModalHeading}>
              {modal.state?.id ? "Edit" : "Add"} New Job Post
            </div>
            <div className={styles.ModalBody}>
              <div className={styles.inputWrapper}>
                <input
                  name="search"
                  onChange={(e) =>
                    setState({ ...state, title: e.target.value })
                  }
                  placeholder={"Search By Job Title"}
                  value={state.title}
                />
              </div>
              <div className={styles.inputWrapper}>
                <select
                  name="sector"
                  onChange={(e) =>
                    setState({ ...state, sector: e.target.value })
                  }
                  value={state.sector}
                >
                  <option>sector</option>
                  {sectors.map((sector: string) => {
                    return <option key={sector}>{sector}</option>;
                  })}
                </select>
              </div>
              <div className={styles.inputWrapper}>
                <select
                  name="country"
                  onChange={(e) =>
                    setState({ ...state, country: e.target.value })
                  }
                  value={state.country}
                >
                  <option>country</option>
                  {countries.map((country: string) => {
                    return <option key={country}>{country}</option>;
                  })}
                </select>
              </div>
              <div className={styles.inputWrapper}>
                <select
                  name="city"
                  onChange={(e) => setState({ ...state, city: e.target.value })}
                  value={state.city}
                >
                  <option>city</option>
                  {cities.map((city: string) => {
                    return <option key={city}>{city}</option>;
                  })}
                </select>
              </div>
              <div className={styles.textareatWrapper}>
                <textarea
                  rows={5}
                  name="description"
                  placeholder="Description"
                  value={state.description}
                  onChange={(e) =>
                    setState({ ...state, description: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <p>{error}</p>
            <div className={styles.btnWrapper}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setModal({ status: false, state: null });
                }}
              >
                Cancel
              </button>
              <button type="submit" className={styles.saveBtn}>
                {modal.state?.id ? "Edit" : "Add New"} Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default JobModal;
