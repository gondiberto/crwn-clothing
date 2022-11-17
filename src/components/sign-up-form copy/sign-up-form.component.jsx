import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

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

  const handleSubmitSignIn = async (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // these ... means spread atributes, it will spread all the atributes inside formField
    // its the same as we put {displayName={formFields.displayName}, email={formFields.email} and so on...}
    setFormFields({ ...formFields, [name]: value });
  };

  const handleClickGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-container">
      <div>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmitSignIn}>
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
          <Button buttonType="default" type="submit">
            Sign In
          </Button>
        </form>
        <Button buttonType="google" onClick={handleClickGoogleUser}>
          Sign in with Google Popup
        </Button>
      </div>
      <div>
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
    </div>
  );
};

export default SignUpForm;
