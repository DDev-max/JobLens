export class ResponseTypeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ResponseTypeError'
  }
}
