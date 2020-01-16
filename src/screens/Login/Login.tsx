import React, { useState, useEffect, useReducer } from "react";
import { Button, Form, Grid } from "semantic-ui-react";

import firebase from "../../firebase/firebase";
import { username, email, password } from "../../constants";
import { ILoginCredidentials } from "../../interface/user";
import "./Login.css";

const Login: React.FC = () => {
  const [userInput, setUserInput] = useReducer(
    (state: ILoginCredidentials, newState: ILoginCredidentials) => ({
      ...state,
      ...newState
    }),
    {
      email: "",
      password: ""
    }
  );

  useEffect(() => {
    if (!localStorage.getItem("refreshToken")) onRegister();
    const onAuthChanged: Promise<any> = firebase.isInitialized();
    onAuthChanged.then((data: any) =>
      localStorage.setItem("refreshToken", data.refreshToken)
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const newValue = e.target.value;
    setUserInput({ [name]: newValue });
  };

  return (
    <Grid verticalAlign={"middle"} centered columns={4}>
      <Grid.Row>
        <Grid.Column>
          <Form>
            <Form.Input
              label={"Email"}
              placeholder={"jonhdoe@test.com"}
              onChange={e => handleChange(e)}
              name={"email"}
            />
            <Form.Input
              label={"Password"}
              placeholder={"password"}
              onChange={e => handleChange(e)}
              name={"password"}
            />
            <Button type="submit" disabled={false}>
              Submit
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  async function onRegister(): Promise<void> {
    try {
      await firebase.register(username, email, password);
    } catch (error) {
      console.log(error.message);
    }
  }
};

export default Login;
