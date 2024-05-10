
import { ITodo } from '../models/todo';
import { addTodo, connectDB, deleteTodo, getTodo, getTodos, updateTodo } from '../database/mongo';
import validateInput from '../utils/validation';

const resolvers = {
    Query: {
        todos: async (): Promise<ITodo[]> => {
            await connectDB();
            try {
                const todos = await getTodos();
                return todos;
            } catch (error) {
                console.error('Error fetching todos:', error);
                throw new Error('Error fetching todos');
            }
        },
        todo: async (_: any, { id }: { id: string }): Promise<ITodo | null> => {
            await connectDB();
            try {
                const validationRules = {
                    id: 'required|string'
                };
                await validateInput({id}, validationRules);

                return await getTodo(id);
            } catch (error) {
                console.error('Error fetching todo:', error);
                throw new Error('Error fetching todo');
            }
        },
    },
    Mutation: {
        createTodo: async (_: any, { title, description, completed }: { title: string, description?: string, completed: boolean }): Promise<ITodo> => {
            await connectDB();
            try {
                const validationRules = {
                    title: 'required|string|minLength:3',
                    description: 'string',
                    completed: 'required|boolean',
                };
                const newTodo = { title, description, completed } as ITodo;

                await validateInput(newTodo, validationRules);

                return await addTodo(newTodo);
            } catch (error) {
                console.error('Error creating todo:', error);
                throw error;
            }
        },
        updateTodo: async (_: any, { id, title, description, completed }: { id: string, title?: string, description?: string, completed?: boolean }): Promise<ITodo | null> => {
            await connectDB();
            try {
                const validationRules = {
                    id: 'required|string',
                    title: 'string|minLength:3',
                    description: 'string',
                    completed: 'boolean',
                };
                const updateData = { title, description, completed };
                await validateInput(updateData, validationRules);

                return await updateTodo(id, updateData);
            } catch (error) {
                console.error('Error updating todo:', error);
                throw error;
            }
        },
        deleteTodo: async (_: any, { id }: { id: string }): Promise<string> => {
            await connectDB();
            try {
                const validationRules = {
                    id: 'required|string'
                };
                await validateInput({id}, validationRules);

                return await deleteTodo(id);
            } catch (error) {
                console.error('Error deleting todo:', error);
                throw error;
            }
        },
    },
};

export default resolvers;