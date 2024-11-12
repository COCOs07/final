import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/Nav";          // นำ Navbar เข้ามาใช้
import Card from 'react-bootstrap/Card';                // นำ Card หรือ กล่องสี่เหลี่ยมที่แสดงค่า Power Current PF Sumpower เข้ามาใช้
import Container from 'react-bootstrap/Container';      //
import Row from 'react-bootstrap/Row';                  //
import Col from 'react-bootstrap/Col';                  //
import Gauge from "../Components/Gauge"; // ดึง Guage มาใช้จากโฟลเดอร์ Components
import Table from "react-bootstrap/Table";
import { database, ref, onValue } from "../Firebase/Firebase";

const Create = () => {

    function Table_data() {
        const [Voltage, setVoltage] = useState('');
        const [Current, setCurrent] = useState('');
        const [Power, setPower] = useState('');
        const [Energy, setEnergy] = useState('');
        const [PF, setPF] = useState('');
        const [Sumpower, setSumpower] = useState('');
    

    useEffect(() => {
        const VoltageRef = ref(database, 'voltage');
        const CurrentRef = ref(database, 'current');
        const PowerRef = ref(database, 'power');
        const EnergyRef = ref(database, 'energy');
        const PFRef = ref(database, 'pf');
        const SumpowerRef = ref(database, 'sumpower');


        onValue(VoltageRef, (snapshot) => {
            const data = snapshot.val();
            setVoltage(data);
        });

        onValue(CurrentRef, (snapshot) => {
            const data = snapshot.val();
            setCurrent(data);
        });

        onValue(PowerRef, (snapshot) => {
            const data = snapshot.val();
            setPower(data);
        });

        onValue(EnergyRef, (snapshot) => {
            const data = snapshot.val();
            setEnergy(data);
        });

        onValue(PFRef, (snapshot) => {
            const data = snapshot.val();
            setPF(data);
        });

        onValue(SumpowerRef, (snapshot) => {
            const data = snapshot.val();
            setSumpower(data);
        });
    });

    return() => {
        onValue(VoltageRef, () => {});
        onValue(Current, () => {});
        onValue(Power, () => {});
        onValue(Energy, () => {});
        onValue(PF, () => {});
        onValue(Sumpower, () => {});
    };
};
    return (
        <div>
            {/* แท็กการนำ Navbar มาใช้ */}
            <NavigationBar />

            <Container>
                <div style={{ display: 'flex' }} className="gap-2" >
                    <Row md={4}>

                        <Col>
                            <Card style={{ width: '20rem', height: '10rem', marginTop: '3rem' }}>
                                <Card.Body className="shadow bg-success rounded">
                                    <Card.Title className="text-light">Power</Card.Title>
                                    <Card.Text className="text-light">{Power}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>



                        <Col>
                            <Card style={{ width: '20rem', height: '10rem', marginTop: '3rem', }}>
                                <Card.Body className="shadow bg-danger rounded" >
                                    <Card.Title className="text-light">Current</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>



                        <Col>
                            <Card style={{ width: '20rem', height: '10rem', marginTop: '3rem' }}>
                                <Card.Body className="shadow bg-warning rounded">
                                    <Card.Title className="text-light">PF</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>



                        <Col>
                            <Card style={{ width: '20rem', height: '10rem', marginTop: '3rem', }}>
                                <Card.Body className="shadow bg-info rounded">
                                    <Card.Title className="text-light">Sumpower</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>



                    </Row>
                </div>
            </Container>

            <Container>
                <div className="gap-2">
                    <Row md={4}>
                        <Col className="mt-5 ms-5">
                            <Card className="bg-dark">
                                <h3 className="text-danger ms-5 p-3">Energy</h3>
                                <Gauge />
                            </Card>
                        </Col>
                        <Col className="mt-5 ms-5">
                            <Card className="bg-dark">
                                <h3 className="text-danger ms-5 p-3">Voltage</h3>
                                <Gauge />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}
export default Create;