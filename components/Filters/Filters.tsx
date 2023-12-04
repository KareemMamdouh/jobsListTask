import Image from "next/image";
import { Inter } from "next/font/google";
import { countries, cities, sectors } from "./Filters.config";
import styles from "./Filters.module.scss";
const Filters = ({
  setState,
  state,
}: {
  setState: (e: any) => void;
  state: any;
}) => {
  const handelFilterChange = (value: string, key: string) => {
    let newState = JSON.parse(JSON.stringify(state));
    const indexValue = newState[key].findIndex((x: string) => x === value);
    if (indexValue > -1 && newState[key].length > 0) {
      newState[key]?.splice(indexValue, 1);
      setState(newState);
    } else {
      newState[key] = [...newState[key], value];
      setState(newState);
    }
  };
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
              onChange={() => {
                handelFilterChange(sector, "sectors");
              }}
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
              id={"country" + index}
              name={country}
              onChange={() => {
                handelFilterChange(country, "countries");
              }}
            />
            <label htmlFor={"country" + index}> {country}</label>
          </div>
        );
      })}
      <h2>Cities</h2>
      {cities.map((city: string, index: number) => {
        return (
          <div className={styles.checkboxWrapper} key={city}>
            <input
              type="checkbox"
              id={"sector" + index}
              name={city}
              onChange={() => {
                handelFilterChange(city, "cities");
              }}
            />
            <label htmlFor={"sector" + index}> {city}</label>
          </div>
        );
      })}
    </div>
  );
};
export default Filters;
