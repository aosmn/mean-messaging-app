import { EventEmitter } from '@angular/core';

import { Error } from "./error.model.ts";
export class ErrorService {
  errorOccurred = new EventEmitter<Error>();

  handleError(error: any){
    const errorData = new Error(error.title, error.error.message);
    console.log(error.error.message)
    console.log(error.title)
    this.errorOccurred.emit(errorData);
  }
}
