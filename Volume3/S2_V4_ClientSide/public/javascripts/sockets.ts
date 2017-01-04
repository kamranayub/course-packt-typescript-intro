/// <reference path="../../common/events.ts" />

/**
 * Client-side Socket.IO Socket emitter
 */
interface AppClientSocket extends SocketIOClient.Socket {

    // "Override" usage of original emit to allow whitelisting events
    emit(event: never, ...args: any[]): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.add, todo: Todo): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.edit, todo: Todo): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.delete, todo: DeleteTodoCommand): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.changestatus, todo: ChangeTodoStatusCommand): SocketIOClient.Socket;
    emit(event: typeof SocketEvents.allchangestatus, todo: ChangeTodoStatusCommand): SocketIOClient.Socket;

    // "Override" usage of original on to allow whitelisting events
    on(event: never, fn: Function): SocketIOClient.Socket;  
    on(event: typeof SocketEvents.count, fn: (data: { count: number }) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.all, fn: (data: Todo[]) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.added, fn: (data: Todo) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.edited, fn: (data: Todo) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.deleted, fn: (data: DeleteTodoCommand) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.statuschanged, fn: (data: ChangeTodoStatusCommand) => void): SocketIOClient.Socket;
    on(event: typeof SocketEvents.allstatuschanged, fn: (data: ChangeTodoStatusCommand) => void): SocketIOClient.Socket;
}