import { Grid, Typography, Avatar } from "@mui/material";
import MainGreenButton from "../styled/MainGreenButton";
import MainGreyButton from "../styled/MainGreyButton";
import { useNavigate } from "react-router";
import "./FamilyElement.css";

const FamilyElement = ({ name, family_id, volunteers_count }) => {
  const navigate = useNavigate();
  return (
    <div style={{ marginBottom: "20px" }}>
      <Grid container>
        <div className="family-card-main">
          <div
            className="volunteers"
            onClick={() => {
              navigate(`volunteers/${family_id}/${name}`);
            }}
          >
            <Typography paddingRight="10px" variant="subtitle1" fontSize="14px">
              {volunteers_count}
              &nbsp;
              {"מתנדבים"}
            </Typography>
          </div>
          <div className="name-and-avatar">
            <div>
              <Avatar sx={{ width: 65, height: 65, mt: "10px" }} />
            </div>
            <div className="card-text">
              <Typography variant="subtitle1">{"משפחת"}</Typography>
              <Typography variant="h4">{name}</Typography>
            </div>
          </div>
          <div className="buttons-box">
            <MainGreenButton
              className="edit-family-btn"
              onClick={() => {
                navigate(`/create-task/${family_id}`);
              }}
            >
              {"צור משימות"}
            </MainGreenButton>
            <MainGreyButton
              className="create-task-btn"
              onClick={() => {
                navigate(`/create-family/${family_id}`);
              }}
            >
              {"ערוך משפחה"}
            </MainGreyButton>
          </div>
        </div>
      </Grid>
    </div>
  );
};
export default FamilyElement;
