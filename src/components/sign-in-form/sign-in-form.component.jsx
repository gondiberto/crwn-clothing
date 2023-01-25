import { useState, useContext } from "react";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    // prevent default submiting the form
    event.preventDefault();

    try {
      //
      const { user } = await signInAuthWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("wrong password.");
          break;
        case "auth/user-not-found":
          alert("user not found, plesase sign up.");
          break;
        default:
          console.log(err.code);
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
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
            Sign In
          </Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInGoogleUser}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
