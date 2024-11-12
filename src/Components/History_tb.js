import React, { useEffect, useState } from 'react';
import { database, ref, onValue, get } from '../Firebase/Firebase'; 
import Table from 'react-bootstrap/Table';

const History_tb = () => {
  // สร้าง state `historyData` เป็น array ว่าง เพื่อเก็บข้อมูลประวัติ
  const [historyData, setHistoryData] = useState([]); 

  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูลประวัติจาก Firebase
    const fetchHistoryData = async () => {
      try {
        const historyRef = ref(database, 'history'); // สร้าง reference ไปยังโหนด 'history' ใน Firebase
        const snapshot = await get(historyRef); // ดึงข้อมูลจาก 'history' ครั้งเดียว
        const data = snapshot.val() || {}; // แปลง snapshot เป็น object หรือใช้ object ว่างถ้าไม่มีข้อมูล

        // รวมข้อมูลจากทุกโหนด 'seat_' และ 'driver'
        let combinedData = [];
        Object.keys(data).forEach(seat => {
          if (seat === 'driver') {
            // ถ้าเป็นโหนด 'driver' ให้รวมข้อมูลทั้งหมดลงใน combinedData
            combinedData = combinedData.concat(Object.values(data[seat]));
          } else if (seat.startsWith('seat_')) {
            // ถ้าเป็นโหนด 'seat_' ให้รวมข้อมูลทั้งหมดลงใน combinedData
            combinedData = combinedData.concat(Object.values(data[seat]));
          }
        });

        // เรียงลำดับข้อมูลตาม timestamp (จากใหม่ไปเก่า)
        const sortedData = combinedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // อัปเดต state `historyData` ด้วยข้อมูลที่เรียงลำดับแล้ว
        setHistoryData(sortedData);
      } catch (error) {
        console.error("Error fetching history data:", error);
        // จัดการข้อผิดพลาดที่นี่ เช่น แสดงข้อความแจ้งเตือน
      }
    };

    fetchHistoryData(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลเมื่อคอมโพเนนต์ถูกสร้างขึ้น
  }, []); // dependency array ว่าง หมายถึง useEffect จะทำงานครั้งเดียวเมื่อคอมโพเนนต์ถูกสร้างขึ้น

  return (
    <div className="container mt-4"> {/* สร้าง container และเว้นระยะห่างด้านบน 4 */}
      <h3>ประวัติการขึ้น/ลงจากรถ (คนขับและผู้โดยสาร)</h3> 
      {historyData.length === 0 ? ( // ถ้าไม่มีข้อมูลประวัติ
        <p>ไม่มีประวัติการขึ้น/ลง</p> 
      ) : (
        <Table striped bordered hover> {/* สร้างตารางที่มีเส้นขอบและ hover effect */}
          <thead> {/* ส่วนหัวของตาราง */}
            <tr>
              <th>#</th>
              <th>ชื่อ</th>
              <th>ที่นั่ง</th> 
              <th>การกระทำ</th>
              <th>วันที่และเวลา</th>
            </tr>
          </thead>
          <tbody> {/* ส่วนเนื้อหาของตาราง */}
            {historyData.map((record, index) => ( // วนลูปแสดงข้อมูลแต่ละแถว
              <tr key={index}>
                <td>{index + 1}</td> {/* แสดงลำดับที่ */}
                <td>{record.name}</td> {/* แสดงชื่อ */}
                <td>{record.seat || 'คนขับ'}</td> {/* แสดงที่นั่ง หรือ 'คนขับ' ถ้าไม่มีข้อมูลที่นั่ง */}
                <td>{record.action}</td> {/* แสดงการกระทำ */}
                <td>{new Date(record.timestamp).toLocaleString()}</td> {/* แสดงวันที่และเวลาในรูปแบบที่อ่านง่าย */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default History_tb;