import { observable, computed, action, runInAction } from "mobx";

import firebase from "./../firebase/firebase";
import { RootStore } from "./rootStore";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: firebase.User | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await firebase.register(username, email, password);
      localStorage.setItem("isAccountCreated", "true");
    } catch (error) {
      console.log(error.message);
    }
  };

  @action login = (email: string | any, password: string | any) => {
    firebase.login(email, password).then(data => (this.user = data.user));
  };
}
