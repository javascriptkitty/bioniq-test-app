import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default (props) => {
  const [value, setValue] = React.useState("");
  const valueChangeHandler = (event) => {
    setValue(event.target.value);
    props.onSearch(event.target.value);
  };

  return (
    <div className="tableSearch">
      <TextField
        onChange={valueChangeHandler}
        value={value}
        placeholder="search"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
