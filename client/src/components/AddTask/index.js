import React from "react";
import { TextField, Button } from "@material-ui/core";

function renderTableCell(newTask, handleChange, name, label, required, type) {
  return (
    <TextField
      type={type}
      label={label}
      className={name}
      value={newTask[name]}
      required={required}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handleChange.bind(null, name)}
      margin="normal"
    />
  );
}

const emptyTask = {
  name: "",
  description: "",
  priority: "",
};

export default function AddTask(props) {
  const [newTask, setNewTask] = React.useState({ ...emptyTask });

  const handleChange = (key, event) => {
    if (key === "priority" && event.target.value.length > 1) {
      return;
    }
    const value = { ...newTask };
    value[key] = event.target.value.trim();
    setNewTask(value);
  };

  const saveTask = () => {
    props.createTask(newTask);
    props.closeAddTask();
  };

  return (
    <>
      {renderTableCell(
        newTask,
        handleChange,
        "priority",
        "Приоретет",
        true,
        "number"
      )}
      {renderTableCell(newTask, handleChange, "name", "Название", true)}

      {renderTableCell(newTask, handleChange, "description", "Описание")}
      <Button
        variant="contained"
        color="primary"
        size="small"
        className="saveBtn"
        onClick={saveTask}
        disabled={newTask.name === "" || newTask.priority === ""}
      >
        Сохранить
      </Button>
    </>
  );
}
