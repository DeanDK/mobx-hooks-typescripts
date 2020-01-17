import React, { useEffect, useContext } from "react";

import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";
import { Table, Grid } from "semantic-ui-react";
import TableContainer from "../../components/Table/Table";

const Home: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const links = rootStore.linkStore.getLinks;

  useEffect(() => {
    rootStore.linkStore.openLinksListener();
  }, [rootStore.linkStore]);

  return (
    <Grid verticalAlign={"middle"} columns={2} centered>
      <Grid.Row>
        <Grid.Column>
          <TableContainer links={links} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(Home);
