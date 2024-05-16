import React from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { v4 } from "uuid";

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState("");

    const handleInputChange = (e) => {
        if (e.target.value) {
            setTodo(e.target.value);
        } else {
            setTodo("");
        }
    };

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

    useEffect(() => {
        setTodoList(JSON.parse(localStorage.getItem("todoList")) || []);
    }, []);

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
                    >
                        <DoneIcon />
                    </Button>
                </Box>

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
                        {todo.edit ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    sx={{ marginRight: 2 }}
                                    id="editInput"
                                    variant="standard"
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleEditSave(todo.id)}
                                >
                                    <DoneIcon />
                                </Button>
                            </Box>
                        ) : (
                            <Typography>
                                {todo.completed ? (
                                    <s>{todo.task}</s>
                                ) : (
                                    todo.task
                                )}
                            </Typography>
                        )}

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
                                <Button onClick={() => handleEdit(todo.id)}>
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

                {/* Easter egg */}
                {todoList.length === 0 && (
                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 2,
                        }}
                    >
                        TODO: api call
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default TodoList;
