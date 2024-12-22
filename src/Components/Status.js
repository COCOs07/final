import React, { useEffect, useState } from 'react';
import Thermometer from 'react-thermometer-ecotropy';
import { database, ref, onValue } from '../Firebase/Firebase'; // ดึงการตั้งค่า Firebase เข้ามา

function Status() {
    const [temperature, setTemperature] = useState(0); // เก็บค่าอุณหภูมิใน state

    useEffect(() => {
        // อ้างอิงไปยังเส้นทางของข้อมูลใน Firebase Realtime Database
        const temperatureRef = ref(database, '/temp'); // กำหนดเส้นทางของข้อมูลใน Firebase

        // ดึงข้อมูลจาก Firebase แบบเรียลไทม์
        onValue(temperatureRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setTemperature(data); // อัปเดต state ด้วยข้อมูลจาก Firebase
            }
        });
    }, []);

    return (
        <div style={{ marginTop: '5rem' }}>
            <Thermometer
                theme="dark"
                value={temperature}  // ใช้ค่าจาก Firebase
                max={100}
                steps={3}
                format="°C"
                size="large"
                height={300}
            />
        </div>
    );
}

export default Status;
