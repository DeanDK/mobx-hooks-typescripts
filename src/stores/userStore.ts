import { observable, computed, action, runInAction } from "mobx";

import firebase from "./../firebase/firebase";
import { RootStore } from "./rootStore";
import { history } from "./..";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: firebase.auth.UserCredential | null = null;

  @computed get isLoggedIn(): boolean {
    return !!this.user;
  }

  @action register = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      await firebase.register(username, email, password);
      localStorage.setItem("isAccountCreated", "true");
    } catch (error) {
      console.log(error.message);
    }
  };

  @action login = async (
    email: string | any,
    password: string | any
  ): Promise<void> => {
    try {
      const user = await firebase.login(email, password);
      runInAction(() => {
        this.user = user;
      });
      history.push("/home");
    } catch (error) {
      throw error;
    }
  };
}
