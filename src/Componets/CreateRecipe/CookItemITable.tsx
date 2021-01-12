import React from "react";
import { MaterialType, FlavorType } from "./type";
import styled from "styled-components";
//import Table
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
//icon import
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface PropsType {
  values: MaterialType[] | FlavorType[];
  former: boolean;
  deleteItem: (former: boolean, index: number) => void;
}

const CookItemTable: React.FC<PropsType> = ({ values, former, deleteItem }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">{former ? "材料名" : "調味料名"}</TableCell>
            <TableCell align="left">分量</TableCell>
            <TableCell align="right" />
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {values &&
            values.map((item, i) => (
              <TableRow key={i}>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item.amount}</TableCell>
                <TableCell align="right">
                  <IconButton
                  // onClick={() => editItem(i, item.size, item.quantity)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => deleteItem(former, i)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CookItemTable;
