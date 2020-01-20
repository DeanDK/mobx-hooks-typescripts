export type InputProps = {
  label: string;
  placeholder: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTest: string;
};
