import React from "react";
import axios from "axios";
import MaterialTable from "./components/MaterialTable";
import AddDelete from "./components/AddDelete";
import { Container } from "@material-ui/core";
import PathBuilder from "./components/utils/pathBuilder";
import "./App.scss";
import io from "socket.io-client";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      search: "",
    };

    this.socket = io();
    this.socket.on("task", (task) => {
      this.setState({ tasks: [task, ...this.state.tasks] });
    });
  }

  deleteTask = (id) => {
    axios
      .delete(`/api/tasks/${id}`)
      .then((res) => {
        const currentTasks = this.state.tasks.filter((task) => task._id !== id);
        this.setState({ tasks: currentTasks });
      })
      .catch((err) => console.log(err));
  };

  deleteSelected = (value) => {
    debugger;
    let url;
    if (value === "lessThan") {
      url = new PathBuilder("/api/tasks")
        .addParam("priority", 5)
        .addParam("op", "gt")
        .build();
    } else if (value === "moreThan") {
      url = new PathBuilder("/api/tasks")
        .addParam("priority", 5)
        .addParam("op", "lt")
        .build();
    } else {
      url = new PathBuilder("/api/tasks")
        .addParam("name", value)
        .addParam("op", "eq")
        .build();
    }

    axios
      .delete(url)
      .then((res) => {
        debugger;
      })
      .catch((err) => console.log(err));
  };

  createTask = (task) => {
    axios
      .post(`/api/tasks`, task)
      .then((res) => {
        this.setState({
          // tasks: [...this.state.tasks, res.data],
          openAddTask: false,
        });
      })
      .catch((err) => console.log(err));
  };

  searchHandler = (search) => {
    this.setState({ search });
  };

  getFilteredData() {
    const { tasks, search } = this.state;

    if (!search) {
      return tasks;
    }

    let result = tasks.filter((el) => {
      return (
        el["name"].toLowerCase().includes(search.toLowerCase()) ||
        el["description"].toLowerCase().includes(search.toLowerCase()) ||
        el["priority"].toString().includes(search.toLowerCase())
      );
    });
    if (!result.length) {
      result = this.state.tasks;
    }
    return result;
  }

  componentDidMount() {
    axios
      .get("/api/tasks?limit=20")
      .then((res) => {
        this.setState({ tasks: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const filteredData = this.getFilteredData();
    return (
      <Container>
        <AddDelete
          createTask={this.createTask}
          deleteSelected={this.deleteSelected}
        />
        <MaterialTable
          deleteTask={this.deleteTask}
          tasks={filteredData}
          searchHandler={this.searchHandler}
        />
      </Container>
    );
  }
}
