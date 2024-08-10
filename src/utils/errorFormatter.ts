export type FormattedError = {
  message: string;
  error: string;
  statusCode: number;
};

export function formatError(
  message: string,
  error: string,
  statusCode: number
) {
  return {
    message,
    error,
    statusCode,
  };
}
