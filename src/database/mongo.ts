import mongoose from 'mongoose';
import { ITodo, TodoSchema } from '../models/todo';

const uri = process.env.MONGO_URI ?? '';

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected with Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function getTodos() {
  const todos = await TodoSchema.find();
  return todos;
}

async function addTodo(todo: ITodo) {
  const newTodo = new TodoSchema(todo);
  await newTodo.save();
  return newTodo;
}

async function updateTodo(id: string, updateData: Partial<ITodo>) {
  const updatedTodo = await TodoSchema.findByIdAndUpdate(id, updateData);
  if (!updatedTodo) {
    throw new Error('Todo not found');
  }
  return updatedTodo;
}

async function deleteTodo(id: string) {
  const deletedTodo = await TodoSchema.findByIdAndDelete(id);
  if (!deletedTodo) {
    throw new Error('Todo not found');
  }
  return 'Todo deleted successfully';
}

export { connectDB, getTodos, addTodo, updateTodo, deleteTodo };