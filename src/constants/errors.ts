import { formatError, FormattedError } from './../utils/errorFormatter';

export const ERRORS = {
  NOT_FOUND_PRODUCT: (productId: number): FormattedError =>
    formatError(`Product with ID ${productId} was not found`, 'Not Found', 404),
};
