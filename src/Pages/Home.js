// นำเข้าคอมโพเนนต์ Navbar01 จากไฟล์ '../Components/Nav' ซึ่งน่าจะเป็นส่วนนำทาง (navigation bar) ของเว็บไซต์
import Navbar01 from '../Components/Nav';

// นำเข้าคอมโพเนนต์ Car จากไฟล์ '../Components/Car' ซึ่งน่าจะแสดงข้อมูลเกี่ยวกับรถ
import Car from '../Components/Car';

// นำเข้าคอมโพเนนต์ Detail จากไฟล์ '../Components/Detail' ซึ่งน่าจะแสดงรายละเอียดเพิ่มเติม
import Detail from '../Components/Detail';

// นำเข้าคอมโพเนนต์ Container, Row, และ Col จาก react-bootstrap library 
// เพื่อจัดการ layout แบบ grid system
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// นำเข้าคอมโพเนนต์ Status จากไฟล์ '../Components/Status' ซึ่งน่าจะแสดงสถานะบางอย่าง
import Status from '../Components/Status';

// นำเข้า React library ซึ่งจำเป็นสำหรับการสร้างคอมโพเนนต์ใน React
import React from 'react';

// นำเข้าคอมโพเนนต์ Add_pass จากไฟล์ '../Components/Add_pass' 
// ซึ่งน่าจะเป็นส่วนสำหรับเพิ่มข้อมูลบัตรผ่าน
import Add_pass from '../Components/Add_pass';

// สร้าง functional component ชื่อ Home
const Home = () => {
    // ส่วนนี้คือสิ่งที่จะถูก render (แสดงผล) บนหน้าจอ
    return (
        <div style={{ 
            backgroundImage:  `url(${require('../IMG/background3.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh' }}> {/* สร้าง div container หลัก */}
            <div> {/* สร้าง div container ย่อย */}
                <Navbar01 /> {/* แสดงผลคอมโพเนนต์ Navbar01 */}
            </div>

            <Row> {/* สร้างแถวใน grid system */}
                <Col 
                    style={{ display: 'flex', justifyContent: 'center', marginTop: 'rem', alignItems: 'center' }}
                > {/* สร้างคอลัมน์แรก กำหนดให้มีขนาด xs (เล็ก) และจัดกึ่งกลางเนื้อหา */}
                    <Status /> {/* แสดงผลคอมโพเนนต์ Status */}
                </Col>
                <Col xs={7}> {/* สร้างคอลัมน์ที่สอง กำหนดให้มีขนาด xs เท่ากับ 7 */}
                    <Car /> {/* แสดงผลคอมโพเนนต์ Car */}
                </Col>
                <Col> {/* สร้างคอลัมน์ที่สาม */}
                    <Detail /> {/* แสดงผลคอมโพเนนต์ Detail */}
                    <div 
                        style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem', alignItems: 'center' }}
                    > {/* สร้าง div container ย่อย จัดกึ่งกลางเนื้อหา */}
                        <Add_pass /> {/* แสดงผลคอมโพเนนต์ Add_pass */}
                    </div>
                </Col>
            </Row>

        </div>
    )
}

// export คอมโพเนนต์ Home เพื่อให้ส่วนอื่นๆ ของแอปพลิเคชันสามารถนำไปใช้งานได้
export default Home