import React, { useEffect } from "react";
import { Button, Form, Grid } from "semantic-ui-react";

import firebase from "../../firebase/firebase";
import { username, email, password } from "../../constants";
import "./Login.css";

const Login: React.FC = () => {
  useEffect(() => {
    if (!localStorage.getItem("refreshToken")) onRegister();
    const onAuthChanged: Promise<any> = firebase.isInitialized();
    onAuthChanged.then((data: any) =>
      localStorage.setItem("refreshToken", data.refreshToken)
    );
  }, []);

  return (
    <Grid verticalAlign={"middle"} centered columns={4}>
      <Grid.Row>
        <Grid.Column>
          <Form>
            <Form.Input label={"Email"} placeholder={"jonhdoe@test.com"} />
            <Form.Input label={"Password"} placeholder={"password"} />
            <Button type="submit">Submit</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  async function onRegister() {
    try {
      await firebase.register(username, email, password);
    } catch (error) {
      console.log(error.message);
    }
  }
};

export default Login;
