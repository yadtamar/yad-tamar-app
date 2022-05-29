import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Typography, Avatar } from "@mui/material";
import family from "../../assets/family.png";
import MainGreenButton from "../../components/styled/MainGreenButton";
import MainBlueButton from "../../components/styled/MainBlueButton";
import PageLayout from "../../components/PageLayout/PageLayout";
import "./VolunteersPage.css";
import Volunteer from "../../components/Volunteer/Volunteer";
import AddVolunteerPopup from "../../components/AddVolunteerPopup/AddVolunteerPopup";

function Volunteers() {
  const navigate = useNavigate();
  const VolunteersPageLayout = () => {
    const [open, setOpen] = useState(false);
    const { family_id, name } = useParams();
    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
      const fetchVolunteers = async () => {
        try {
          const response = await fetch(
            `http://18.197.147.245/api/volunteers/volunteers-for-family/${family_id}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.length > volunteers.length) {
              setVolunteers(data);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchVolunteers();
    }, [open, volunteers, family_id]);

    return (
      <>
        <AddVolunteerPopup
          open={open}
          setOpen={setOpen}
          family_id={parseInt(family_id)}
        />
        <Grid container flexDirection="row" height="100%">
          <Grid item xs={6.5} height="100%">
            <Grid container className="right-side-layout">
              <div className="name-avatar">
                <Avatar className="avatar" />
                <div className="name">
                  <Typography variant="subtitle1">משפחת</Typography>
                  <Typography variant="h4">{name}</Typography>
                </div>
              </div>
              <div className="volunteers-list">
                <Typography variant="h4" fontSize="20px" marginBottom="20px">
                  {"מתנדבים"}
                </Typography>
                {volunteers.map((volunteer) => {
                  return (
                    <Volunteer
                      setVolunteers={setVolunteers}
                      name={volunteer?.first_name}
                      id={volunteer?.user_id}
                      family_id={family_id}
                      key={volunteer?.user_id}
                    />
                  );
                })}
              </div>
            </Grid>
          </Grid>
          <Grid item xs={5.5} height="100%">
            <Grid item>
              <img
                className="family-img"
                src={family}
                alt="family"
                loading="lazy"
              ></img>
            </Grid>
            <Grid container marginTop="50%">
              <div className="create-or-add">
                <Typography fontSize="20px" variant="h4">
                  {"הוסף מתנדבים"}
                  <br /> {"או"} <br /> {"צור משימה"}
                </Typography>
                <MainBlueButton
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="btn"
                >
                  {"הוסף מתנדבים"}
                </MainBlueButton>
                <MainGreenButton
                  onClick={() => {
                    navigate(`/create-task/${family_id}`);
                  }}
                  className="btn"
                >
                  {"צור משימה"}
                </MainGreenButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
  return (
    <PageLayout
      pageComponent={<VolunteersPageLayout />}
      headerText={"מתנדבים"}
    />
  );
}

export default Volunteers;
