import { Observable } from "rxjs";

export interface NotificationGRPC{
    sendNotification1(payload: string): Observable<any>;
}