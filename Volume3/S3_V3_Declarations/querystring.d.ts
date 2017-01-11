
interface QuerystringStatic {
    encode(qa: { [key: string]: string }, sep?: string, eq?: string): string;
    encode(qa: string | number | boolean, sep: string | null, eq: string | null, name: string): string;
    stringify(qa: { [key: string]: string }, sep?: string, eq?: string): string;
    stringify(qa: string | number | boolean, sep: string | null, eq: string | null, name: string): string;

    decode(qs: string, sep?: string, eq?: string, options?: DecodeOptions): { [key: string]: string };
    parse(qs: string, sep?: string, eq?: string, options?: DecodeOptions): { [key: string]: string };
}

interface DecodeOptions {
    maxKeys: number;
}

declare module 'querystring' {
    var querystring: QuerystringStatic;
    export = querystring;
}