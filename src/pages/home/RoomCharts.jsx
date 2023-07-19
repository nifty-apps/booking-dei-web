import React from 'react';
import { Card } from 'reactstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Single',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Double',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Triple',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Suite',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Penthouse',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Presidential',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'VIP',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Deluxe',
        uv: 2800,
        pv: 1900,
        amt: 2181,
    },
];

const RoomCharts = () => {
    return (
        <Card>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                    width={500}
                    height={400}
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
            </ResponsiveContainer></Card>
    );
};

export default RoomCharts;
