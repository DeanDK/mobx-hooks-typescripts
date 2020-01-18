import React from "react";
import { Table } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import "./Table.css";
import { ILinks } from "../../models/links";

type IProps = {
  /** array of objects of a type ILinks */
  links: ILinks[];
};

const TableContainer = ({ links }: IProps) => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan="3">Custom Bookmark</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {links.map((link, index) => (
        <Table.Row key={index}>
          <Table.Cell>{link.name}</Table.Cell>
          <Table.Cell textAlign="left">
            <a href={link.url} target={"_blank"}>
              {link.url}
            </a>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default observer(TableContainer);
