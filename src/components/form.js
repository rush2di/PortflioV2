import React from "react"
import * as Yup from "yup"
import { withFormik, Form, Field } from "formik"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import {
  formName,
  formMessage,
  formBtn,
  formBtnLoading,
  successToast,
  errorToast,
} from "./translations/translations"

const Formy = ({ errors, touched, isSubmitting, handleSubmit, lang }) => {
  const isDirty = errors.name || errors.email || errors.message ? true : false

  return (
    <Form
      className="form"
      name="contact"
      data-netlify={true}
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <Field style={{ display: "none" }} name="lang" value={lang} />
      <div className="notification">
        {touched.name && errors.name && <p>{errors.name}</p>}
      </div>
      <Field
        className="field"
        type="text"
        name="name"
        placeholder={formName[lang]}
      />
      <div className="notification">
        {touched.email && errors.email && <p>{errors.email}</p>}
      </div>
      <Field className="field" type="email" name="email" placeholder="Email" />
      <div className="notification">
        {touched.message && errors.message && <p>{errors.message}</p>}
      </div>
      <Field
        className="field field-message"
        component="textarea"
        rows="2"
        type="text"
        name="message"
        placeholder={formMessage[lang]}
      />
      <ToastContainer />
      <button
        className="send-btn"
        disabled={isDirty || isSubmitting}
        type="submit"
      >
        {isSubmitting ? formBtnLoading[lang] : formBtn[lang]}
      </button>
    </Form>
  )
}

// helper function to encode the form values into query for netlify-forms //
///////////////////////////////////////////////////////////////////////////

const encodeFormValuesToQuery = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

// Enable reinitialize to detect lang prop changes /////////////////////
///////////////////////////////////////////////////////////////////////

const enableReinitialize = true

// react-toastify notifications ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const successNotification = lang =>
  toast(successToast[lang], {
    type: "success",
    className: "toast-success",
  })

const errorNotification = lang =>
  toast(errorToast[lang], {
    type: "error",
    className: "toast-error",
  })

// props to values mapper function for formik HOC /////////////////////////
//////////////////////////////////////////////////////////////////////////

const mapPropsToValues = ({ name, email, message, lang }) => {
  return {
    name: name || "",
    email: email || "",
    message: message || "",
    lang: lang || "english",
  }
}

// formik validation schema for fomik HOC ///////////////////////////////
////////////////////////////////////////////////////////////////////////

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "too short!").required("required"),
  email: Yup.string().email("not a valid email").required("required"),
  message: Yup.string().min(30, "too short!").required("required"),
})

// form submit handler function for formik HOC /////////////////////////
///////////////////////////////////////////////////////////////////////

const handleSubmit = (values, { resetForm, setSubmitting }) => {
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeFormValuesToQuery({ "form-name": "contact", ...values }),
  })
    .then(() => {
      successNotification(values.lang)
      resetForm()
    })
    .catch(() => {
      errorNotification(values.lang)
    })
    .finally(() => setSubmitting(false))
}

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit,
  enableReinitialize,
})(Formy)
