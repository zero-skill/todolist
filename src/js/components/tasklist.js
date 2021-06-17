import React, { useState, useEffect, useRef } from 'react';
import { MdDelete } from 'react-icons/md';
function TaskList() {
    let inputRef = useRef(null);
    const [input, setInput] = useState([]);
    const [todoList, setTodoList] = useState([]);
    const [urlAPI] = "https://assets.breatheco.de/apis/fake/todos/user/a";

    useEffect(() => { getTask(urlAPI) }, []);

    const getTask = (url) => {
        fetch(url)
            .then(response => {return response.json()})
            .then(data => console.log(data))
            .catch(error => console.error(error))
    };

    const getUser = (url) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data.result))
            .catch(error => console.error(error))
    };

    const updateTask = (url, input) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(input),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    };
    const addTask = (event) => {
        event.preventDefault();
        if (event.keyCode === 13 && inputRef.value !== "") {
            setInput(input.concat(inputRef.value));
            let newTodoList = [
                ...todoList,
                {
                    label: event.target.value,
                    done: false
                }
            ];
            setTodoList(newTodoList);
            updateTask(urlAPI, newTodoList);
            inputRef.value = "";
        }
    };
    const removeTask = (index) => {
        todoList.splice(index, 1);
        setTodoList([...todoList]);
        input.splice(index, 1);
        setInput([...input]);
        updateTask(urlAPI, input);
    };

    const removeUser = (url) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
    };
    const removeAll = () => {
        setInput([]);
        setTodoList([]);
        removeUser(urlAPI);
        alert("ToDo list has been removed.");
    };
    /*
        function addTask(event) {
            event.preventDefault();
            let value = todoList.concat(input);
            setTodoList([...value]);
            setInput("");
        }
        function removeTask(index) {
            let list = todoList;
            list.splice(index, 1);
            setTodoList([...list]);
        }
        function itemsRemaining() {
            let aux = "";
            if (todoList.length <= 1) {
                aux = todoList.length + " item left"
            } else {
                aux = todoList.length + " items left"
            }
            return aux;
        }*/
    return (
        <div className="card w-100">
            <div className="card-header">
                <form onSubmit={(event) => addTask(event)}>
                    <input ref={r => inputRef = r}
                        type="text"
                        className="form-control"
                        autoFocus
                        autoCapitalize="True"
                        placeholder="Add a new task here!"
                    />
                </form>
            </div>
            <ul className="list-group list-group-flush">
                {todoList.length > 0 &&
                    todoList.map((task, index) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between" key={index} on>
                                {task}
                                <span className="delete" onClick={(event) => removeTask(index)}>
                                    <MdDelete />
                                </span>
                            </li>
                        );
                    })}
            </ul>
            <div className="card-footer text-muted d-flex justify-content-center">
                {/*itemsRemaining()*/}
            </div>
        </div>
    );
}
export default TaskList;