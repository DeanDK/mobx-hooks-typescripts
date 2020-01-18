import { observable, computed, action, runInAction, toJS } from "mobx";

import firebase from "./../firebase/firebase";
import { RootStore } from "./rootStore";
import { ILinks } from "../models/links";

export default class LinkStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable links: ILinks[] = [];
  @observable isLinksListenerOpen: boolean = false;

  @computed get getLinks(): ILinks[] {
    return toJS(this.links);
  }

  @action openLinksListener = (): void => {
    const links: any = firebase.linksDatabaseReference();
    links.on("value", (snapshot: firebase.database.DataSnapshot) => {
      runInAction(() => {
        this.links = snapshot.val();
        this.isLinksListenerOpen = true;
      });
    });
  };

  @action addLinks = ({ name, url }: ILinks, index: number) => {
    const linkDbRef = firebase.newLinkDatabaseReference(index);
    linkDbRef.set(
      {
        name,
        url
      },
      function(error) {
        if (error) {
          throw error;
        }
      }
    );
  };
}
