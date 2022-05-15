import PageLayout from "../../components/PageLayout/PageLayout";
import FormStepOne from "../../components/CreateFamilyForm/StepOne";
import { useEffect, useState } from "react";
import FormStepTwo from "../../components/CreateFamilyForm/StepTwo";
import DisplayData from "../../components/CreateFamilyForm/DisplayData";
import FormStepThree from "../../components/CreateFamilyForm/StepThree";
import { useParams } from "react-router-dom";

const CreateFamilyPage = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    first_name: "ktestnew",
    last_name: "ktestnew",
    home_phone: "123456789",
    cell_phone: "1234567890",
    mail: "ktestnew@ktestnew.com",
    address: "ktestnew",
    city: "ktestnew",
    age: "122",
    gender: "1",
    family_status: "1",
    kids_num: "0",
    language: "2",
    sickness: "ktestnew",
    hospital: "23",
    medical_insurance: "1",
    medical_history: "ktestnewktestnewktestnewktestnew",
  });

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
