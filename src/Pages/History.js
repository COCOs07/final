// นำเข้าคอมโพเนนต์ Navbar01 จากไฟล์ '../Components/Nav' 
// ซึ่งน่าจะเป็นส่วนนำทาง (navigation bar) ของเว็บไซต์
import Navbar01 from '../Components/Nav';

// นำเข้า React library ซึ่งจำเป็นสำหรับการสร้างคอมโพเนนต์ใน React
import React from 'react';

// นำเข้าคอมโพเนนต์ History_tb จากไฟล์ '../Components/History_tb' 
// ซึ่งน่าจะเป็นตารางแสดงประวัติ
import History_tb from '../Components/History_tb';

// สร้าง functional component ชื่อ History
const History = () => {
    // ส่วนนี้คือสิ่งที่จะถูก render (แสดงผล) บนหน้าจอ
    return (
        <div> {/* สร้าง div container หลัก */}
            <div> {/* สร้าง div container ย่อย */}
                <Navbar01 /> {/* แสดงผลคอมโพเนนต์ Navbar01 */}
                <History_tb/> {/* แสดงผลคอมโพเนนต์ History_tb */}
            </div>

        </div>
    )
}

// export คอมโพเนนต์ History เพื่อให้ส่วนอื่นๆ ของแอปพลิเคชันสามารถนำไปใช้งานได้
export default History