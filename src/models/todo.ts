import mongoose from 'mongoose';

export interface ITodo extends Document {
    id: string,
    title: string;
    description?: string;
    completed: boolean;
}

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
});

export const TodoSchema = mongoose.model<ITodo>('Todo', todoSchema);