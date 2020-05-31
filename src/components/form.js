import React from "react"
import * as Yup from "yup"
import { withFormik, Form, Field } from "formik"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Formy = ({ errors, touched, isSubmitting, handleSubmit }) => {
  const isDirty = errors.name || errors.email || errors.message ? true : false

  return (
    <Form
      className="form"
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <div className="notification">
        {touched.name && errors.name && <p>{errors.name}</p>}
      </div>
      <Field className="field" type="text" name="name" placeholder="Fullname" />
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
        placeholder="Write your message here"
      />
      <ToastContainer />
      <button
        className="send-btn"
        disabled={isDirty || isSubmitting}
        type="submit"
      >
        {isSubmitting ? "loading..." : "Send"}
      </button>
    </Form>
  )
}

const mapPropsToValues = ({ name, email, message }) => {
  return {
    name: name || "",
    email: email || "",
    message: message || "",
  }
}

const success = () =>
  toast("email succesfully sent", {
    type: "success",
    className: "toast-success",
  })

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "too short!").required("required"),
  email: Yup.string().email("not a valid email").required("required"),
  message: Yup.string().min(5, "too short!").required("required"),
})

const handleSubmit = (values, { resetForm, setSubmitting, setStatus }) => {
  setTimeout(() => {
    success()
    resetForm()
    setSubmitting(false)
  }, 1500)
}

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit,
})(Formy)
