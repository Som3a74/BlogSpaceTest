export type ServiceResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    error?: string | object;
    status: number;
};

export class ResponseHelper {
    /**
     * Return a standardized success response
     */
    static success<T>(data: T, message: string = 'Success', status: number = 200): ServiceResponse<T> {
        return {
            success: true,
            data,
            message,
            status
        };
    }

    /**
     * Return a standardized error response
     * @param error - The error object or string
     * @param message - User facing message
     * @param status - HTTP status code
     * @param data - Optional fallback data (e.g. [] for lists)
     */
    static error<T = null>(
        error: unknown,
        message: string = 'Internal Server Error',
        status: number = 500,
        data: T | null = null
    ): ServiceResponse<T | null> {
        let errorMessage: string | object = 'Unknown Error';

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        } else if (typeof error === 'object' && error !== null) {
            errorMessage = error;
        }

        return {
            success: false,
            message,
            error: errorMessage,
            data: data,
            status
        };
    }
}
