import "./VolunteerListElement.css";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import React from "react";
import { Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
function VolunteerListElement({ name, id, setVolunteers, family_id }) {
  return (
    <div className="element-container">
      <AccountCircleTwoToneIcon className="icon" />
      <Typography variant="subtitle1">{name}</Typography>
      <ClearIcon
        onClick={() => {
          fetch(`http://localhost:5000/delete_volunteer/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          fetch(`http://localhost:5000/volunteers_for_family/${family_id}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw response;
            })
            .then((data) => setVolunteers(data))

            .catch((err) => {
              if (err.statusText !== "OK") {
                console.log(err);
              }
            });
        }}
        fontSize="22px"
        className="delete-icon"
      />
    </div>
  );
}

export default VolunteerListElement;
