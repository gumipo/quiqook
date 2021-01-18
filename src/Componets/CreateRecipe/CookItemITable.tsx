import React from "react";
import { MaterialType, FlavorType } from "./type";
import { makeStyles } from "@material-ui/core/styles";
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
  editItem: (
    former: boolean,
    index: number,
    name: string,
    amount: string
  ) => void;
}

const useStyles = makeStyles((theme) => ({
  cell: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      height: 200,
      width: 300,
      outLine: "none",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: 200,
      width: 300,
      outLine: "none",
    },
  },
}));

const CookItemTable: React.FC<PropsType> = ({
  values,
  former,
  deleteItem,
  editItem,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "300px" }} align="left">
              {former ? "材料名" : "調味料名"}
            </TableCell>
            <TableCell style={{ width: "150px" }} align="left">
              分量
            </TableCell>
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
                    onClick={() => editItem(former, i, item.name, item.amount)}
                  >
                    <EditIcon style={{ width: 20, height: 20 }} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => deleteItem(former, i)}>
                    <DeleteIcon style={{ width: 20, height: 20 }} />
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
