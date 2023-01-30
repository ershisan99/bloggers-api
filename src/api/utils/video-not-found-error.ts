export function videoNotFoundError(id: string) {
  return new Error(`Video with id ${id} not found`)
}
