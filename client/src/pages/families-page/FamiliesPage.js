import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import FamilyElement from "../../components/FamilyElement/FamilyElement";
import { TextField, Typography } from "@mui/material";
import MainBlueButton from "../../components/styled/MainBlueButton";
import Spinner from "../../components/Spinner/Spinner";
import "./FamiliesPage.css";
const Families = () => {
  const navigate = useNavigate();
  const [families, setFamilies] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredFamilies, setFilteredFamilies] = useState([]);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://18.197.147.245/api/families")
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
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.statusText !== "OK") {
          setError(err);
        }
      });
  }, [isLoading]);

  useEffect(() => {
    setFilteredFamilies(
      families.filter((family) => {
        return family.name_of_family
          .toLowerCase()
          .includes(filter.toLowerCase());
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
                    style={{
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      marginTop: "0px",
                    }}
                    onClick={() => {
                      navigate("/create-family");
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
            {isLoading ? (
              <div className="spinner-box">
                <Spinner />
              </div>
            ) : (
              <div className="families-card-div">
                {familiesToShow.map((family, index) => {
                  return (
                    <FamilyElement
                      key={family.family_id}
                      family_id={family.family_id}
                      name={family.name_of_family}
                      volunteers_count={family.volunteersCount}
                    />
                  );
                })}
              </div>
            )}
          </div>
        }
        headerText={"משפחות"}
      />
    </>
  );
};
export default Families;
