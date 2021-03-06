import {
  formContainer,
  neighboorStyle,
  buttonsContainer,
  buttonStyle,
} from "./styles";
import FormLabel from "../FormLabel/FormLabel";
import { Grid, TextField } from "@mui/material";
import neighboor2 from "../../assets/neighboor2.svg";
import MainBlueButton from "../styled/MainBlueButton";
import MainGreenButton from "../styled/MainGreenButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepThreeSchema } from "./schema";
import SelectField from "../Select/Select.jsx";
import { leftLayout } from "./styles";
import { hospitalOptions, insuranseOptions } from "../../constants/SelectData";

const FormStepThree = ({ setStep, data, setData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(stepThreeSchema), mode: "onBlur" });
  return (
    <>
      <Grid container flexDirection="row" height="100%">
        <Grid item xs={6.5} height="100%">
          <Grid container style={formContainer}>
            <FormLabel text={"סוג המחלה"} />
            <TextField
              {...register("sickness")}
              error={!!errors.sickness}
              helperText={errors?.sickness?.message}
              value={data.sickness}
              onChange={(e) => {
                setData({ ...data, sickness: e.target.value });
              }}
            />
            <FormLabel text={"בית חולים מטפל"} />
            <SelectField
              value={data.hospital}
              data={data}
              setData={setData}
              register={register}
              registerAs="hospital"
              options={hospitalOptions}
              errors={errors}
            />
            <FormLabel text={"קופת חולים"} />
            <SelectField
              value={data.health_maintenance_organization}
              data={data}
              setData={setData}
              register={register}
              registerAs="health_maintenance_organization"
              options={insuranseOptions}
              errors={errors}
            />

            <FormLabel text={"היסטוריה רפואית"} />
            <TextField
              {...register("medical_history")}
              error={!!errors.medical_history}
              helperText={errors?.medical_history?.message}
              multiline
              rows={3}
              value={data.medical_history}
              onChange={(e) => {
                setData({ ...data, medical_history: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={5.5} height="100%">
          <Grid container style={leftLayout}>
            <Grid item style={{ minHeight: "361px", justifyContent: "center" }}>
              <img
                src={neighboor2}
                style={neighboorStyle}
                alt="neigboor"
                loading="lazy"
              />
            </Grid>
            <Grid item style={{ width: "100%", alignSelf: "flex-end" }}>
              <Grid container style={buttonsContainer}>
                <Grid item>
                  <MainBlueButton
                    style={buttonStyle}
                    onClick={() => {
                      setStep(2);
                    }}
                  >
                    {"הקודם"}
                  </MainBlueButton>
                </Grid>
                <Grid item>
                  <MainGreenButton
                    style={buttonStyle}
                    onClick={handleSubmit(() => {
                      setStep(4);
                    })}
                  >
                    {"הבא"}
                  </MainGreenButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default FormStepThree;
