import "./Volunteer.css";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import React from "react";
import { Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function Volunteer({ name, id, setVolunteers, family_id }) {
  const deleteVolunteer = async () => {
    const deleteResponse = await fetch(
      `http://18.197.147.245/api/volunteers/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (deleteResponse.ok) {
      try {
        const volunteersResponse = await fetch(
          `http://18.197.147.245/api/volunteers/volunteers-for-family/${family_id}`
        );
        if (volunteersResponse.ok) {
          const data = await volunteersResponse.json();
          setVolunteers(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="element-container">
      <AccountCircleTwoToneIcon className="icon" />
      <Typography variant="subtitle1">{name}</Typography>
      <ClearIcon
        onClick={() => {
          deleteVolunteer();
        }}
        fontSize="22px"
        className="delete-icon"
      />
    </div>
  );
}

export default Volunteer;
