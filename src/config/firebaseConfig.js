import admin from "firebase-admin";
import { env } from "~/config/environments";
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(env.FIREBASE_CREDENTIALS)),
});

export default admin;
