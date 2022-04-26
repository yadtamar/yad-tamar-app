import * as yup from "yup";
export const stepOneSchema = yup.object().shape({
  first_name: yup
    .string("יש להכניס אותיות בעברית בלבד")
    .matches(/^([^0-9]*)$/, "שם לא יכול לכלול מספרים")
    .required("שדה זה הינו שדה חובה"),
  last_name: yup
    .string("יש להכניס אותיות בעברית בלבד")
    .matches(/^([^0-9]*)$/, "שם לא יכול לכלול מספרים")
    .required("שדה זה הינו שדה חובה"),
  home_phone: yup
    .string()
    .matches(/^([^a-z]*)$/, "יש להכניס ספרות בלבד")
    .min(9, "נא להקיש מספר בעל 9 ספרות")
    .max(9, "נא להקיש מספר בעל 9 ספרות")
    .required("שדה זה הינו שדה חובה"),
  cell_phone: yup
    .string()
    .matches(/^([^a-z]*)$/, "יש להכניס ספרות בלבד")
    .min(10, "יש להקיש מספר בעל 10 ספרות")
    .max(10, "יש להקיש מספר בעל 10 ספרות בלבד")
    .required("שדה זה הינו שדה חובה"),
  mail: yup
    .string()
    .email("נא להקליד כתובת תקינה")
    .required("שדה זה הינו שדה חובה"),
  address: yup.string().required("שדה זה הינו שדה חובה"),
  city: yup.string().required("שדה זה הינו שדה חובה"),
});

export const stepTwoSchema = yup.object().shape({
  age: yup
    .number("יש להקיש ספרות בלבד")
    .typeError("יש להקיש ספרות בלבד")
    .max(199, "נא להקיש גיל תקין")
    .required("שדה זה הינו שדה חובה"),
  gender: yup
    .string()
    .matches(/^([^0-9]*)$/, "מגדר אינו יכול להכיל מספרים")
    .required("שדה זה הינו שדה חובה"),
  family_status: yup
    .string()
    .matches(/^([^0-9]*)$/, "מצב משפחתי אינו יכול להכיל מספרים")
    .required("שדה זה הינו שדה חובה"),
  kids_num: yup
    .string()
    .matches(/^([^a-z]*)$/, "יש להכניס ספרות בלבד")
    .required("שדה זה הינו שדה חובה")
    .max(30, "מספר הילדים לא יכול להיות מעל 30")
    .required("שדה זה הינו שדה חובה"),
  language: yup
    .string()
    .matches(/^([^0-9]*)$/, "שפה לא יכולה להכיל מספרים")
    .required("שדה זה הינו שדה חובה"),
});
export const stepThreeSchema = yup.object().shape({
  sickness: yup.string().required("שדה זה הינו שדה חובה"),
  hospital: yup
    .number("יש להקיש ספרות בלבד")
    .typeError("יש להקיש ספרות בלבד")
    .max(199, "נא להקיש גיל תקין")
    .required("שדה זה הינו שדה חובה"),
  medical_insurance: yup.string().required("שדה זה הינו שדה חובה"),
  medical_history: yup.string().required("שדה זה הינו שדה חובה"),
});
