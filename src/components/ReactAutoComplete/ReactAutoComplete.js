import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { useState } from "react";

const useStyles = makeStyles({
  select: {
    backgroundColor: "white",
    boxSizing: "border-box",
    border: "1px solid #428777",
    minWidth: "30%",
    width: "100%",
    // height: "30px",
    marginRight: "20px",
    borderRadius: "4px",
    padding: "1px 5px 5px 5px",
    fontSize: "10px",
    marginBottom: "10px",
  },
  text: {
    padding: "0px 10px",
    boxSizing: "border-box",
    // height:'20px',
    fontSize: "10px",
  },
});

function ReactAutoComplete({
  optionData,
  defValue,
  placeHolder,
  onChange,
  optionValue,
}) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState(optionValue);
  return (
    <Autocomplete
      className={classes.select}
      disablePortal
      id="combo-box-demo"
      onChange={(event, value) => {
        if (value == null) {
          setSelectedValue(value);
          onChange({ id: 0, name: "" });
        } else {
          onChange(value);
          setSelectedValue(value);
        }
      }}
      options={optionData}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      defaultValue={defValue}
      value={selectedValue}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.id}>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          className={classes.text}
          {...params}
          variant="standard"
          placeholder={placeHolder}
        />
      )}
    />
  );
}

export default ReactAutoComplete;
