import Image from "next/image";
import { Inter } from "next/font/google";
import { countries, cities, sectors } from "./Filters.config";
import styles from "./Filters.module.scss";
const Filters = () => {
  return (
    <div className={styles.filters}>
      <h2>Sector</h2>
      {sectors.map((sector: string, index: number) => {
        return (
          <div className={styles.checkboxWrapper} key={sector}>
            <input
              type="checkbox"
              id={"sector" + index}
              name={sector}
              // value="Boat"
            />
            <label htmlFor={"sector" + index}> {sector}</label>
          </div>
        );
      })}
      <h2>Countries</h2>
      {countries.map((country: string, index: number) => {
        return (
          <div className={styles.checkboxWrapper} key={country}>
            <input
              type="checkbox"
              id={"sector" + index}
              name={country}
              // value="Boat"
            />
            <label htmlFor={"sector" + index}> {country}</label>
          </div>
        );
      })}
      <h2>Cities</h2>
      {cities.map((city: string) => {
        return <p key={city}>{city}</p>;
      })}
    </div>
  );
};
export default Filters;
