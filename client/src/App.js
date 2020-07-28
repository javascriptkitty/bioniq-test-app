import React from "react";
import axios from "axios";
import MaterialTable from "./components/MaterialTable";
import { Container } from "@material-ui/core";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
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

  componentDidMount() {
    axios.get("/api/tasks").then((res) => {
      this.setState({ tasks: res.data });
    });
  }
  render() {
    return (
      <Container>
        <MaterialTable deleteTask={this.deleteTask} tasks={this.state.tasks} />
      </Container>
    );
  }
}
