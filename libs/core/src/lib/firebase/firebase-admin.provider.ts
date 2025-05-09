import * as admin from 'firebase-admin';
export const firebaseAdminProvider = {
  provide: 'FIREBASE_ADMIN',
  useFactory: () => {
    const defaultApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env['project_id'],
        clientEmail: process.env['client_email'],
        privateKey: process.env['private_key']?.replace(/\\n/g, '\n'),
      }),
    });
    return { defaultApp };
  },
};