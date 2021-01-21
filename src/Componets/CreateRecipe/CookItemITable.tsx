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
  table: {
    [theme.breakpoints.down("sm")]: {
      width: 350,
    },
  },
  cell: {
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
    [theme.breakpoints.up("sm")]: {
      width: 300,
    },
  },
  mincell: {
    [theme.breakpoints.down("sm")]: {
      width: 150,
      height: 30,
    },
    [theme.breakpoints.up("sm")]: {
      width: 150,
    },
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      width: 18,
    },
    [theme.breakpoints.up("sm")]: {
      width: 20,
    },
  },
  iconbutton: {
    [theme.breakpoints.down("sm")]: {
      width: 18,
      height: 18,
    },
  },
}));

const CookItemTable: React.FC<PropsType> = ({
  values,
  former,
  deleteItem,
  editItem,
}) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell} align="left">
              {former ? "材料名" : "調味料名"}
            </TableCell>
            <TableCell className={classes.mincell} align="left">
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
                    className={classes.iconbutton}
                    onClick={() => editItem(former, i, item.name, item.amount)}
                  >
                    <EditIcon className={classes.icon} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    className={classes.iconbutton}
                    onClick={() => deleteItem(former, i)}
                  >
                    <DeleteIcon className={classes.icon} />
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
