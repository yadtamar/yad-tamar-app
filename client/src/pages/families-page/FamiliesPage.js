import PageLayout from "../../components/PageLayout/PageLayout";
import FamilyElement from "../../components/FamilyElement/FamilyElement";
import { TextField, Typography } from "@mui/material";
import MainBlueButton from "../../components/styled/MainBlueButton";
import { useNavigate } from "react-router";
import "./FamiliesPage.css";
import { useEffect, useState } from "react";
const FamiliesPage = () => {
  const navigate = useNavigate();
  const [families, setFamilies] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredFamilies, setFilteredFamilies] = useState([]);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    fetch("/families")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) =>
        setFamilies(
          data /* .filter((family) => {
          return family.last_name !== null;
        }) */
        )
      )
      .catch((err) => {
        if (err.statusText !== "OK") {
          setError(err);
        }
      });
  }, []);

  useEffect(() => {
    setFilteredFamilies(
      families.filter((family) => {
        return family.last_name.includes(filter);
      })
    );
  }, [filter]);
  const familiesToShow = filter ? filteredFamilies : families;

  return (
    <>
      <PageLayout
        pageComponent={
          <div>
            <div className="choose-or-create-main">
              <div className="choose-or-create-div" style={{}}>
                <div className="choose-text-div">
                  <Typography
                    color="white"
                    variant="h4"
                    className="chose-family"
                  >
                    {"בחר משפחה קיימת או"}
                  </Typography>
                </div>
                <div className="create-btn-div">
                  <MainBlueButton
                    className="new-family-button"
                    onClick={() => {
                      navigate("/createfamily");
                    }}
                  >
                    {"צור משפחה"}
                  </MainBlueButton>
                </div>
              </div>
            </div>
            <div className="search-bar-div">
              <TextField
                value={filter}
                size="small"
                fullWidth
                placeholder="חפש משפחה"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
            </div>

            <div className="families-card-div">
              {error !== undefined ? (
                <Typography variant="h4">{error.statusText}</Typography>
              ) : (
                familiesToShow.map((family, index) => {
                  return (
                    <FamilyElement
                      key={index}
                      family_id={family.family[0].family_id}
                      name={family.main_user[0].last_name}
                      volunteers_count={family.volunteers_count}
                    />
                  );
                })
              )}
            </div>
          </div>
        }
        headerText={"משפחות"}
      />
    </>
  );
};
export default FamiliesPage;
