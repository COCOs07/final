import Card from 'react-bootstrap/Card'; // นำเข้า Card จาก react-bootstrap เพื่อใช้แสดงผลการ์ด
import Button from 'react-bootstrap/Button'; // นำเข้า Button จาก react-bootstrap เพื่อใช้สร้างปุ่ม
import Swal from 'sweetalert2'; // นำเข้า Swal จาก sweetalert2 เพื่อใช้แสดงข้อความแจ้งเตือน
import { database, ref, onValue, update, push } from '../Firebase/Firebase'; // นำเข้า Firebase ฟังก์ชันต่าง ๆ เช่น database, ref, onValue, update, push เพื่อใช้จัดการกับฐานข้อมูล Firebase
import { useEffect, useState } from 'react'; // นำเข้า useEffect และ useState จาก React เพื่อจัดการกับ state และ lifecycle ของ component

function Car() {
  const [passengerData, setPassengerData] = useState({}); // ใช้ useState เพื่อสร้างตัวแปร passengerData เก็บข้อมูลผู้โดยสาร
  const [isLoading, setIsLoading] = useState(true); // ตัวแปร state สำหรับเก็บสถานะการโหลดข้อมูล
  const [error, setError] = useState(null); // ตัวแปร state สำหรับเก็บข้อผิดพลาด
  const [passengerList, setPassengerList] = useState([]); // ตัวแปร state สำหรับเก็บรายชื่อผู้โดยสารทั้งหมด

  useEffect(() => { // useEffect จะทำงานเมื่อ component ถูกสร้างขึ้นครั้งแรก
    const passengersRef = ref(database, 'passengers'); // สร้าง reference ไปยัง 'passengers' ใน Firebase

    const unsubscribe = onValue(passengersRef, (snapshot) => { // ใช้ onValue เพื่อฟังการเปลี่ยนแปลงข้อมูลใน Firebase แบบเรียลไทม์
      const data = snapshot.val(); // ดึงข้อมูลจาก snapshot ของ Firebase
      setPassengerData(data || {}); // อัปเดต state ของ passengerData ด้วยข้อมูลที่ได้จาก Firebase หรือ {} หากข้อมูลเป็น null
      setIsLoading(false); // เมื่อโหลดข้อมูลเสร็จ ให้ตั้งค่า isLoading เป็น false
    }, (error) => { // กรณีที่มีข้อผิดพลาดในการโหลดข้อมูล
      console.error("Error fetching passenger data:", error); // แสดงข้อความข้อผิดพลาดใน console
      setError(error); // บันทึกข้อผิดพลาดใน state
      setIsLoading(false); // หยุดสถานะการโหลด
    });

    return () => unsubscribe(); // ทำการยกเลิกการสมัครรับข้อมูลเมื่อ component ถูกทำลาย
  }, []); // กำหนด useEffect ให้ทำงานแค่ครั้งเดียว เมื่อ component ถูก mount

  useEffect(() => { // useEffect สำหรับดึงรายชื่อผู้โดยสารทั้งหมดจาก Firebase
    const passengersNameRef = ref(database, 'passengers_name');
    onValue(passengersNameRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const passengers = Object.values(data).map(passenger => passenger.name);
        setPassengerList(passengers);
      }
    });
  }, []);

  const handleSeatClick = (seatNumber) => { // ฟังก์ชันที่ถูกเรียกเมื่อกดที่นั่ง
    const passenger = passengerData[`seat_${seatNumber}`]?.name; // ดึงชื่อผู้โดยสารจากข้อมูล seat ที่เลือก

    if (passenger) { // ถ้ามีผู้โดยสารในที่นั่งนี้
      Swal.fire({ // แสดง Swal แจ้งเตือนว่าที่นั่งนี้มีผู้โดยสารแล้ว
        title: `ที่นั่ง ${seatNumber} มีผู้โดยสาร: ${passenger}`,
        showDenyButton: true, // แสดงปุ่ม "ลงรถ"
        confirmButtonText: 'OK',
        denyButtonText: 'ลงรถ',
      }).then((result) => { // เมื่อผู้ใช้เลือกจาก Swal
        if (result.isDenied) { // ถ้าผู้ใช้เลือกลงรถ
          const currentDate = new Date(); // สร้างวันที่ปัจจุบัน
          const timestamp = currentDate.toISOString(); // แปลงเป็นรูปแบบ ISO string

          const passengersRef = ref(database, 'passengers'); // สร้าง reference ไปยัง 'passengers' ใน Firebase
          update(passengersRef, { // อัปเดตข้อมูลใน Firebase ลบชื่อผู้โดยสารที่นั่งนี้
            [`seat_${seatNumber}`]: { name: "" }
          });

          const historyRef = ref(database, `history/seat_${seatNumber}`); // สร้าง reference ไปยัง 'history' สำหรับบันทึกการกระทำ
          push(historyRef, { // บันทึกประวัติการลงรถของผู้โดยสาร
            name: passenger,
            seat: seatNumber,
            action: "ลงรถ",
            timestamp: timestamp
          });

          Swal.fire('บันทึกสำเร็จ!', '', 'success'); // แสดง Swal ว่าบันทึกสำเร็จ
        }
      });
    } else { // ถ้าที่นั่งว่าง
      Swal.fire({ // แสดง Swal ให้เลือกชื่อผู้โดยสารจากรายชื่อที่มีอยู่
        title: 'เลือกผู้โดยสาร',
        input: 'select',
        inputOptions: passengerList.reduce((options, passenger) => {
          options[passenger] = passenger;
          return options;
        }, {}),
        inputPlaceholder: 'เลือกผู้โดยสาร',
        showCancelButton: true,
      }).then((result) => { // เมื่อผู้ใช้เลือกชื่อ
        if (result.isConfirmed) { // ถ้าผู้ใช้ยืนยันการเลือกชื่อ
          const passengerName = result.value; // ดึงชื่อผู้โดยสารจากผลลัพธ์
          const currentDate = new Date(); // สร้างวันที่ปัจจุบัน
          const timestamp = currentDate.toISOString(); // แปลงเป็นรูปแบบ ISO string

          if (passengerName) { // ถ้าชื่อผู้โดยสารไม่ว่าง
            const passengersRef = ref(database, 'passengers'); // สร้าง reference ไปยัง 'passengers'
            update(passengersRef, { // อัปเดตข้อมูลใน Firebase ให้ที่นั่งนี้มีผู้โดยสารชื่อ passengerName
              [`seat_${seatNumber}`]: { name: passengerName }
            });

            const historyRef = ref(database, `history/seat_${seatNumber}`); // สร้าง reference ไปยัง 'history' สำหรับบันทึกการกระทำ
            push(historyRef, { // บันทึกประวัติการขึ้นรถของผู้โดยสาร
              name: passengerName,
              seat: seatNumber,
              action: "ขึ้นรถ",
              timestamp: timestamp
            });

            Swal.fire('บันทึกสำเร็จ!', '', 'success'); // แสดง Swal ว่าบันทึกสำเร็จ
          } else {
            Swal.fire('กรุณาเลือกผู้โดยสาร', '', 'error'); // ถ้าชื่อผู้โดยสารว่าง ให้แสดง Swal แจ้งข้อผิดพลาด
          }
        }
      });
    }
  };

  const driver = () => { // ฟังก์ชันสำหรับจัดการสถานะคนขับ
    const driverPresent = passengerData.driverPresent; // ดึงสถานะว่าคนขับอยู่บนรถหรือไม่

    if (driverPresent) { // ถ้าคนขับอยู่บนรถ
      Swal.fire({ // แสดง Swal แจ้งว่าคนขับอยู่
        title: "คนขับ: " + passengerData.driverName + " อยู่ที่รถ",
        showDenyButton: true, // แสดงปุ่มให้คนขับลงรถ
        confirmButtonText: 'OK',
        denyButtonText: 'คนขับลงจากรถ',
      }).then((result) => { // เมื่อผู้ใช้เลือกจาก Swal
        if (result.isDenied) { // ถ้าผู้ใช้เลือกให้คนขับลงรถ
          const currentDate = new Date(); // สร้างวันที่ปัจจุบัน
          const timestamp = currentDate.toISOString(); // แปลงเป็นรูปแบบ ISO string

          const passengersRef = ref(database, 'passengers'); // สร้าง reference ไปยัง 'passengers'
          update(passengersRef, { // อัปเดตสถานะคนขับใน Firebase
            driverPresent: false,
          });

          const historyRef = ref(database, 'history/driver'); // สร้าง reference ไปยัง 'history' ของคนขับ
          push(historyRef, { // บันทึกประวัติว่าคนขับลงจากรถ
            name: passengerData.driverName,
            action: "ลงจากรถ",
            timestamp: timestamp
          });

          Swal.fire('บันทึกสำเร็จ!', '', 'success'); // แสดง Swal ว่าบันทึกสำเร็จ
        }
      });
    } else { // ถ้าคนขับไม่อยู่บนรถ
      Swal.fire({ // แสดง Swal ให้กรอกชื่อคนขับใหม่
        title: 'กรุณากรอกชื่อคนขับ',
        html: '<input id="swal-input1" class="swal2-input">', // ฟอร์มให้ผู้ใช้กรอกชื่อคนขับ
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,   
          ]
        }
      }).then((result) => { // เมื่อผู้ใช้กรอกชื่อคนขับ
        if (result.isConfirmed) { // ถ้าผู้ใช้ยืนยัน
          const driverName = result.value[0]; // ดึงชื่อคนขับจากผลลัพธ์
          const currentDate = new Date(); // สร้างวันที่ปัจจุบัน
          const timestamp = currentDate.toISOString(); // แปลงเป็นรูปแบบ ISO string

          if (driverName) { // ถ้าชื่อคนขับไม่ว่าง
            const passengersRef = ref(database, 'passengers'); // สร้าง reference ไปยัง 'passengers'
            update(passengersRef, { // อัปเดตสถานะคนขับใน Firebase
              driverPresent: true,
              driverName: driverName
            });

            const historyRef = ref(database, 'history/driver'); // สร้าง reference ไปยัง 'history' ของคนขับ
            push(historyRef, { // บันทึกประวัติว่าคนขับขึ้นรถ
              name: driverName,
              action: "ขึ้นรถ",
              timestamp: timestamp
            });

            Swal.fire('บันทึกสำเร็จ!', '', 'success'); // แสดง Swal ว่าบันทึกสำเร็จ
          } else {
            Swal.fire('กรุณากรอกชื่อคนขับ', '', 'error'); // ถ้าชื่อคนขับว่าง ให้แสดง Swal แจ้งข้อผิดพลาด
          }
        }
      });
    }
  };

  const SeatButton = ({ seatNumber }) => { // สร้างปุ่มสำหรับแต่ละที่นั่ง
    const passenger = passengerData[`seat_${seatNumber}`]?.name; // ดึงชื่อผู้โดยสารจากที่นั่งนี้
    const variant = passenger ? "warning" : "success"; // ถ้ามีผู้โดยสารในที่นั่ง ให้ปุ่มเป็นสี warning ถ้าไม่มีก็เป็นสี success

    return (
      <Button
        onClick={() => handleSeatClick(seatNumber)} // เมื่อคลิกปุ่มจะเรียก handleSeatClick
        style={{ width: '10rem', height: '10rem' }} // ตั้งค่าขนาดของปุ่ม
        variant={variant} // กำหนดสีของปุ่มตามสถานะของที่นั่ง
      >
        Seat {seatNumber} {/* แสดงข้อความที่นั่ง */}
      </Button>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {isLoading && ( // ถ้ายังโหลดข้อมูล ให้แสดง spinner
        <div className="spinner-border" role="status">
          <span className="visually-hidden">กำลังโหลด...</span>
        </div>
      )}
      {error && ( // ถ้ามีข้อผิดพลาด ให้แสดงข้อความแจ้งเตือน
        <div className="alert alert-danger" role="alert">
          ขออภัย เกิดข้อผิดพลาดในการโหลดข้อมูล โปรดลองอีกครั้งภายหลัง
        </div>
      )}
      {!isLoading && !error && ( // ถ้าโหลดเสร็จและไม่มีข้อผิดพลาด ให้แสดงข้อมูล
        <Card className='shadow' style={{ width: '50rem', height: '25rem', marginTop: '7rem', padding: '2rem' }}>
          <Card.Body className='gap-2 row' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card.Title className='text-center' style={{ marginTop: '-2rem' }}>ระบบตรวจจับและแจ้งเตือนเด็กตกหล่นบนรถตู้</Card.Title>

            <Button onClick={driver} style={{ width: '10rem', height: '10rem' }} variant={passengerData.driverPresent ? "primary" : "danger"}>
              Driver {/* ปุ่มสำหรับจัดการสถานะคนขับ */}
            </Button>

            {/* ปุ่มสำหรับแต่ละที่นั่ง */}
            <SeatButton seatNumber={1} />
            <SeatButton seatNumber={2} />
            <SeatButton seatNumber={3} />
            <SeatButton seatNumber={4} />
            <SeatButton seatNumber={5} />
            <SeatButton seatNumber={6} />
            <SeatButton seatNumber={7} />

          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default Car; // ส่งออก component Car
