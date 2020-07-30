import React from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteTask from "../DeleteTask";
import AddTask from "../AddTask";

export default function AddDelete(props) {
  const [showAdd, setShowAdd] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);

  const closeAddTask = () => {
    setShowAdd(false);
    setShowDelete(false);
  };

  return (
    <div className="addDeleteTask">
      {showAdd || showDelete ? (
        <Card>
          <CardContent>
            {showAdd ? (
              <AddTask
                createTask={props.createTask}
                closeAddTask={closeAddTask}
              />
            ) : (
              <DeleteTask
                deleteSelected={props.deleteSelected}
                closeAddTask={closeAddTask}
              />
            )}
            <Button className="closeBtn" size="small" onClick={closeAddTask}>
              <CloseIcon />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={setShowAdd}
            startIcon={<AddIcon />}
          >
            добавить задание
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={setShowDelete}
            startIcon={<ExpandMoreIcon />}
          >
            очистить
          </Button>
        </>
      )}
    </div>
  );
}
