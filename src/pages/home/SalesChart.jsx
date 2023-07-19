import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SalesChart = () => {
    const data = [
        { month: "Jan", "2020": 20, "2022": 10 },
        { month: "Feb", "2020": 40, "2022": 20 },
        { month: "Mar", "2020": 50, "2022": 40 },
        { month: "Apr", "2020": 30, "2022": 60 },
        { month: "May", "2020": 40, "2022": 20 },
        { month: "Jun", "2020": 50, "2022": 40 },
        { month: "Jul", "2020": 30, "2022": 50 },
        { month: "Aug", "2020": 30, "2022": 60 },
        { month: "Sep", "2020": 40, "2022": 20 },
    ];

    return (
        <Card>
            <CardBody>
                <CardSubtitle className="text-muted" tag="h6">
                    Yearly Sales Report
                </CardSubtitle>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="2020" stroke="#0d6efd" fill="#0d6efd" />
                        <Area type="monotone" dataKey="2022" stroke="#009efb" fill="#009efb" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
};

const RoomCharts = () => {
    const data = [
        { name: "Single", uv: 4000, pv: 2400, amt: 2400 },
        { name: "Double", uv: 3000, pv: 1398, amt: 2210 },
        { name: "Triple", uv: 2000, pv: 9800, amt: 2290 },
        { name: "Suite", uv: 2780, pv: 3908, amt: 2000 },
        { name: "Penthouse", uv: 1890, pv: 4800, amt: 2181 },
        { name: "Presidential", uv: 2390, pv: 3800, amt: 2500 },
        { name: "VIP", uv: 3490, pv: 4300, amt: 2100 },
        { name: "Deluxe", uv: 2800, pv: 1900, amt: 2181 },
    ];

    return (
        <Card>
            <CardBody>
                <ResponsiveContainer width="100%" height={315}>
                    <AreaChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    );
};

const App = () => {
    return (
        <div>
            <Row>
                <Col md="6">
                    <SalesChart />
                </Col>
                <Col md="6">
                    <RoomCharts />
                </Col>
            </Row>
        </div>
    );
};

export default App;
