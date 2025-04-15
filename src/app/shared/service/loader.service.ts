import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public readonly isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();

  public readonly isSending = new BehaviorSubject<boolean>(false);
  public isSending$ = this.isSending.asObservable();

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }

  startSending() {
    this.isSending.next(true);
  }

  stopSending() {
    this.isSending.next(false);
  }
}
