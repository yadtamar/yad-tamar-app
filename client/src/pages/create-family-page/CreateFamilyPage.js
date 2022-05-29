import PageLayout from "../../components/PageLayout/PageLayout";
import FormStepOne from "../../components/CreateFamilyForm/StepOne";
import { useEffect, useState } from "react";
import FormStepTwo from "../../components/CreateFamilyForm/StepTwo";
import DisplayData from "../../components/CreateFamilyForm/DisplayData";
import FormStepThree from "../../components/CreateFamilyForm/StepThree";
import { useParams } from "react-router-dom";

const CreateFamily = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    first_name: "fdsf",
    last_name: "wwerw",
    phone: "123456789",
    cell_phone: "1234567890",
    mail: "fdsf@g.com",
    address: "fsdfdsf",
    city: "fsdfsdf",
    age: "2",
    gender: "2",
    family_status: "1",
    kids_num: "1",
    language: "2",
    sickness: "fsdf",
    hospital: "2",
    health_maintenance_organization: "1",
    medical_history: "fsdfsdf",
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
export default CreateFamily;
{
  /* <DisplayData data={data} image={image} /> */
}
