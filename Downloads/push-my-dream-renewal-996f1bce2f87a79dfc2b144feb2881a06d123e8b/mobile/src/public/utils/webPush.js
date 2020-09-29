import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    // return localforage.removeItem("fcm_token");
    return localforage.getItem("fcm_token");
  },

  init: async function () {
    firebase.initializeApp({
      apiKey: "AIzaSyAA5aWYtptS4gY574nAYWvfFteUz-lBu8M",
      projectId: "testproject-a012e",
      messagingSenderId: "598988264817",
      appId: "1:598988264817:web:7c71c4ddb9edf75bc4d2d0",
    });

    try {
      if ((await this.tokenInlocalforage()) !== null) {
        return false;
      }
      const fcmToken = await localforage.getItem("fcm_token");
      console.log("\n\n fcmToken", fcmToken);
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log("\n\n\n token ", token);
      // localforage.setItem("fcm_token", token);
      console.log("fcm_token", token);
    } catch (error) {
      console.error(error);
    }
  },
};

export { firebaseCloudMessaging };
