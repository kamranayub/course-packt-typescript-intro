/**
 * Server-side Socket.IO Socket emitter
 */
interface AppServerSocketEmitter extends SocketIO.Socket {
    // "Override" usage of original emit to allow whitelisting events
    emit(event: never, ...args: any[]): SocketIO.Socket;
    emit(event: 'count', data: { count: number }): SocketIO.Socket;
    emit(event: 'all', data: Todo[]): SocketIO.Socket;
    emit(event: 'added', data: Todo): SocketIO.Socket;
    emit(event: 'edited', data: Todo): SocketIO.Socket;
    emit(event: 'deleted', data: DeleteTodoCommand): SocketIO.Socket;
    emit(event: 'statuschanged', data: ChangeTodoStatusCommand): SocketIO.Socket;
    emit(event: 'allstatuschanged', data: ChangeTodoStatusCommand): SocketIO.Socket;
    broadcast: AppServerSocketEmitter;
}

/**
 * Server-side Socket.IO Socket listener
 */
interface AppServerSocketListener extends SocketIO.Socket {
    // "Override" usage of original on to allow whitelisting events
    on(event: never, fn: Function): SocketIO.Socket;
    on(event: 'add', fn: (todo: Todo) => void): SocketIO.Socket;
    on(event: 'edit', fn: (todo: Todo) => void): SocketIO.Socket;
    on(event: 'delete', fn: (cmd: DeleteTodoCommand) => void): SocketIO.Socket;
    on(event: 'changestatus', fn: (cmd: ChangeTodoStatusCommand) => void): SocketIO.Socket;
    on(event: 'allchangestatus', fn: (cmd: ChangeTodoStatusCommand) => void): SocketIO.Socket;    
    on(event: 'disconnect', fn: Function): SocketIO.Socket;
}

/**
 * Server-side Socket.IO Socket emitter & listener
 */
type AppServerSocket = AppServerSocketEmitter & AppServerSocketListener;