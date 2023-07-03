export enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  NotFound = 404,
  Created = 201,
  Unauthorized = 401,
  InternalServerError = 500,
}

export enum HttpStatusMessage {
  Unauthorized = 'Please authenticate yourself.',
}
