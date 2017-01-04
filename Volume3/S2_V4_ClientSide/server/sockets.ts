/**
 * Server-side Socket.IO Socket emitter
 */
interface AppServerSocketEmitter extends SocketIO.Socket {
    // "Override" usage of original on and emit to allow whitelisting events
    emit(event: never, ...args: any[]): SocketIO.Socket;
    on(event: never, fn: Function): SocketIO.Socket;

    emit(event: typeof SocketEvents.count, data: { count: number }): SocketIO.Socket;
    emit(event: typeof SocketEvents.all, data: Todo[]): SocketIO.Socket;
    emit(event: typeof SocketEvents.added, data: Todo): SocketIO.Socket;
    emit(event: typeof SocketEvents.edited, data: Todo): SocketIO.Socket;
    emit(event: typeof SocketEvents.deleted, data: DeleteTodoCommand): SocketIO.Socket;
    emit(event: typeof SocketEvents.statuschanged, data: ChangeTodoStatusCommand): SocketIO.Socket;
    emit(event: typeof SocketEvents.allstatuschanged, data: ChangeTodoStatusCommand): SocketIO.Socket;
    broadcast: AppServerSocketEmitter;
}

/**
 * Server-side Socket.IO Socket listener
 */
interface AppServerSocketListener extends SocketIO.Socket {
    
    on(event: typeof SocketEvents.add, fn: (todo: Todo) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.edit, fn: (todo: Todo) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.delete, fn: (cmd: DeleteTodoCommand) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.changestatus, fn: (cmd: ChangeTodoStatusCommand) => void): SocketIO.Socket;
    on(event: typeof SocketEvents.allchangestatus, fn: (cmd: ChangeTodoStatusCommand) => void): SocketIO.Socket;    
    on(event: typeof SocketEvents.disconnect, fn: Function): SocketIO.Socket;
}

/**
 * Server-side Socket.IO Socket emitter & listener
 */
export type AppServerSocket = AppServerSocketEmitter & AppServerSocketListener;