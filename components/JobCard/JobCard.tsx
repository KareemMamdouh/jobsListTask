import Image from "next/image";
import placeholder from "/assets/placeholder.png";
import eyeIcon from "/assets/eyeIcon.png";
import trashIcon from "/assets/trashIcon.png";

import styles from "./JobCard.module.scss";
const JobCard = ({
  title,
  country,
  city,
  sector,
  description,
}: JobCardProps) => {
  return (
    <div className={styles.jobCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={placeholder}
          alt="placeholder"
          width="120"
          height={"120"}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className={styles.contentWrapper}>
        <h2>{title}</h2>
        <p>
          {city}, {country}
        </p>
        <p>{sector}</p>
        <p>{description}</p>
      </div>
      <div className={styles.actionsWrapper}>
        <button type="button" onClick={() => console.log("first")}>
          <Image
            src={eyeIcon}
            alt="eyeIcon"
            width="25"
            height={"25"}
            style={{ objectFit: "contain" }}
          />
        </button>
        <button type="button" onClick={() => console.log("first")}>
          <Image
            src={trashIcon}
            alt="trashIcon"
            width="25"
            height={"25"}
            style={{ objectFit: "contain" }}
          />
        </button>
      </div>
    </div>
  );
};
export default JobCard;
