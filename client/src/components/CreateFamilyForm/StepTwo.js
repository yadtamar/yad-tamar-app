import {
  formContainer,
  familyImg,
  leftLayout,
  buttonsContainer,
  buttonStyle,
} from "./styles";
import FormLabel from "../FormLabel/FormLabel.jsx";
import { TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import family from "../../assets/family.png";
import MainBlueButton from "../styled/MainBlueButton";
import MainGreenButton from "../styled/MainGreenButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepTwoSchema } from "./schema";

const FormStepTwo = ({ setStep, data, setData, image, setImage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(stepTwoSchema), mode: "onBlur" });
  const { id } = useParams();

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
            <TextField
              {...register("gender")}
              error={!!errors.gender}
              helperText={errors?.gender?.message}
              value={data.gender}
              onChange={(e) => {
                setData({ ...data, gender: e.target.value });
              }}
            />
            <FormLabel text={"מצב משפחתי"} />
            <TextField
              {...register("family_status")}
              error={!!errors.family_status}
              helperText={errors?.family_status?.message}
              value={data.family_status}
              onChange={(e) => {
                setData({ ...data, family_status: e.target.value });
              }}
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
            <img className="family-img" style={familyImg} src={family} />
          </Grid>
          <Grid container style={leftLayout}>
            <Grid item width="100%">
              <Grid container style={buttonsContainer}>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default FormStepTwo;
