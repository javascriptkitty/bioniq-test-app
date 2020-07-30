export default function descendingComparator(a, b, orderBy) {
  if (b === undefined || a === undefined) {
    return 0;
  }

  const aParsed = orderBy === "priority" ? parseFloat(a[orderBy]) : a[orderBy];
  const bParsed = orderBy === "priority" ? parseFloat(b[orderBy]) : b[orderBy];
  if (bParsed < aParsed) {
    return -1;
  }
  if (bParsed > aParsed) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
