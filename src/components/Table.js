import React, { useState } from "react";
import "./Table.css";
import columns from "./TableData.json";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import actions from "./Action.json";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";

export default function Table(props) {
  const [isEditFieldVisible, setIsEditFieldVisible] = useState(-1);

  const setEditValue = (k) => {
    if (isEditFieldVisible == -1) {
      setIsEditFieldVisible(k);
    } else {
      setIsEditFieldVisible(-1);
      props.HandleEditSubmit(k);
    }
  };

  const setHandleDelete = (k) => {
    setIsEditFieldVisible(-1);
    props.HandleDelete(k);
  };

  return props.data.length !== 0 ? (
    <div className="App">
      <table>
        <tr>
          {Object.keys(props.data[props.data.length - 1]).map((col) => {
            return <th>{col}</th>;
          })}
          <th>Actions</th>
        </tr>
        {props.data.map((val, key) => {
          return (
            <tr key={key}>
              {Object.keys(props.data[props.data.length - 1]).map((col, i) => {
                return isEditFieldVisible == key ? (
                  <td>
                    <input
                      onChange={(e) => props.HandleEditChange(key, e)}
                      type="text"
                      defaultValue={val[col]}
                      name={col}
                    ></input>
                  </td>
                ) : (
                  <td>{val[col]}</td>
                );
              })}
              {actions.Actions.map((e) => {
                if (
                  e == "Edit" &&
                  (isEditFieldVisible == -1 || isEditFieldVisible == key)
                ) {
                  return <EditIcon onClick={() => setEditValue(key)} />;
                } else if (e == "Delete") {
                  return (
                    <DeleteForeverIcon onClick={() => setHandleDelete(key)} />
                  );
                } else if (e == "View") {
                  return <RemoveRedEyeTwoToneIcon />;
                }
              })}
            </tr>
          );
        })}
      </table>
    </div>
  ) : (
    ""
  );
}
