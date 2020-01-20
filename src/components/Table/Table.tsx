import React, { useContext } from "react";
import { Table, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import "./Table.css";
import { ILinks } from "../../models/links";
import { RootStoreContext } from "../../stores/rootStore";

type IProps = {
  /** array of objects of a type ILinks */
  links: ILinks[];
};

const TableContainer = ({ links }: IProps) => {
  const rootStore = useContext(RootStoreContext);
  const { removeLink } = rootStore.linkStore;

  const handleRemoveLink = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const index = Number(e.currentTarget.dataset.index);
    removeLink(index);
  };

  return (
    <Table celled striped>
      <Table.Header data-test={"table"}>
        <Table.Row>
          <Table.HeaderCell colSpan="3">Custom Bookmark</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {links.map((link, index) => (
          <Table.Row key={index}>
            <Table.Cell data-test={"table-row-name"}>{link.name}</Table.Cell>
            <Table.Cell textAlign="left">
              <a href={link.url} target={"_blank"}>
                {link.url}
              </a>
            </Table.Cell>
            <Table.Cell>
              <Icon
                name="window close"
                size="small"
                onClick={handleRemoveLink}
                data-index={index}
                data-test={"icon-x"}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default observer(TableContainer);
