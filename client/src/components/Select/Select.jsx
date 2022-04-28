import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

const SelectField = ({
  options,
  setData,
  data,
  errors,
  register,
  registerAs,
  value,
}) => {
  return (
    <Box style={{ width: "90%" }}>
      <FormControl fullWidth>
        <Select
          {...register(`${registerAs}`)}
          className="select"
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          id="select"
          value={value}
          onChange={(e) => {
            setData({ ...data, [registerAs]: e.target.value });
          }}
        >
          <MenuItem value="">{"בחר"}</MenuItem>
          {options.map(({ option, value }) => {
            return (
              <MenuItem key={value} value={value}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{errors?.[registerAs]?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default SelectField;
