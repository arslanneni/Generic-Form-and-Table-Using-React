import React from "react";
import { useState } from "react";
import Table from "./Table";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import columns from "./TableData.json";
import AddIcon from "@mui/icons-material/Add";

export default function Form() {
  const [inputs, setInputs] = useState({});
  const [edits, setEdits] = useState({});
  const [data, setData] = useState([]);
  const [formJSON, setFormJSON] = useState(columns.column);
  const [isFieldVisible, setIsFieldVisible] = useState(false);
  const [newValue, setNewValue] = useState({
    name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setData((oldArray) => [...oldArray, inputs]);
  };

  const addField = () => {
    setIsFieldVisible(true);
  };

  const onSubmitClick = () => {
    formJSON.push(newValue);
    setIsFieldVisible(false);
  };

  const valueChange = (event) => {
    event.preventDefault();

    setNewValue((values) => ({
      name: event.target.value,
    }));
  };

  const HandleDelete = (k) => {
    setData(
      data.filter((e, i) => {
        return i != k;
      })
    );
  };

  const HandleEditChange = (key, e) => {
    setEdits(data[key]);
    const { name, value } = e.target;
    setEdits((values) => ({ ...values, [name]: value }));
  };

  const HandleEditSubmit = (key) => {
    let arr = data;
    arr[key] = edits;
    setData(arr);
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {formJSON.map((data) => {
          return (
            <TextField
              //id="outlined-name"
              label={data.name}
              variant="outlined"
              name={data.name}
              value={inputs[data.name] || ""}
              onChange={handleChange}
            />
          );
        })}
        <Button
          variant="contained"
          style={{ marginTop: "25px", maxWidth: "100px" }}
          type="submit"
        >
          Add
        </Button>
        <Button
          variant="contained"
          style={{ marginTop: "25px", maxWidth: "100px" }}
          onClick={addField}
        >
          <AddIcon />
        </Button>
        {isFieldVisible && (
          <div>
            <input onChange={valueChange} type="text" name="field"></input>
            <Button onClick={onSubmitClick}>Submit</Button>
          </div>
        )}{" "}
      </Box>
      <Table
        data={data}
        HandleDelete={HandleDelete}
        HandleEditChange={HandleEditChange}
        HandleEditSubmit={HandleEditSubmit}
      />
    </div>
  );
}
