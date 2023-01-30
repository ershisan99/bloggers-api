export default interface ErrorResponse {
  errorsMessages: Array<{ message: string, field?: string }>;
}
