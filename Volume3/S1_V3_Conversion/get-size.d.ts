interface Size {
    borderLeftWidth: number;
    borderRightWidth: number;
    borderTopWidth: number;
    borderBottomWidth: number;
    width: number;
    height: number;
}

declare interface getSize {
    (element: Node): Size;
}