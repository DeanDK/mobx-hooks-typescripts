import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import LinkStore from "./linkStore";

configure({ enforceActions: "always" });

export class RootStore {
  userStore: UserStore;
  linkStore: LinkStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.linkStore = new LinkStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
