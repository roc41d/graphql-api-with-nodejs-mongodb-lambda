import { ITodo } from '../models/todo';
import { addTodo, connectDB, deleteTodo, getTodo, getTodos, updateTodo } from '../database/mongo';
import validateInput from '../utils/validation';
import resolvers from '../graphql/resolvers';

const mockTodos: ITodo[] = [
    { id: '1', title: 'Todo 1', description: 'Description 1', completed: false },
    { id: '2', title: 'Todo 2', description: 'Description 2', completed: true },
] as ITodo[];

jest.mock('../utils/validation', () => jest.fn());

jest.mock('../database/mongo', () => ({
    connectDB: jest.fn(),
    getTodos: jest.fn(() => Promise.resolve(mockTodos)),
    getTodo: jest.fn((id: string) => Promise.resolve(mockTodos.find(todo => todo.id === id) || null)),
    addTodo: jest.fn((todo: ITodo) => Promise.resolve(todo)),
    updateTodo: jest.fn((id: string, updateData: Partial<ITodo>) => Promise.resolve(null)),
    deleteTodo: jest.fn((id: string) => Promise.resolve('Todo deleted')),
}));

describe('resolvers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Query', () => {
        describe('todos', () => {
            it('should return all todos', async () => {
                const result = await resolvers.Query.todos();
                expect(connectDB).toHaveBeenCalled();
                expect(getTodos).toHaveBeenCalled();
                expect(result).toEqual(mockTodos);
            });

            it('should throw an error if fetching todos fails', async () => {
                (getTodos as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch todos'));
                await expect(resolvers.Query.todos()).rejects.toThrow('Error fetching todos');
            });
        });

        describe('todo', () => {
            it('should return a todo by id', async () => {
                const id = '1';
                const result = await resolvers.Query.todo(null, { id });
                expect(connectDB).toHaveBeenCalled();
                expect(validateInput).toHaveBeenCalledWith({ id }, { id: 'required|string' });
                expect(getTodo).toHaveBeenCalledWith(id);
                expect(result).toEqual(mockTodos.find(todo => todo.id === id) || null);
            });

            it('should throw an error if fetching todo fails', async () => {
                const id = '1';
                (getTodo as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch todo'));
                await expect(resolvers.Query.todo(null, { id })).rejects.toThrow('Error fetching todo');
            });

            it('should throw an error if id is missing or invalid', async () => {
                const id = 'invalid-id';
                (validateInput as jest.Mock).mockRejectedValueOnce(new Error('Invalid id'));
                await expect(resolvers.Query.todo(null, { id })).rejects.toThrow('Error fetching todo');
            });
        });
    });

    describe('Mutation', () => {
        describe('createTodo', () => {
            it('should create a new todo', async () => {
                const todo = { title: 'New Todo', description: 'New Description', completed: false };
                const result = await resolvers.Mutation.createTodo(null, todo);
                expect(connectDB).toHaveBeenCalled();
                expect(validateInput).toHaveBeenCalledWith(todo, {
                    title: 'required|string|minLength:3',
                    description: 'string',
                    completed: 'required|boolean',
                });
                expect(addTodo).toHaveBeenCalledWith(todo);
                expect(result).toEqual(todo);
            });

            it('should throw an error if creating todo fails', async () => {
                const todo = { title: 'New Todo', description: 'New Description', completed: false };
                (addTodo as jest.Mock).mockRejectedValueOnce(new Error('Failed to create todo'));
                await expect(resolvers.Mutation.createTodo(null, todo)).rejects.toThrow('Failed to create todo');
            });

            it('should throw an error if input validation fails', async () => {
                const todo = { title: 'New Todo', description: 'New Description', completed: false };
                (validateInput as jest.Mock).mockRejectedValueOnce(new Error('Invalid input'));
                await expect(resolvers.Mutation.createTodo(null, todo)).rejects.toThrow('Invalid input');
            });
        });

        describe('updateTodo', () => {
            it('should update a todo by id', async () => {
                const id = '1';
                const updateData = { title: 'Updated Todo', description: 'Updated Description', completed: true };
                const result = await resolvers.Mutation.updateTodo(null, { id, ...updateData });
                expect(connectDB).toHaveBeenCalled();
                expect(validateInput).toHaveBeenCalledWith(updateData, {
                    id: 'required|string',
                    title: 'string|minLength:3',
                    description: 'string',
                    completed: 'boolean',
                });
                expect(updateTodo).toHaveBeenCalledWith(id, updateData);
                expect(result).toEqual(null);
            });

            it('should throw an error if updating todo fails', async () => {
                const id = '1';
                const updateData = { title: 'Updated Todo', description: 'Updated Description', completed: true };
                (updateTodo as jest.Mock).mockRejectedValueOnce(new Error('Failed to update todo'));
                await expect(resolvers.Mutation.updateTodo(null, { id, ...updateData })).rejects.toThrow('Failed to update todo');
            });

            it('should throw an error if input validation fails', async () => {
                const id = '1';
                const updateData = { title: 'Updated Todo', description: 'Updated Description', completed: true };
                (validateInput as jest.Mock).mockRejectedValueOnce(new Error('Invalid input'));
                await expect(resolvers.Mutation.updateTodo(null, { id, ...updateData })).rejects.toThrow('Invalid input');
            });
        });

        describe('deleteTodo', () => {
            it('should delete a todo by id', async () => {
                const id = '1';
                const result = await resolvers.Mutation.deleteTodo(null, { id });
                expect(connectDB).toHaveBeenCalled();
                expect(validateInput).toHaveBeenCalledWith({ id }, { id: 'required|string' });
                expect(deleteTodo).toHaveBeenCalledWith(id);
                expect(result).toEqual('Todo deleted');
            });

            it('should throw an error if deleting todo fails', async () => {
                const id = '1';
                (deleteTodo as jest.Mock).mockRejectedValueOnce(new Error('Failed to delete todo'));
                await expect(resolvers.Mutation.deleteTodo(null, { id })).rejects.toThrow('Failed to delete todo');
            });

            it('should throw an error if id is missing or invalid', async () => {
                const id = 'invalid-id';
                (validateInput as jest.Mock).mockRejectedValueOnce(new Error('Invalid id'));
                await expect(resolvers.Mutation.deleteTodo(null, { id })).rejects.toThrow('Invalid id');
            });
        });
    });
});
