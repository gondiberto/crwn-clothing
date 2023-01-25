import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../../components/form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { useState } from "react";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    // prevent default submiting the form
    event.preventDefault();

    // check if passwords matchs
    if (password !== confirmPassword) {
      alert("pass doesnt match");
      return;
    }

    try {
      // autenticate using email and pass
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // create the doc at firebase
      const doc = await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create - email already in use");
      } else {
        console.log("user creation with error", err);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // these ... means spread atributes, it will spread all the atributes inside formField
    // its the same as we put {displayName={formFields.displayName}, email={formFields.email} and so on...}
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          required
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          required
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          required
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          required
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button buttonType="default" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
