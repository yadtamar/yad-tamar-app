import { Typography, Grid } from "@mui/material";
import MainGreenButton from "../styled/MainGreenButton";
import { useParams, useNavigate } from "react-router";
import MainBlueButton from "../styled/MainBlueButton";
import { buttonStyle } from "./styles.jsx";
import DetailsItem from "../styled/DetailsItem";
import {
  familyStatusOptions,
  hospitalOptions,
  insuranseOptions,
  gendrerOptions,
  languageOptions,
} from "../Select/SelectData";
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
      <div className="details-header">
        <Typography variant="h4" color="#8ca8e0">
          {"נא לוודא את הפרטים לפני יצירת המשפחה"}
        </Typography>
      </div>
      <Typography variant="h5" marginBottom="20px">
        {"פרטים אישיים"}
      </Typography>
      <DetailsItem item>
        <Typography variant="subtitle1">שם פרטי</Typography>
        <Typography variant="subtitle1"></Typography>
        <Typography variant="subtitle1">{data.first_name}</Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">שם משפחה</Typography>
        <Typography variant="subtitle1">{data.last_name}</Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">טלפון בבית</Typography>
        <Typography variant="subtitle1">{data.home_phone}</Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">טלפון נייד</Typography>
        <Typography variant="subtitle1">{data.cell_phone}</Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">דוא''ל</Typography>
        <Typography variant="subtitle1">{data.mail}</Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">כתובת</Typography>
        <Typography variant="subtitle1">{data.address}</Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">יישוב</Typography>
        <Typography variant="subtitle1">{data.city}</Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">גיל </Typography>
        <Typography variant="subtitle1">{data.age}</Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1"> מגדר</Typography>
        <Typography variant="subtitle1">
          {gendrerOptions[data.gender - 1].option}
        </Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">מצב משפחתי</Typography>
        <Typography variant="subtitle1">
          {familyStatusOptions[data.family_status - 1].option}
        </Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">מס ילדים</Typography>
        <Typography variant="subtitle1">{data.kids_num}</Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">שפה</Typography>
        <Typography variant="subtitle1">
          {languageOptions[data.language - 1].option}
        </Typography>
      </DetailsItem>
      <Typography variant="h5" marginBottom="20px" marginTop="20px">
        {"פרטים רפואיים"}
      </Typography>
      <DetailsItem>
        <Typography variant="subtitle1">סוג המחלה</Typography>
        <Typography variant="subtitle1">{data.sickness}</Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">בית חולים מטפל</Typography>
        <Typography variant="subtitle1">
          {hospitalOptions[data.hospital - 1].option}
        </Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">קופת חולים</Typography>
        <Typography variant="subtitle1">
          {insuranseOptions[data.medical_insurance - 1].option}
        </Typography>
      </DetailsItem>
      <DetailsItem>
        <Typography variant="subtitle1">היסטוריה רפואית</Typography>
        <Typography variant="subtitle1">{data.medical_history}</Typography>
      </DetailsItem>
      <div className="display-btn-container">
        <MainBlueButton
          style={buttonStyle}
          onClick={() => {
            setStep(3);
          }}
        >
          {"חזור"}
        </MainBlueButton>
        {id ? (
          <MainGreenButton
            style={buttonStyle}
            onClick={() => {
              fetch(`http://localhost:5000/families/${id}`, {
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
            style={buttonStyle}
            onClick={() => {
              const formData = new FormData();
              formData.append("data", data);
              formData.append("image", image);
              console.log(JSON.stringify(data));
              fetch(
                "http://ec2-18-195-126-1.eu-central-1.compute.amazonaws.com:5000/families",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                }
              ).then((response) => {
                if (response.ok) {
                  navigate("/families");
                }
              });
            }}
          >
            צור משפחה
          </MainGreenButton>
        )}
      </div>
    </Grid>
  );
};

export default DisplayData;
