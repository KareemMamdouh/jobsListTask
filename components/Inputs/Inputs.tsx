import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./Inputs.module.scss";
type AnyFunction = (...args: any[]) => any;

export const InputField = ({
  onChange,
  name,
  value,
  placeholder,
}: InputFieldProps) => {
  function debounce<T extends AnyFunction>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;

    return function debouncedFunction(...args: Parameters<T>): void {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const handleChange = (value: string) => {
    onChange(value);
  };

  const optimizedFn = debounce(handleChange, 500);

  return (
    <div className={styles.inputField}>
      <input
        onChange={(e) => optimizedFn(e.target.value)}
        name={name}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};
