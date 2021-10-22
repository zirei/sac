import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }
  makeNamePopup(data: any): string {
    return `` +
      `<div> ${ data }</div>`
  }
}
