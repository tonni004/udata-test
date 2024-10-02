import { ScrollShadow } from "@nextui-org/react";
import TodoItem from '../TodoItem';
import { SortButton } from "../SortButton/SortButton";
import PropTypes from "prop-types";
import './ListTemplate.scss';

export const ListTemplate = ({ todos, filterType, message, deleteTodo, onSort, toggleCompletion }) => {
    const filteredTodos = todos.filter((todo) => {
        switch (filterType) {
            case 'completed':
                return todo.completed;
            case 'incomplete':
                return !todo.completed;
            default:
                return true;
        }
    });

    return (
        <>
            {filteredTodos.length > 0 ? (
                <div className='TodoListField'>
                    <ScrollShadow size={60} className="TodoList">
                        <ul>
                            {filteredTodos.map((todo) => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    deleteTodo={deleteTodo}
                                    toggleCompletion={toggleCompletion}
                                />
                            ))}
                        </ul>
                    </ScrollShadow>
                    <SortButton onSort={onSort} />
                </div>
            ) : (
                <p className="TodoDescriptionText">{message}</p>
            )}
        </>
    )
};

ListTemplate.propTypes = {
    todos: PropTypes.array,
    filterType: PropTypes.string,
    message: PropTypes.string,
    deleteTodo: PropTypes.func,
    onSort: PropTypes.func,
    toggleCompletion: PropTypes.func,
}
