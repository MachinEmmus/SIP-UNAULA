import React, { Component } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import ListTodo from '../components/ListTodo';

class MainPage extends Component {
    state = {
        todos: [],
    };

    componentDidMount() {
        this.getTodos();
    }

    getTodos = () => {
        axios
            .get('https://sipunaula.herokuapp.com/api/todos')
            .then((res) => {
                if (res.data) {
                    this.setState({
                        todos: res.data,
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    deleteTodo = (id) => {
        axios
            .delete(`https://sipunaula.herokuapp.com/api/todos${id}`)
            .then((res) => {
                if (res.data) {
                    this.getTodos();
                }
            })
            .catch((err) => console.log(err));
    };

    render() {
        let { todos } = this.state;

        return (
            <div>
                <h1>My Todo(s)</h1>
                <Input getTodos={this.getTodos} />
                <ListTodo todos={todos} deleteTodo={this.deleteTodo} />
            </div>
        );
    }
}

export default MainPage;