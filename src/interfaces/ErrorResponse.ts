export default interface ErrorResponse {
  errorMessages: Array<{ message: string, field?: string }>;
}
