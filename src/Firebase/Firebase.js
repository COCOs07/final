// นำเข้าฟังก์ชันที่จำเป็นจาก Firebase SDKs
import { initializeApp } from "firebase/app"; // ฟังก์ชันสำหรับเริ่มต้นใช้งาน Firebase
import {
    getDatabase, // ฟังก์ชันสำหรับเชื่อมต่อกับ Realtime Database
    ref, // ฟังก์ชันสำหรับสร้าง reference ไปยังตำแหน่งข้อมูลใน database
    onValue, // ฟังก์ชันสำหรับรับข้อมูลจาก database แบบ real-time
    push, // ฟังก์ชันสำหรับเพิ่มข้อมูลใหม่ลงใน database
    set, // ฟังก์ชันสำหรับเขียนข้อมูลลงใน database (จะแทนที่ข้อมูลเดิมถ้ามี)
    update, // ฟังก์ชันสำหรับอัปเดตข้อมูลบางส่วนใน database
    get // ฟังก์ชันสำหรับอ่านข้อมูลจาก database ครั้งเดียว
} from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: เพิ่ม SDKs สำหรับ Firebase products อื่นๆ ที่คุณต้องการใช้งาน
// https://firebase.google.com/docs/web/setup#available-libraries

// ข้อมูลการตั้งค่าสำหรับเชื่อมต่อกับ Firebase project ของคุณ
const firebaseConfig = {
    apiKey: "AIzaSyAlC_ejRyKLI3F6SmO7kSpHYpIWJJPZYyQ", // API key ของ project
    authDomain: "miniproject-7fd15.firebaseapp.com", // Auth domain ของ project
    databaseURL: "https://miniproject-7fd15-default-rtdb.firebaseio.com", // URL ของ Realtime Database
    projectId: "miniproject-7fd15", // ID ของ project
    storageBucket: "miniproject-7fd15.appspot.com", // URL ของ Cloud Storage
    messagingSenderId: "525918768591", // Sender ID สำหรับ Cloud Messaging
    appId: "1:525918768591:web:b20a370018416c72f956ba" // App ID ของ project
};

// เริ่มต้นใช้งาน Firebase ด้วยข้อมูลการตั้งค่า
const app = initializeApp(firebaseConfig);

// เชื่อมต่อกับ Realtime Database
const database = getDatabase(app);

// ส่งออก (export) ตัวแปรและฟังก์ชันที่จำเป็น เพื่อให้สามารถนำไปใช้ในส่วนอื่นๆ ของแอปพลิเคชันได้
export { database, ref, onValue, push, set, update, get };

const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
    prompt: "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);