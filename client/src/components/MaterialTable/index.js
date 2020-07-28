import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { stableSort, getComparator } from "../utils";
const headCells = [
  { id: "_id", label: "" },
  { id: "name", label: "Название" },
  { id: "description", label: "Описание" },
  { id: "priority", numeric: true, label: "Приоретет" },
];
function MaterialTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow variant="head">
        {headCells.map((cell) => (
          <TableCell
            key={cell.id}
            align={cell.numeric ? "center" : "left"}
            sortDirection={orderBy === cell.id ? order : false}
          >
            {cell._id !== "_id" ? (
              <TableSortLabel
                active={orderBy === cell.id}
                direction={orderBy === cell.id ? order : "asc"}
                onClick={createSortHandler(cell.id)}
              >
                {cell.label}
                {orderBy === cell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

MaterialTableHead.propTypes = {
  classes: PropTypes.object.isRequired,

  onRequestSort: PropTypes.func.isRequired,

  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },

  tableWrapper: {
    overflowX: "auto",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function MaterialTable(props) {
  const rows = props.tasks.map((el) => {
    return {
      _id: el._id,
      name: el.name,
      description: el.description,
      priority: el.priority,
    };
  });

  const classes = useStyles();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("perc");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader>
            <MaterialTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice()
                .map((row) => {
                  return (
                    <TableRow key={row._id} hover>
                      <TableCell>
                        <IconButton
                          onClick={props.deleteTask.bind(this, row._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell align="center">{row.priority}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
}
