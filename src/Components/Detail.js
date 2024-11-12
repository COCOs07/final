// นำเข้าคอมโพเนนต์ Card และ Button จาก react-bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// สร้าง functional component ชื่อ Detail
function Detail() {
  return (
    <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}> 
      {/* สร้าง div container จัดวางเนื้อหาชิดขวา และมีระยะห่างด้านบน 1rem */}
      <Card className='shadow' style={{ width: '18rem' }}> 
        {/* สร้าง Card มีเงา และความกว้าง 18rem */}
        <Card.Body> {/* สร้างส่วนเนื้อหาภายใน Card */}
          <Card.Title>รายละเอียด</Card.Title> {/* หัวข้อของ Card */}
          <Card.Text> {/* เนื้อหาของ Card */}
            <Button variant="primary" disabled></Button>{' '} คนขับอยู่ที่รถ<br></br> 
            {/* ปุ่มสี primary (น้ำเงิน) แสดงสถานะ "คนขับอยู่ที่รถ" ปุ่มถูกปิดการใช้งาน (disabled) */}
            <Button variant="success" disabled></Button>{' '} ยังไม่มีผู้โดยสาร<br></br>
            {/* ปุ่มสี success (เขียว) แสดงสถานะ "ยังไม่มีผู้โดยสาร" ปุ่มถูกปิดการใช้งาน (disabled) */}
            <Button variant="warning" disabled></Button>{' '} มีผู้โดยสารอยู่<br></br>
            {/* ปุ่มสี warning (เหลือง) แสดงสถานะ "มีผู้โดยสารอยู่" ปุ่มถูกปิดการใช้งาน (disabled) */}
            <Button variant="danger" disabled></Button>{' '} คนขับไม่อยู่บนรถ<br></br>
            {/* ปุ่มสี danger (แดง) แสดงสถานะ "คนขับไม่อยู่บนรถ" ปุ่มถูกปิดการใช้งาน (disabled) */}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

// export คอมโพเนนต์ Detail เพื่อให้ส่วนอื่นๆ ของแอปพลิเคชันสามารถนำไปใช้งานได้
export default Detail;