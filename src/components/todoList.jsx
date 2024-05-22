import React from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoke } from "../redux/jokeSlice";

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState("");
    const [joke, setJoke] = useState("");
    const dispatch = useDispatch();
    const jokeData = useSelector((state) => state.joke);

    // value of the main input field
    const handleInputChange = (e) => {
        if (e.target.value) {
            setTodo(e.target.value);
        } else {
            setTodo("");
        }
    };

    // value of the edit input field
    const handleUpdateChange = (id) => {
        return (e) => {
            let tempTodoList = todoList;
            tempTodoList = tempTodoList.map((todo) => {
                if (todo.id === id) {
                    todo.task = e.target.value;
                }
                return todo;
            });
            setTodoList(tempTodoList);
        };
    };

    // store the todo in local storage
    const handleBtnChange = () => {
        let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        todoList.push({
            id: v4(),
            task: todo,
            completed: false,
            edit: false,
        });
        localStorage.setItem("todoList", JSON.stringify(todoList));
        setTodoList(todoList);
        setTodo("");
    };

    // get the todo list from local storage and call the joke API
    useEffect(() => {
        setTodoList(JSON.parse(localStorage.getItem("todoList")) || []);
        dispatch(fetchJoke());
    }, [dispatch]);

    // set the joke in the state
    useEffect(() => {
        setJoke(jokeData.joke.setup + " - " + jokeData.joke.punchline);
    }, [jokeData]);

    const handleDelete = (id) => {
        let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        todoList = todoList.filter((todo) => todo.id !== id);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        setTodoList(todoList);
    };

    const handleComplete = (id) => {
        let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        todoList = todoList.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        localStorage.setItem("todoList", JSON.stringify(todoList));
        setTodoList(todoList);
    };

    const handleEdit = (id) => {
        let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        todoList = todoList.map((todo) => {
            if (todo.id === id) {
                todo.edit = !todo.edit;
            }
            return todo;
        });
        localStorage.setItem("todoList", JSON.stringify(todoList));
        setTodoList(todoList);
    };

    const handleEditSave = (id) => {
        return () => {
            let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
            todoList = todoList.map((todo) => {
                if (todo.id === id) {
                    todo.task = document.getElementById("editInput").value;
                    todo.edit = !todo.edit;
                }
                return todo;
            });
            localStorage.setItem("todoList", JSON.stringify(todoList));
            setTodoList(todoList);
        };
    };

    return (
        <Container
            sx={{
                backgroundColor: "taskbg.500",
                borderRadius: 1,
                p: 3,
                marginTop: 4,
            }}
        >
            <Box>
                {/* create todo */}
                <form>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 4,
                        }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Add Task"
                            variant="outlined"
                            onChange={handleInputChange}
                            value={todo}
                            sx={{ width: "50%", marginRight: 2 }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleBtnChange}
                            disabled={!todo}
                            type="submit"
                        >
                            <DoneIcon />
                        </Button>
                    </Box>
                </form>

                {/* TODO list */}
                {todoList.map((todo) => (
                    <Box
                        key={todo.id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "1px solid",
                            borderColor: "divider.500",
                            overflowWrap: "anywhere",
                            borderRadius: 1,
                            p: 2,
                            mt: 1,
                        }}
                    >
                        {/* updating the todo */}
                        {todo.edit ? (
                            <form>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <TextField
                                        sx={{ marginRight: 2 }}
                                        id="editInput"
                                        onChange={handleUpdateChange(todo.id)}
                                        value={todo.task}
                                        variant="standard"
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={handleEditSave(todo.id)}
                                        type="submit"
                                    >
                                        <DoneIcon />
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <Typography>
                                {todo.completed ? (
                                    <s>{todo.task}</s>
                                ) : (
                                    todo.task
                                )}
                            </Typography>
                        )}

                        {/* action icons */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "text",
                            }}
                        >
                            {todo.edit ? (
                                <Button onClick={() => handleEdit(todo.id)}>
                                    <CloseIcon />
                                </Button>
                            ) : (
                                <Button
                                    sx={{ marginLeft: 2 }}
                                    onClick={() => handleEdit(todo.id)}
                                >
                                    <EditIcon />
                                </Button>
                            )}

                            <Button
                                onClick={() => handleDelete(todo.id)}
                                sx={{
                                    color: "delete.500",
                                }}
                            >
                                <DeleteIcon />
                            </Button>

                            {todo.completed ? (
                                <Button onClick={() => handleComplete(todo.id)}>
                                    <ReplayIcon />
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => handleComplete(todo.id)}
                                    sx={{
                                        color: "done.500",
                                    }}
                                >
                                    <DoneIcon />
                                </Button>
                            )}
                        </Box>
                    </Box>
                ))}

                {/* API data */}
                {todoList.length === 0 && (
                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 2,
                        }}
                    >
                        {joke}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default TodoList;
