import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  makeStyles,
  TableContainer,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import TableSearch from "../TableSearch";
import { stableSort, getComparator } from "../utils";

export const headCells = [
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
                <strong>{cell.label}</strong>
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

  container: {
    maxHeight: "100vh",
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

function renderTableRow(row, deleteTask) {
  return (
    <TableRow key={row._id} hover>
      <TableCell>
        <IconButton onClick={deleteTask.bind(this, row._id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell align="center">{row.priority}</TableCell>
    </TableRow>
  );
}

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

  const sortedRows = stableSort(rows, getComparator(order, orderBy));

  return (
    <Paper className={classes.root}>
      <TableSearch onSearch={props.searchHandler} />

      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <MaterialTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {sortedRows.map((row) => {
              return renderTableRow(row, props.deleteTask);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
