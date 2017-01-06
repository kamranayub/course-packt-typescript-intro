import * as SocketEvents from '../common/events'
import * as Models from '../common/models'

/**
 * Server-side Socket.IO Socket emitter
 */
interface AppServerSocketEmitter extends SocketIO.Socket {
    // "Override" usage of original on and emit to allow whitelisting events
    emit(event: never, ...args: any[]): SocketIO.Socket;
    on(event: never, fn: Function): SocketIO.Socket;

    emit(event: typeof SocketEvents.COUNT, data: { count: number }): SocketIO.Socket;
    emit(event: typeof SocketEvents.ALL, data: Models.Todo[]): SocketIO.Socket;
    emit(event: typeof SocketEvents.ADDED, data: Models.Todo): SocketIO.Socket;
    emit(event: typeof SocketEvents.EDITED, data: Models.Todo): SocketIO.Socket;
    emit(event: typeof SocketEvents.DELETED, data: Models.DeleteTodoCommand): SocketIO.Socket;
    emit(event: typeof SocketEvents.STATUSCHANGED, data: Models.ChangeTodoStatusCommand): SocketIO.Socket;
    emit(event: typeof SocketEvents.ALLSTATUSCHANGED, data: Models.ChangeTodoStatusCommand): SocketIO.Socket;
    broadcast: this;
}

/**
 * Server-side Socket.IO Socket listener
 */
interface AppServerSocketListener extends SocketIO.Socket {
    // "Override" usage of original on and emit to allow whitelisting events
    emit(event: never, ...args: any[]): SocketIO.Socket;
    on(event: never, fn: Function): SocketIO.Socket;

    on(event: typeof SocketEvents.ADD, fn: (todo: Models.Todo) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.EDIT, fn: (todo: Models.Todo) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.DELETE, fn: (cmd: Models.DeleteTodoCommand) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.CHANGESTATUS, fn: (cmd: Models.ChangeTodoStatusCommand) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.ALLCHANGESTATUS, fn: (cmd: Models.ChangeTodoStatusCommand) => void): SocketIO.Socket;    
    on(event: typeof SocketEvents.DISCONNECT, fn: Function): SocketIO.Socket;

    broadcast: AppServerSocketEmitter;
}

/**
 * Server-side Socket.IO Socket emitter & listener
 */
export type AppServerSocket = AppServerSocketEmitter & AppServerSocketListener;