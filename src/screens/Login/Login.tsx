import React, { useEffect, useReducer, useContext } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import firebase from "../../firebase/firebase";
import { username, email, password } from "../../constants";
import { ILoginCredidentials } from "../../interface/user";
import "./Login.css";
import { RootStoreContext } from "../../stores/rootStore";

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
  }, []);

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
            />
            <Form.Input
              label={"Password"}
              placeholder={"Password"}
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
};

export default Login;
