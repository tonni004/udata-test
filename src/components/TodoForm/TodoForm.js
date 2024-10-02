import { useState } from 'react';
import { motion } from "framer-motion"
import { Input, Button } from "@nextui-org/react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import './TodoForm.scss';

export default function TodoForm({ addTodo }) {
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        setDescription(e.target.value);
    }

    const handleReset = () => {
        setDescription('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (description.trim() === '') {
            alert('Please enter a task description.');
            return;
        }

        const newTodo = {
            id: uuidv4(),
            description: description,
            complited: false,
            createdAt: new Date(),
        }

        addTodo(newTodo);
        handleReset();
    }
    return (
        <motion.form
            className="TodoForm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}>
            <Input
                className="FormInput"
                name='description'
                type='text'
                autocomplete="off"
                variant="underlined"
                value={description}
                onChange={handleChange}
                placeholder="Write a new task" />
            <div className='ButtonField'>
                <Button
                    className="SubmitBtn"
                    type='submit'
                    color="success"
                    variant="ghost"
                >Submit</Button>
                <Button
                    className="ResetBtn"
                    type='button'
                    onClick={handleReset}
                    color="default"
                    variant="ghost"
                >Reset</Button>
            </div>
        </motion.form>
    )
}

TodoForm.propTypes = {
    addTodo: PropTypes.func,
}
