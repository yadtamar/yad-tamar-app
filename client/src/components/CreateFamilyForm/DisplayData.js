import { Typography, Grid } from "@mui/material";
import MainGreenButton from "../styled/MainGreenButton";
import { useParams, useNavigate } from "react-router";
import MainBlueButton from "../styled/MainBlueButton";
import { buttonStyle } from "./styles.js";
import DetailsItem from "../DetailsItem/DetailsItem.jsx";
import {
  familyStatusOptions,
  hospitalOptions,
  insuranseOptions,
  gendrerOptions,
  languageOptions,
} from "../../constants/SelectData.js";

const DisplayData = ({ data, image, setStep }) => {
  const displayDataFields = {
    personalInfo: [
      { fieldName: "שם פרטי", fieldValue: data.first_name },
      { fieldName: "שם משפחה", fieldValue: data.last_name },
      { fieldName: "טלפון בבית", fieldValue: data.home_phone },
      { fieldName: "טלפון נייד", fieldValue: data.cell_phone },
      { fieldName: "דוא''ל", fieldValue: data.mail },
      { fieldName: "כתובת", fieldValue: data.address },
      { fieldName: "יישוב", fieldValue: data.city },
      { fieldName: "גיל", fieldValue: data.age },
      { fieldName: "מגדר", fieldValue: gendrerOptions[data.gender - 1].option },
      {
        fieldName: "מצב משפחתי",
        fieldValue: familyStatusOptions[data.gender - 1].option,
      },
      { fieldName: "מס ילדים", fieldValue: data.kids_num },
      {
        fieldName: "שפה",
        fieldValue: languageOptions[data.language - 1].option,
      },
    ],
    medicalInfo: [
      { fieldName: "סוג המחלה", fieldValue: data.sickness },
      {
        fieldName: "בית חולים מטפל",
        fieldValue: hospitalOptions[data.hospital - 1].option,
      },
      {
        fieldName: "קופת חולים",
        fieldValue: insuranseOptions[data.medical_insurance - 1].option,
      },
      { fieldName: "היסטוריה רפואית", fieldValue: data.medical_history },
    ],
  };

  const handleUpdateFamily = () => {
    fetch(`/families/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
    });
    navigate("/families");
  };

  const handleCreateFamily = () => {
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
  };

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
      {displayDataFields.personalInfo.map(({ fieldName, fieldValue }) => (
        <DetailsItem fieldName={fieldName} fieldValue={fieldValue} />
      ))}

      <Typography variant="h5" marginBottom="20px" marginTop="20px">
        {"פרטים רפואיים"}
      </Typography>

      {displayDataFields.medicalInfo.map(({ fieldName, fieldValue }) => (
        <DetailsItem fieldName={fieldName} fieldValue={fieldValue} />
      ))}

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
          <MainGreenButton style={buttonStyle} onClick={handleUpdateFamily}>
            עדכן משפחה
          </MainGreenButton>
        ) : (
          <MainGreenButton style={buttonStyle} onClick={handleCreateFamily}>
            צור משפחה
          </MainGreenButton>
        )}
      </div>
    </Grid>
  );
};

export default DisplayData;
