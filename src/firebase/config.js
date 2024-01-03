// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6jB0RUdJu3FUvPJ-8JwSZjOMFK4YwPJU",
  authDomain: "react-firebase-1676c.firebaseapp.com",
  projectId: "react-firebase-1676c",
  storageBucket: "react-firebase-1676c.appspot.com",
  messagingSenderId: "163059477674",
  appId: "1:163059477674:web:65b0a203d684706fa0f4d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadFile(file){
    const storageRef=ref(storage,v4())
    await uploadBytes(storageRef,file)
    const url= await getDownloadURL(storageRef)
    return url
}