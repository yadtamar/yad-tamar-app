import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Grid, Typography, Avatar } from "@mui/material";
import family from "../../assets/family.png";
import MainGreenButton from "../../components/styled/MainGreenButton";
import MainBlueButton from "../../components/styled/MainBlueButton";
import PageLayout from "../../components/PageLayout/PageLayout";
import "./VolunteersPage.css";
import VolunteerListElement from "../../components/VolunteerListElement/VolunteerListElement";
import AddVolunteerPopup from "../../components/AddVolunteerPopup/AddVolunteerPopup";

function VolunteersPage() {
  const navigate = useNavigate();
  const VolunteersPageLayout = () => {
    const [open, setOpen] = useState(false);
    const { family_id, name } = useParams();
    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
      {
        fetch(`http://localhost:5000/volunteers_for_family/${family_id}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .then((data) => {
            if (data.length > volunteers.length) {
              setVolunteers(data);
            }
          })

          .catch((err) => {
            if (err.statusText !== "OK") {
              console.log(err);
            }
          });
      }
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
                  if (volunteer.length > 0) {
                    return (
                      <VolunteerListElement
                        setVolunteers={setVolunteers}
                        name={volunteer[0]?.first_name}
                        id={volunteer[0]?.user_id}
                        family_id={family_id}
                        key={volunteer[0]?.user_id}
                      />
                    );
                  }
                })}
              </div>
            </Grid>
          </Grid>
          <Grid item xs={5.5} height="100%">
            <Grid item>
              <img className="family-img" alt="family-img" src={family}></img>
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
                    navigate(`/createtask/${family_id}`);
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

export default VolunteersPage;
