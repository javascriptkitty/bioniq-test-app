import React from "react";
import axios from "axios";
import MaterialTable from "./components/MaterialTable";
import AddTask from "./components/AddTesk";
import { Container, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./App.scss";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      openAddTask: false,
    };
  }

  deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`).then((res) => {
      const currentTasks = [...this.state.tasks];
      const index = currentTasks.findIndex((el) => el._id === id);
      currentTasks.splice(index, 1);
      this.setState({ tasks: currentTasks });
    });
  };
  createTask = (task) => {
    axios.post(`/api/tasks`, task).then((res) => {
      const currentTasks = [...this.state.tasks];
      currentTasks.push(task);
      this.setState({ tasks: currentTasks });
    });
  };

  showAddTask = () => {
    this.setState({ openAddTask: !this.state.openAddTask });
  };
  componentDidMount() {
    axios.get("/api/tasks").then((res) => {
      this.setState({ tasks: res.data });
    });
  }
  render() {
    return (
      <Container>
        <div className="addTask">
          {this.state.openAddTask ? (
            <AddTask
              createTask={this.createTask}
              showAddTask={this.showAddTask}
            />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={this.showAddTask}
              startIcon={<AddIcon />}
            >
              добавить задание
            </Button>
          )}
        </div>
        <MaterialTable deleteTask={this.deleteTask} tasks={this.state.tasks} />
      </Container>
    );
  }
}
