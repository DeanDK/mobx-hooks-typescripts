import React, { useEffect, useContext, useReducer } from "react";

import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import TableContainer from "../../components/Table/Table";
import LoaderAnimation from "../../components/Loader/Loader";
import SearchField from "../../components/SearchField/SearchField";
import ButtonField from "../../components/ButtonField/ButtonField";
import { ILinks } from "../../models/links";

const Home: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const [userInput, setUserInput] = useReducer(
    (state: ILinks, newState: ILinks) => ({
      ...state,
      ...newState
    }),
    {
      name: "",
      url: ""
    }
  );

  const { name, url } = userInput;
  const {
    getLinks,
    isLinksListenerOpen,
    openLinksListener,
    addLinks
  } = rootStore.linkStore;

  const links = getLinks;

  useEffect(() => {
    openLinksListener();
  }, [openLinksListener]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const newValue = e.target.value;
    setUserInput({ [name]: newValue } as ILinks);
  };

  const handleSubmit = (): void => {
    const newLinkIndex = links.length;
    addLinks({ name, url }, newLinkIndex);
  };

  const renderTable = () => {
    if (isLinksListenerOpen) {
      return (
        <Grid
          stackable
          verticalAlign={"middle"}
          columns={3}
          centered
          data-test={"home-screen"}
        >
          <Grid.Row>
            <Grid.Column>
              <SearchField
                label={"NAME"}
                placeholder={"enter the site name"}
                name={"name"}
                handleChange={handleChange}
                dataTest={"home-name-input"}
              />
              <SearchField
                label={"LINK"}
                placeholder={"c/p website url"}
                name={"url"}
                handleChange={handleChange}
                dataTest={"home-link-input"}
              />
              <ButtonField handleSubmit={handleSubmit} />
              <TableContainer links={links} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      return <LoaderAnimation />;
    }
  };

  return renderTable();
};

export default observer(Home);
