import { SocketEvents } from '../common/events'
import * as Models from '../common/models'

/**
 * Client-side Socket.IO Socket emitter
 */
export interface AppClientSocket extends SocketIOClient.Socket {

    // "Override" usage of original emit to allow whitelisting events
    emit(event: never, ...args: any[]): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.add, todo: Models.Todo): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.edit, todo: Models.Todo): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.delete, todo: Models.DeleteTodoCommand): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.changestatus, todo: Models.ChangeTodoStatusCommand): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.allchangestatus, todo: Models.ChangeTodoStatusCommand): SocketIOClient.Socket;

    // "Override" usage of original on to allow whitelisting events
    on(event: never, fn: Function): SocketIOClient.Socket;  
    on(event: typeof SocketEvents.count, fn: (data: { count: number }) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.all, fn: (data: Models.Todo[]) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.added, fn: (data: Models.Todo) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.edited, fn: (data: Models.Todo) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.deleted, fn: (data: Models.DeleteTodoCommand) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.statuschanged, fn: (data: Models.ChangeTodoStatusCommand) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.allstatuschanged, fn: (data: Models.ChangeTodoStatusCommand) => void): SocketIOClient.Socket;
}