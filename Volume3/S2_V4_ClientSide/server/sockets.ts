import { SocketEvents } from '../common/events'
import * as Models from '../common/models'

/**
 * Server-side Socket.IO Socket emitter
 */
interface AppServerSocketEmitter extends SocketIO.Socket {
    // "Override" usage of original on and emit to allow whitelisting events
    emit(event: never, ...args: any[]): SocketIO.Socket;
    on(event: never, fn: Function): SocketIO.Socket;

    emit(event: typeof SocketEvents.count, data: { count: number }): SocketIO.Socket;
    emit(event: typeof SocketEvents.all, data: Models.Todo[]): SocketIO.Socket;
    emit(event: typeof SocketEvents.added, data: Models.Todo): SocketIO.Socket;
    emit(event: typeof SocketEvents.edited, data: Models.Todo): SocketIO.Socket;
    emit(event: typeof SocketEvents.deleted, data: Models.DeleteTodoCommand): SocketIO.Socket;
    emit(event: typeof SocketEvents.statuschanged, data: Models.ChangeTodoStatusCommand): SocketIO.Socket;
    emit(event: typeof SocketEvents.allstatuschanged, data: Models.ChangeTodoStatusCommand): SocketIO.Socket;
    broadcast: AppServerSocketEmitter;
}

/**
 * Server-side Socket.IO Socket listener
 */
interface AppServerSocketListener extends SocketIO.Socket {
    
    on(event: typeof SocketEvents.add, fn: (todo: Models.Todo) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.edit, fn: (todo: Models.Todo) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.delete, fn: (cmd: Models.DeleteTodoCommand) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.changestatus, fn: (cmd: Models.ChangeTodoStatusCommand) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.allchangestatus, fn: (cmd: Models.ChangeTodoStatusCommand) => void): SocketIO.Socket;    
    on(event: typeof SocketEvents.disconnect, fn: Function): SocketIO.Socket;
}

/**
 * Server-side Socket.IO Socket emitter & listener
 */
export type AppServerSocket = AppServerSocketEmitter & AppServerSocketListener;