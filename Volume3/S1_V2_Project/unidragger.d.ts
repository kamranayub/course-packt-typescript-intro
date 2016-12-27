export as namespace Unidragger;
export = Unidragger;

declare interface MoveVector {
    x: number;
    y: number;
}

declare abstract class Unidragger {
    bindHandles(): void;
    unbindHandles(): void;
    
    pointerDown(event: Event, pointer: Event|Touch): void;
    canPreventDefaultOnPointerDown(event: Event): boolean;

    pointerMove(event: Event, pointer: Event|Touch): void;
    hasDragStarted(moveVector: MoveVector): boolean;

    pointerUp(event: Event, pointer: Event|Touch): void;

    dragStart(event: Event, pointer: Event|Touch): void;
    dragMove(event: Event, pointer: Event|Touch, moveVector: MoveVector): void;
    dragEnd(event: Event, pointer: Event|Touch): void;

    onclick(event: Event): void;
    staticclick(event: Event): void;

    static getPointerPoint(): MoveVector;
}