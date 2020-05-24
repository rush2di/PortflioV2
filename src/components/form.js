import React from "react"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const Formy = ({ errors, touched, isSubmitting }) => {



  return (
    <Form 
    className="form"
    name="contact"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    >
      <div>{touched.name && errors.name && <p className="notification">{errors.name}</p>}</div>
      <Field 
        className="field"
        type="text" 
        name="name" 
        placeholder="Full Name" 
      />
      <div>{touched.email && errors.email && <p className="notification">{errors.email}</p>}</div>
      <Field 
        className="field"
        type="email" 
        name="email" 
        placeholder="Email"  
      />
      <div>
        {touched.message && errors.message && <p className="notification">{errors.message}</p>}
      </div>
      <Field 
        className="field field-message"
        component="textarea" 
        rows="2" 
        type="text" 
        name="message"
      />
      <button disabled={isSubmitting} type="submit">
        Send
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
  name: Yup.string().required("name is required"),
  email: Yup.string()
    .email("not a valid email")
    .required("email is required"),
  message: Yup.string().required()
});

const handleSubmit = (values, { resetForm, setSubmitting }) => {
  setTimeout(() => {
    if (values.message.length < 5 || values.message === "") {
      console.log(values.message);
      alert("invalid message");
    } else {
      console.log("submited");
      resetForm();
      setSubmitting(false);
    }
  }, 1500);
};

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit
})(Formy);