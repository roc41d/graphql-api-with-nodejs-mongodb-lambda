import mongoose from 'mongoose';
import { ITodo, TodoSchema } from '../models/todo';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || '';

async function connectDB() {
    try {
      await mongoose.connect(uri);
      console.log('MongoDB connected with Mongoose');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

async function getTodos(): Promise<ITodo[]> {
    try {
        const todos = await TodoSchema.find();
        return todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
}

async function getTodo(id: string): Promise<ITodo>{
    try {
        const todo = await TodoSchema.findById(id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        return todo;
    } catch (error) {
        console.error('Error fetching todo:', error);
        throw error;
    }
}

async function addTodo(todo: ITodo): Promise<ITodo> {
    try {
        const newTodo = new TodoSchema(todo);
        await newTodo.save();
        return newTodo;
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
}

async function updateTodo(id: string, updateData: Partial<ITodo>): Promise<ITodo>{
    try {
        const updatedTodo = await TodoSchema.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTodo) {
            throw new Error('Todo not found');
        }
        return updatedTodo;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
}

async function deleteTodo(id: string): Promise<string>{
    try {
        const deletedTodo = await TodoSchema.findByIdAndDelete(id);
        if (!deletedTodo) {
            throw new Error('Todo not found');
        }
        return 'Todo deleted successfully';
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
}

export { connectDB, getTodos, getTodo, addTodo, updateTodo, deleteTodo };
