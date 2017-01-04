/**
 * Todo model
 */
interface Todo {
    id: string;
    title: string;
    complete: boolean;
}

/**
 * Delete todo command
 */
interface DeleteTodoCommand {
    id: string;
}

/**
 * Available todo statuses that can be set
 */
type TodoStatus = 'complete'|'incomplete';

/**
 * Change todo status command
 */
interface ChangeTodoStatusCommand {
    id?: string;
    status: TodoStatus;
}