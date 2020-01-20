import React from "react";
import { Input } from "semantic-ui-react";
import { InputProps } from "../../models/input";

import "./SearchField.css";

const SearchField = ({
  label,
  placeholder,
  name,
  handleChange,
  dataTest
}: InputProps) => (
  <Input
    label={label}
    fluid
    placeholder={placeholder}
    onChange={e => handleChange(e)}
    name={name}
    data-test={dataTest}
  />
);

export default SearchField;
