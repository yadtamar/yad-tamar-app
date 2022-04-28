import {
  formContainer,
  familyImg,
  leftLayout,
  buttonsContainer,
  buttonStyle,
} from "./styles";
import FormLabel from "../FormLabel/FormLabel.jsx";
import { TextField, Grid } from "@mui/material";
import family from "../../assets/family.png";
import MainBlueButton from "../styled/MainBlueButton";
import MainGreenButton from "../styled/MainGreenButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepTwoSchema } from "./schema";
import SelectField from "../Select/Select.jsx";
import { gendrerOptions, familyStatusOptions } from "../Select/SelectData";

const FormStepTwo = ({ setStep, data, setData, image, setImage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(stepTwoSchema), mode: "onBlur" });

  return (
    <>
      <Grid container flexDirection="row" height="100%">
        <Grid item xs={6.5} height="100%">
          <Grid container style={formContainer}>
            <FormLabel text={"גיל החולה"} />
            <TextField
              type="number"
              {...register("age")}
              error={!!errors.age}
              helperText={errors?.age?.message}
              value={data.age}
              onChange={(e) => {
                setData({ ...data, age: parseInt(e.target.value) });
              }}
            />
            <FormLabel text={"מגדר"} />
            <SelectField
              data={data}
              value={data.gender}
              setData={setData}
              register={register}
              registerAs="gender"
              options={gendrerOptions}
              errors={errors}
            />
            <FormLabel text={"מצב משפחתי"} />
            <SelectField
              data={data}
              value={data.family_status}
              setData={setData}
              register={register}
              registerAs="family_status"
              options={familyStatusOptions}
              errors={errors}
            />
            <FormLabel text={"מספר ילדים"} />
            <TextField
              {...register("kids_num")}
              error={!!errors.kids_num}
              helperText={errors?.kids_num?.message}
              value={data.kids_num}
              onChange={(e) => {
                setData({ ...data, kids_num: parseInt(e.target.value) });
              }}
            />
            <FormLabel text={"שפה"} />
            <TextField
              {...register("language")}
              error={!!errors.language}
              helperText={errors?.language?.message}
              value={data.language}
              size="small"
              onChange={(e) => {
                setData({ ...data, language: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={5.5} height="100%">
          <Grid item>
            <img
              className="family-img"
              style={familyImg}
              src={family}
              alt={"family"}
              loading="lazy"
            />
          </Grid>
          <Grid container style={leftLayout}>
            <Grid item width="100%">
              <Grid container style={buttonsContainer}>
                <Grid item>
                  <MainBlueButton
                    style={buttonStyle}
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    {"הקודם"}
                  </MainBlueButton>
                </Grid>
                <Grid item>
                  <MainGreenButton
                    style={buttonStyle}
                    onClick={handleSubmit(() => {
                      setStep(3);
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
export default FormStepTwo;
