import React from "react";
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const AddTask = (props) => {
  const [newTask, setNewTask] = React.useState({
    name: "",
    description: "",
    priority: null,
  });

  const handleChange = (key, event) => {
    const value = { ...newTask };
    value[key] = event.target.value;
    setNewTask(value);
  };
  const saveTask = () => {
    props.createTask(newTask);
  };
  const closeAddTask = () => {
    props.showAddTask();
  };
  return (
    <Card>
      <CardContent>
        <TextField
          className="priority"
          label="Приоретет"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange.bind(null, "priority")}
          margin="normal"
        />
        <TextField
          className="name"
          label="Название"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange.bind(null, "name")}
          margin="normal"
        />
        <TextField
          className="description"
          label="Описание"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange.bind(null, "description")}
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          size="small"
          className="saveBtn"
          onClick={saveTask}
        >
          Сохранить
        </Button>
        <Button className="closeBtn" size="small" onClick={closeAddTask}>
          <CloseIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddTask;
