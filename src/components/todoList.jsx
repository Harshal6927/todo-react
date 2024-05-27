import React from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoke } from "../redux/jokeSlice";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

const getTodoList = () => {
    return JSON.parse(localStorage.getItem("todoList")) || [];
};

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState("");
    const [joke, setJoke] = useState("");
    const [error, setError] = useState(false);
    const [editFlag, setEditFlag] = useState(false);
    const [toggleSnackbar, setToggleSnackbar] = useState(false);
    const [toggleModal, setToggleModal] = useState(false);
    const [deleteTodoId, setDeleteTodoId] = useState(null);
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

            if (!e.target.value) {
                setError(true);
                return;
            } else {
                setError(false);
            }
        };
    };

    // store the todo in local storage
    const handleBtnChange = () => {
        let todoList = getTodoList();
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

    // search the todo list
    const handleSearchChange = (e) => {
        let todoList = getTodoList();
        todoList = todoList.filter((todo) =>
            todo.task.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setTodoList(todoList);
    };

    // get the todo list from local storage and call the joke API
    useEffect(() => {
        setTodoList(getTodoList());
        dispatch(fetchJoke());
    }, [dispatch]);

    // set the joke in the state
    useEffect(() => {
        setJoke(jokeData.joke.setup + " - " + jokeData.joke.punchline);
    }, [jokeData]);

    const handleDelete = (id) => {
        let todoList = getTodoList();
        todoList = todoList.filter((todo) => todo.id !== id);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        document.getElementById("search").value = "";
        setTodoList(todoList);
    };

    const handleComplete = (id) => {
        let todoList = getTodoList();
        todoList = todoList.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        localStorage.setItem("todoList", JSON.stringify(todoList));
        document.getElementById("search").value = "";
        setTodoList(todoList);
    };

    // allow only one edit at a time
    const handleEdit = (id) => {
        if (editFlag) {
            setToggleSnackbar(true);
            return;
        }

        let todoList = getTodoList();
        todoList = todoList.map((todo) => {
            if (todo.id === id) {
                todo.edit = !todo.edit;
            }
            return todo;
        });
        localStorage.setItem("todoList", JSON.stringify(todoList));
        document.getElementById("search").value = "";
        setTodoList(todoList);
        setEditFlag(true);
    };

    const handleCancelEdit = (id) => {
        let todoList = getTodoList();
        todoList = todoList.map((todo) => {
            if (todo.id === id) {
                todo.edit = !todo.edit;
            }
            return todo;
        });
        localStorage.setItem("todoList", JSON.stringify(todoList));
        document.getElementById("search").value = "";
        setTodoList(todoList);
        setEditFlag(false);
        setError(false);
    };

    const handleEditSave = (id) => {
        return () => {
            let todoList = getTodoList();
            todoList = todoList.map((todo) => {
                if (todo.id === id) {
                    todo.task = document.getElementById("editInput").value;
                    todo.edit = !todo.edit;
                }
                return todo;
            });
            localStorage.setItem("todoList", JSON.stringify(todoList));
            document.getElementById("search").value = "";
            setTodoList(todoList);
            setEditFlag(false);
        };
    };

    const handleModalOpen = (id) => {
        setDeleteTodoId(id);
        setToggleModal(true);
    };

    const handleModalClose = () => {
        setDeleteTodoId(null);
        setToggleModal(false);
    };

    return (
        <>
            {error && <Alert severity="error">TODOs cannot be empty!</Alert>}
            <Snackbar
                open={toggleSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={() => setToggleSnackbar(false)}
            >
                <Alert severity="warning">
                    You can only edit one TODO at a time!
                </Alert>
            </Snackbar>

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
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "60% 40%",
                        }}
                    >
                        <form>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Add Task"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    value={todo}
                                    sx={{ width: "100%", paddingRight: 1 }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleBtnChange}
                                    disabled={!todo}
                                    type="submit"
                                    sx={{ marginRight: 5 }}
                                >
                                    <DoneIcon />
                                </Button>
                            </Box>
                        </form>
                        <TextField
                            id="search"
                            label="Search"
                            variant="outlined"
                            onChange={handleSearchChange}
                        />
                    </Box>

                    {/* horizontal line */}
                    <Box
                        sx={{
                            borderBottom: "1px solid",
                            borderColor: "divider.500",
                            mt: 3,
                            mb: 3,
                        }}
                    ></Box>

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
                                ":hover": { borderColor: "active.500" },
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
                                            onChange={handleUpdateChange(
                                                todo.id
                                            )}
                                            value={todo.task}
                                            variant="standard"
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handleEditSave(todo.id)}
                                            type="submit"
                                            disabled={error}
                                        >
                                            <DoneIcon />
                                        </Button>
                                    </Box>
                                </form>
                            ) : todo.completed ? (
                                <Typography
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "#9e9e9e",
                                    }}
                                >
                                    {todo.task}
                                </Typography>
                            ) : (
                                <Typography>{todo.task}</Typography>
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
                                    <Button
                                        onClick={() =>
                                            handleCancelEdit(todo.id)
                                        }
                                    >
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
                                    onClick={() => handleModalOpen(todo.id)}
                                    sx={{
                                        color: "delete.500",
                                    }}
                                >
                                    <DeleteIcon />
                                </Button>

                                {todo.completed ? (
                                    <Button
                                        onClick={() => handleComplete(todo.id)}
                                    >
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

                    {/* modal for delete confirmation */}
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={toggleModal}
                        onClose={handleModalClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={toggleModal}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: 400,
                                    bgcolor: "background.paper",
                                    border: "2px solid background.paper",
                                    borderRadius: 2,
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <Typography
                                    id="transition-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    You want to delete this TODO?
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        marginTop: 2,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Button
                                        sx={{ backgroundColor: "done.500" }}
                                        onClick={handleModalClose}
                                    >
                                        No
                                    </Button>
                                    <Button
                                        sx={{
                                            marginLeft: 2,
                                            backgroundColor: "delete.500",
                                        }}
                                        onClick={() => {
                                            handleDelete(deleteTodoId);
                                            handleModalClose();
                                        }}
                                    >
                                        Yes
                                    </Button>
                                </Box>
                            </Box>
                        </Fade>
                    </Modal>

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
        </>
    );
};

export default TodoList;
