import { useState, useEffect } from 'react';
import { Tabs, Tab } from "@nextui-org/react";
import { ListTemplate } from '../ListTemplate/ListTemplate';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './TodoList.scss';

export default function TodoList({ todos, deleteTodo, toggleCompletion }) {
    const [sortedTodos, setSortedTodos] = useState(todos);

    const sortTodosByDate = (todos, order = 'old') => {
        return todos.slice().sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return order === 'old' ? dateA - dateB : dateB - dateA;
        });
    };

    const handleSort = (order) => {
        setSortedTodos(sortTodosByDate(todos, order));
    };

    useEffect(() => {
        setSortedTodos(todos);
    }, [todos]);

    return (
        <motion.div
            className="TabsField"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <Tabs aria-label="Lists" className="TabsLists" placement='top'>
                <Tab key="allTasks" title="All">
                    <ListTemplate
                        todos={sortedTodos}
                        filterType="all"
                        message={`Oops! You don't have any todos`}
                        deleteTodo={deleteTodo}
                        onSort={handleSort}
                        toggleCompletion={toggleCompletion}
                    />
                </Tab>
                <Tab key="completedTasks" title="Completed">
                    <ListTemplate
                        todos={sortedTodos}
                        filterType="completed"
                        message={`No completed tasks. Time to check some todos from your list!`}
                        deleteTodo={deleteTodo}
                        onSort={handleSort}
                        toggleCompletion={toggleCompletion}
                    />
                </Tab>
                <Tab key="incompleteTasks" title="Incomplete">
                    <ListTemplate
                        todos={sortedTodos}
                        filterType="incomplete"
                        message={`Woow! You don't have any incomplete tasks. Good job!`}
                        deleteTodo={deleteTodo}
                        onSort={handleSort}
                        toggleCompletion={toggleCompletion}
                    />
                </Tab>
            </Tabs>
        </motion.div>
    );
}

TodoList.propTypes = {
    todos: PropTypes.array,
    deleteTodo: PropTypes.func,
    toggleCompletion: PropTypes.func,
}
