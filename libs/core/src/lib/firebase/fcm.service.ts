import { Injectable } from "@nestjs/common";
import { Notificationfcmdto } from "@socketfcm/common";
import * as firebase from 'firebase-admin';

@Injectable()
export class FcmService {
    async sendPush(notification: Notificationfcmdto) {
        try {
            await firebase
                .messaging()
                .send({
                    notification: {
                        title: notification.title,
                        body: notification.body,
                    },
                    token: notification.deviceId,
                    data: {},
                    android: {
                        priority: 'high',
                        notification: {
                            sound: 'default',
                            channelId: 'default',
                        },
                    },
                    apns: {
                        headers: {
                            'apns-priority': '10',
                        },
                        payload: {
                            aps: {
                                contentAvailable: true,
                                sound: 'default',
                            },
                        },
                    },
                })
                .catch((error: any) => {
                    console.error(error);
                });
        } catch (error) {
            console.log(error);
        }
    }
}