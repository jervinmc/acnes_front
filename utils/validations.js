const standardRules = [v => !!v || "This field is required"];

const emptyObjectFieldRule = [
  v =>
    (v && Object.keys(v).length && v.constructor === Object) ||
    "This is field is required"
];

const notObjectFieldRule = [
  v => typeof v === "object" || "This field must be a reference from the list"
];

const emailRules = [
  v => !!v || "E-mail is required",
  v => /.+@.+\..+/.test(v) || "E-mail must be valid"
];

const emailFormatRule = [
  v => {
    if (v === null || v === "") return true;
    else return /.+@.+\..+/.test(v) || "E-mail must be valid";
  }
];

const max10Char = [v => v.length <= 10 || "Input too long!"];
const max150Char = [v => v.length < 150 || "Input too long!"];
const mobileChar = [
  v =>
    (v.length === 10 && !v.includes("-")) ||
    v.length === 12 ||
    "Invalid mobile format"
];

const fieldArrayRule = [v => v.length !== 0 || "This field is required"];

const fieldArraySingleRule = [
  v => v.length !== 0 || "This field is required",
  v => !(v.length > 1) || "You must choose only 1 role"
];

export default {
  standardRules,
  emptyObjectFieldRule,
  emailRules,
  emailFormatRule,
  max10Char,
  max150Char,
  mobileChar,
  fieldArrayRule,
  fieldArraySingleRule,
  notObjectFieldRule
};
