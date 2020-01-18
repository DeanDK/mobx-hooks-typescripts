import React from "react";
import { Input } from "semantic-ui-react";
import { InputProps } from "../../models/input";

import "./SearchField.css";

const SearchField = ({
  label,
  placeholder,
  name,
  handleChange
}: InputProps) => (
  <Input
    label={label}
    fluid
    placeholder={placeholder}
    onChange={e => handleChange(e)}
    name={name}
  />
);

export default SearchField;
