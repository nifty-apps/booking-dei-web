import React, { useState } from 'react';
import { Button, Card, CardBody, CardTitle, Table, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import Breadcrumb from '../../components/Breadcrumb';

const Transaction = () => {
    const transactionData = [
        {
            id: 1,
            hotelName: 'Hotel A',
            date: '2023-07-12',
            total: "100000",
            transaction: [
                {
                    name: "Kabir",
                    phone: "01712345678",
                    amount: "10000",
                    purpose: 'advance'
                },
                {
                    name: "Sajib",
                    phone: "017125678",
                    amount: "90000",
                    purpose: 'due'
                }
            ],
        },
        {
            id: 2,
            hotelName: 'Hotel B',
            date: '2023-07-11',
            total: "9500",
            transaction: [
                {
                    name: "Tabib",
                    phone: "01712345678",
                    amount: "1000",
                    purpose: 'advance'
                },
                {
                    name: "Sakib",
                    phone: "017125678",
                    amount: "8500",
                    purpose: 'advance'
                }
            ],
        },
        {
            id: 3,
            hotelName: 'Hotel C',
            date: '2023-07-12',
            total: "95000",
            transaction: [
                {
                    name: "Tabib",
                    phone: "01712345678",
                    amount: "10000",
                    purpose: 'advance'
                },
                {
                    name: "Sakib",
                    phone: "017125678",
                    amount: "85000",
                    purpose: 'advance'
                }
            ],
        }
    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const openModal = (transaction) => {
        setSelectedTransaction(transaction);
        toggleModal();
    };

    const getTodayCollection = () => {
        const today = new Date().toISOString().split('T')[0];
        const todayTransactions = transactionData.filter((transaction) => transaction.date === today);
        const todayCollection = todayTransactions.reduce((total, transaction) => total + parseInt(transaction.amount), 0);
        return todayCollection;
    };

    return (
        <div className='content-wrapper'>
            <div className="content-header">
                <Breadcrumb route={'Transaction'} />
                <Card>
                    <CardBody>
                        <Table className="no-wrap mt-3 align-middle" responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Hotel Name</th>
                                    <th>Total Collections</th>
                                    <th>Date</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionData.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.hotelName}</td>
                                        <td>{transaction.total}</td>
                                        <td>{transaction.date}</td>

                                        <td>
                                            <Button className="btn text-nowrap" color="primary" size="sm" onClick={() => openModal(transaction)}>
                                                See Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </CardBody>
                </Card>

                <Modal isOpen={modalOpen} toggle={toggleModal}>
                    {selectedTransaction && (
                        <>
                            <ModalHeader toggle={toggleModal}>Transaction Details (ID: {selectedTransaction.id})</ModalHeader>
                            <ModalBody>
                                <div>
                                    <Table className="no-wrap mt-3 align-middle" responsive>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Phone Number</th>
                                                <th>Amount</th>
                                                <th>Purpose</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedTransaction.transaction.map((transaction) => (
                                                <tr key={transaction.name}>
                                                    <td>{transaction.name}</td>
                                                    <td>{transaction.phone}</td>
                                                    <td>{transaction.amount}</td>
                                                    <td>{transaction.purpose}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default Transaction;
