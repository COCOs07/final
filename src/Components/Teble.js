import Table from 'react-bootstrap/Table'; // นำเข้าคอมโพเนนต์ Table จาก react-bootstrap
import React, { useEffect, useState } from 'react'; // นำเข้า useEffect และ useState จาก React
import { database, ref, onValue } from '../Firebase/Firebase'; // นำเข้าฟังก์ชันจาก Firebase สำหรับจัดการฐานข้อมูล

function Table_data() {
    // สร้าง state variables สำหรับเก็บข้อมูลจาก Firebase
    const [distance, setDistance] = useState(''); 
    const [motionDetected, setMotionDetected] = useState('');
    const [temp, setTemp] = useState('');
    const [humidity, sethumidity] = useState('');

    useEffect(() => {
        // สร้าง references ไปยังตำแหน่งข้อมูลต่างๆ ใน Firebase
        const distanceRef = ref(database, 'Distance'); 
        const motionRef = ref(database, 'MotionDetected');
        const tempRef = ref(database, 'temp');
        const humidityRef = ref(database, 'humidity');

        // ติดตามการเปลี่ยนแปลงข้อมูลใน Firebase และอัปเดต state variables
        onValue(distanceRef, (snapshot) => {
            const data = snapshot.val();
            setDistance(data); 
        });

        onValue(motionRef, (snapshot) => {
            const data = snapshot.val();
            setMotionDetected(data ? 'มี' : 'ไม่มี'); // แปลงค่า boolean เป็นข้อความ
        });

        onValue(tempRef, (snapshot) => {
            const data = snapshot.val();
            setTemp(data);
        });

        onValue(humidityRef, (snapshot) => {
            const data = snapshot.val();
            sethumidity(data);
        });

        // เคลียร์ event listeners เมื่อคอมโพเนนต์ถูกถอนออกจาก DOM
        return () => {
            onValue(distanceRef, () => {});
            onValue(motionRef, () => {});
            onValue(tempRef, () => {});
            onValue(humidityRef, () => {});
        };
    }, []); // dependency array ว่าง หมายถึง useEffect จะทำงานครั้งเดียวเมื่อคอมโพเนนต์ถูกสร้างขึ้น

    return (
        <Table striped bordered hover> {/* สร้างตารางที่มีเส้นขอบและ hover effect */}
            <thead> {/* ส่วนหัวของตาราง */}
                <tr>
                    <th>ที่นั่ง</th>
                    <th>เซ็นเซอร์วัดระยะ</th>
                    <th>เซ็นเซอร์ตรวจจับความเคลื่อนไหว</th>
                    <th>เซ็นเซอร์ตรวจจับอุณภูมิ</th>
                    <th>เซ็นเซอร์ตรวจจับความชื้น</th>
                </tr>
            </thead>
            <tbody> {/* ส่วนเนื้อหาของตาราง */}
                <tr>
                    <td>1</td>
                    <td>{distance} cm</td> {/* แสดงค่า distance */}
                    <td>{motionDetected}</td> {/* แสดงค่า motionDetected */}
                    <td>{temp}</td> {/* แสดงค่า temp */}
                    <td>{humidity}</td> {/* แสดงค่า humidity */}
                </tr>
            </tbody>
        </Table>
    );
}

export default Table_data;