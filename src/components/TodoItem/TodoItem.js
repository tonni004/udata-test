import { Checkbox, Card, CardBody, Button } from '@nextui-org/react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './TodoItem.scss';

export default function TodoItem({ todo, deleteTodo, toggleCompletion }) {
    const formatDate = (date) => {
        const parsedDate = typeof date === 'string' ? new Date(date) : date;
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const year = parsedDate.getFullYear();
        const hours = String(parsedDate.getHours()).padStart(2, '0');
        const minutes = String(parsedDate.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
    return (
        <motion.li
            className="TodoItem"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            exit={{ opacity: 0 }}>
            <Card>
                <CardBody>
                    <p className="ItemData">{formatDate(todo.createdAt)}</p>
                    <Checkbox
                        radius="full"
                        color="success"
                        lineThrough
                        isSelected={todo.completed}
                        onChange={() => toggleCompletion(todo.id)}
                    >{todo.description}</Checkbox>
                    <div className='ButtonField'>
                        <Button
                            className='DeleteBtn'
                            color='danger'
                            size="sm"
                            onClick={() => deleteTodo(todo.id)}>Delete</Button>
                    </div>
                </CardBody>
            </Card>
        </motion.li >
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object,
    deleteTodo: PropTypes.func,
    toggleCompletion: PropTypes.func,
}
