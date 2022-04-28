import { Typography, Grid } from "@mui/material";
import MainGreenButton from "../styled/MainGreenButton";
import { useParams, useNavigate } from "react-router";
import MainBlueButton from "../styled/MainBlueButton";

const DisplayData = ({ data, image, setStep }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Grid
      container
      overflow="auto"
      style={{
        height: "70vh",
        textAlign: "center",
        flexFlow: "column nowrap",
        alignItems: "center",
        paddingBottom: "30px",
      }}
    >
      <Typography variant="h5">שם פרטי</Typography>
      <Typography variant="subtitle1">{data.first_name}</Typography>
      <Typography variant="h5">שם משפחה</Typography>
      <Typography variant="subtitle1">{data.last_name}</Typography>
      <Typography variant="h5">טלפון בבית</Typography>
      <Typography variant="subtitle1">{data.home_phone}</Typography>
      <Typography variant="h5">טלפון נייד</Typography>
      <Typography variant="subtitle1">{data.cell_phone}</Typography>
      <Typography variant="h5">דוא''ל</Typography>
      <Typography variant="subtitle1">{data.mail}</Typography>
      <Typography variant="h5">כתובת</Typography>
      <Typography variant="subtitle1">{data.adress}</Typography>
      <Typography variant="h5">יישוב</Typography>
      <Typography variant="subtitle1">{data.city}</Typography>
      <Typography variant="h5">גיל </Typography>
      <Typography variant="subtitle1">{data.age}</Typography>
      <Typography variant="h5"> מגדר</Typography>
      <Typography variant="subtitle1">{data.gender}</Typography>
      <Typography variant="h5">מצב משפחתי</Typography>
      <Typography variant="subtitle1">{data.family_status}</Typography>
      <Typography variant="h5">מס ילדים</Typography>
      <Typography variant="subtitle1">{data.kids_num}</Typography>
      <Typography variant="h5">שפה</Typography>
      <Typography variant="subtitle1">{data.language}</Typography>
      <Typography variant="h5">סוג המחלה</Typography>
      <Typography variant="subtitle1">{data.typeofCancer}</Typography>
      <Typography variant="h5">בית חולים מטפל</Typography>
      <Typography variant="subtitle1">{data.hospital}</Typography>
      <Typography variant="h5">קופת חולים</Typography>
      <Typography variant="subtitle1">{data.medicalInsurance}</Typography>
      <Typography variant="h5">היסטוריה רפואית</Typography>
      <Typography variant="subtitle1">{data.medicalHistory}</Typography>
      <div className="display-btn-container">
        {id ? (
          <MainGreenButton
            onClick={() => {
              fetch(`/families/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              }).then((response) => {
                console.log(response);
              });
              navigate("/families");
            }}
          >
            עדכן משפחה
          </MainGreenButton>
        ) : (
          <MainGreenButton
            onClick={() => {
              const formData = new FormData();
              formData.append("data", data);
              formData.append("image", image);
              console.log(JSON.stringify(data));
              fetch("/families", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              }).then((response) => {
                if (response.ok) {
                  navigate("/families");
                }
              });
            }}
          >
            צור משפחה
          </MainGreenButton>
        )}
        <MainBlueButton
          onClick={() => {
            setStep(3);
          }}
        >
          {"חזור"}
        </MainBlueButton>
      </div>
    </Grid>
  );
};

export default DisplayData;
