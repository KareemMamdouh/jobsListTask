import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./Inputs.module.scss";
export const InputField = ({
  onChange,
  name,
  value,
  placeholder,
}: InputFieldProps) => {
  return (
    <div className={styles.inputField}>
      <input
        onChange={(e) => onChange(e.target.value)}
        name={name}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};
