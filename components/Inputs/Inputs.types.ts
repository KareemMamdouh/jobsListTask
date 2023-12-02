interface InputFieldProps {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value?: string;
  placeholder?: string;
}
