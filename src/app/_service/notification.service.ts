import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { Notification } from '../_models/notification';
import { Feed } from '../_models/feed';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';

@Injectable()
export class NotificationService {
  notifications$: BehaviorSubject<Notification[]> = new BehaviorSubject([]);
  feeds$: BehaviorSubject<Feed[]> = new BehaviorSubject([]);
  public socket: any = null;

  URL: string = environment.apiURL + '/notification';
  feedURL: string = environment.apiURL + '/feed';

  constructor(private http: HttpClient,
              private tokenService: TokenService) {

    //  feeds updated
    this.tokenService.socket.on('all-feeds-reload', (feeds) => {
      this.feeds$.next(feeds);
    });

    this.http.get<Notification[]>(this.URL, TokenService.jwt())
      .subscribe(
        (notifications) => {
          this.notifications$.next(notifications);
        }, (error) => {
          this.tokenService.processError('[Notifications]', error);
        }
      );

    this.http.get<Feed[]>(this.feedURL, TokenService.jwt())
      .subscribe(
        (feeds) => {
          this.feeds$.next(feeds);
        }, (error) => {
          this.tokenService.processError('[Feeds]', error);
        });

    this.tokenService.socket.on('notifications-' + TokenService.hash(), (notifications) => {
      this.notifications$.next(notifications);
    });
  }


  getNotifications(): Observable<Notification[]> {
    return this.notifications$.asObservable();
  }

  updateNotification() {
    this.http.post<Notification[]>(this.URL + '/update-seen', {}, TokenService.jwt()).subscribe((notifications) => {
      this.notifications$.next(notifications);
    }, (err) => {
      this.tokenService.processError('[UpdateNotification]', err);
    });

  }

  getAllFeeds(): Observable<Feed[]> {
    return this.feeds$.asObservable();
  }

}
