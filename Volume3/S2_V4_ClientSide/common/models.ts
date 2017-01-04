/**
 * Todo model
 */
interface Todo {
    _id?: string;
    id?: string;
    title: string;
    complete?: boolean;
}

/**
 * Delete todo command
 */
interface DeleteTodoCommand {
    id: string;
}

const TodoStatusComplete = 'complete';
const TodoStatusIncomplete = 'incomplete';

/**
 * Available todo statuses that can be set
 */
type TodoStatus = typeof TodoStatusComplete | typeof TodoStatusIncomplete;

/**
 * Change todo status command
 */
interface ChangeTodoStatusCommand {
    id?: string;
    status: TodoStatus;
}