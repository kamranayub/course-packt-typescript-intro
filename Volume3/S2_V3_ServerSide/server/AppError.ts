/**
 * Augment lib.d.ts ErrorConstructor with our app-specific error properties
 */
interface ErrorConstructor {
    new(message?: string): AppError;
}

interface AppError extends Error {
    status: number;
}