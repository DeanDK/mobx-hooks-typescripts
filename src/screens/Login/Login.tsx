import React, { useEffect, useReducer, useContext } from "react";
import { Button, Form, Grid } from "semantic-ui-react";

import { username, email, password } from "../../constants";
import { ILoginCredidentials } from "../../models/user";
import { RootStoreContext } from "../../stores/rootStore";
import "./Login.css";

const Login: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
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
    if (!localStorage.getItem("isAccountCreated")) {
      rootStore.userStore.register(username, email, password);
    }
  }, [rootStore.userStore]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const newValue = e.target.value;
    setUserInput({ [name]: newValue });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    rootStore.userStore.login(userInput.email, userInput.password);
  };

  return (
    <Grid verticalAlign={"middle"} centered columns={4}>
      <Grid.Row>
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label={"Email"}
              placeholder={"jonhdoe@test.com"}
              onChange={e => handleChange(e)}
              name={"email"}
              data-test={"login-email-input"}
            />
            <Form.Input
              label={"Password"}
              placeholder={"Password"}
              onChange={e => handleChange(e)}
              name={"password"}
              data-test={"login-password-input"}
            />
            <Button
              type="submit"
              disabled={false}
              data-test={"login-submit-button"}
            >
              Submit
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Login;
