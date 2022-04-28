import PageLayout from "../../components/PageLayout/PageLayout";
import FormStepOne from "../../components/CreateFamilyForm/StepOne";
import { useEffect, useState } from "react";
import FormStepTwo from "../../components/CreateFamilyForm/StepTwo";
import DisplayData from "../../components/CreateFamilyForm/DisplayData";
import FormStepThree from "../../components/CreateFamilyForm/StepThree";
import { useParams } from "react-router";

const CreateFamilyPage = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    first_name: "newFam",
    last_name: "newFam",
    home_phone: "123456789",
    cell_phone: "1234567890",
    mail: "newFam@newFam.com",
    address: "newFam",
    city: "newFam",
    age: "1",
    gender: "newFam",
    family_status: "newFam",
    kids_num: "1",
    language: "newFam",
    sickness: "newFam",
    hospital: "1",
    medical_insurance: "1",
    medical_history: "newFam",
  });
  /* useEffect(() => {
    if (id) {
      fetch(
        `http://ec2-18-195-126-1.eu-central-1.compute.amazonaws.com:5000/families/${id}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => setData(...data))
        .catch((err) => {
          if (err.statusText !== "OK") {
            console.log(err);
          }
        });
    }
  }, []); */
  return (
    <PageLayout
      pageComponent={
        <>
          {step === 1 && (
            <FormStepOne
              setStep={setStep}
              data={data}
              setData={setData}
              setImage={setImage}
              image={image}
            />
          )}
          {step === 2 && (
            <FormStepTwo setStep={setStep} data={data} setData={setData} />
          )}
          {step === 3 && (
            <FormStepThree setStep={setStep} data={data} setData={setData} />
          )}
          {step === 4 && <DisplayData data={data} setStep={setStep} />}
        </>
      }
      headerText={id ? "עריכת משפחה" : "יצירת משפחה"}
    />
  );
};
export default CreateFamilyPage;
{
  /* <DisplayData data={data} image={image} /> */
}
