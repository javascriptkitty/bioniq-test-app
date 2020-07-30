import React from "react";
import axios from "axios";
import MaterialTable from "./components/MaterialTable";
import AddDelete from "./components/AddDelete";
import { Container } from "@material-ui/core";
import PathBuilder from "./components/utils/pathBuilder";
import "./App.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    let url;
    if (value === "lessThan") {
      url = new PathBuilder("/api/tasks")
        .addParam("priority", 5)
        .addParam("op", "lt")
        .build();
    } else if (value === "moreThan") {
      url = new PathBuilder("/api/tasks")
        .addParam("priority", 5)
        .addParam("op", "gt")
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
        console.log(res);
        this.loadTasks();
      })
      .catch((err) => console.log(err));
  };

  createTask = (task) => {
    axios
      .post(`/api/tasks`, task)
      .then((res) => {
        this.setState({
          openAddTask: false,
        });
      })
      .catch((err) => {
        if (err.response.data.name === "MongoError") {
          toast.error(
            `Задание '${err.response.data.keyValue.name}' уже существует`
          );
        }
        console.log(err);
      });
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

  loadTasks = () => {
    axios
      .get("/api/tasks?limit=20")
      .then((res) => {
        this.setState({ tasks: res.data });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.loadTasks();
  }

  render() {
    const filteredData = this.getFilteredData();
    return (
      <Container>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
        />
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
