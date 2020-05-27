import React from "react"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const Formy = ({ 
  errors, 
  touched, 
  status,
  isSubmitting,
  handleSubmit 
}) => {
  console.log(status)
  const isDirty = (errors.name || errors.email) || errors.message ? true : false
  return (
    <Form 
    className="form"
    name="contact"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    onSubmit={handleSubmit}
    >
      <div className="notification">{touched.name && errors.name && <p>{errors.name}</p>}</div>
      <Field 
        className="field"
        type="text" 
        name="name" 
        placeholder="Full Name" 
      />
      <div className="notification">{touched.email && errors.email && <p>{errors.email}</p>}</div>
      <Field 
        className="field"
        type="email" 
        name="email"
        placeholder="Email"  
      />
      <div className="notification">
        {touched.message && errors.message && <p>{errors.message}</p>}
      </div>
      <Field 
        className="field field-message"
        component="textarea" 
        rows="2" 
        type="text" 
        name="message"
      />
      <button disabled={isDirty || isSubmitting} type="submit">
        { isSubmitting ? "loading..." : "Send"}
      </button>
    </Form>
  );
};

const mapPropsToValues = ({ name, email, message }) => {
  return {
    name: name || "",
    email: email || "",
    message: message || ""
  };
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "too short!")
    .required("required"),
  email: Yup.string()
    .email("not a valid email")
    .required("required"),
  message: Yup.string().min(4, "too short!").required()
});

const handleSubmit = (values, { resetForm, setSubmitting, setStatus }) => {
  setTimeout(() => {
    if (values.message.length < 5 || values.message === "") {
      console.log(values.message);
    } else {
      resetForm();
      setStatus(false)
      setSubmitting(false);
    }
  }, 1500);
};

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit
})(Formy);