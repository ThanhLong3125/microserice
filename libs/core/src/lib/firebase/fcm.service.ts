import { Inject, Injectable } from "@nestjs/common";
import { Notificationfcmdto } from "@socketfcm/common";

@Injectable()
export class FcmService {
    constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: { defaultApp: any }) { }
    async sendPush(notification: Notificationfcmdto) {
        try {
            await this.firebaseAdmin.defaultApp
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