/* global importScripts, firebase */
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAA5aWYtptS4gY574nAYWvfFteUz-lBu8M",
  projectId: "testproject-a012e",
  messagingSenderId: "598988264817",
  appId: "1:598988264817:web:7c71c4ddb9edf75bc4d2d0",
});

firebase.messaging();
