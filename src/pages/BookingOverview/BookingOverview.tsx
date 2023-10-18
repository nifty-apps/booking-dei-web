import { useQuery } from "@apollo/client";
import { Button, DatePicker, Input, Table, } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TitleText from "../../components/Title";
import { GET_ROOM_BOOKING_FINANCIALS } from "../../graphql/queries/roomBookingFinancialQueries";
import { RootState } from "../../store";
import { FiPrinter } from "react-icons/fi";

const BookingOverview = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    const [searchText, setSearchText] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState(
        dayjs(selectedDate).format("YYYY-MM-DD")
    );

    const { data, loading, error, refetch } = useQuery(
        GET_ROOM_BOOKING_FINANCIALS,
        {
            variables: {
                hotel: user?.hotels[0] || "",
                startDate: selectedDate,
                endDate: selectedDate,
            },
        }
    );   

    useEffect(() => {
        refetch({ startDate: selectedDate, endDate: selectedDate });
    }, [refetch, selectedDate]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred - {error.message}</p>;

    const columns = [
        {
            title: "BOOKING ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "CONTACT",
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: "ROOMS",
            dataIndex: "roomNumber",
            key: "roomNumber",
        },
        {
            title: "RENT AMOUNT",
            dataIndex: "bookingAmount",
            key: "bookingAmount",
        },
        {
            title: "PAID AMOUNT",
            dataIndex: "paidAmount",
            key: "paidAmount",
        },
        {
            title: "DUE AMOUNT",
            dataIndex: "dueAmount",
            key: "dueAmount",
        },
        {
            title: "ACTION",
            dataIndex: "action",
            key: "action",
            render: (bookingId: string) => (
                <Link to={`/booking-details/${bookingId}`} className="text-blue-600">
                    Booking Details
                </Link>
            ),
        },
    ];

    const dataSource = data?.roomBookingFinancials
        .filter((transaction) => transaction?.roombookings?.length > 0)
        .filter((transaction) => {
            const lowerCaseQuery = searchText.toLowerCase();
            return (
                (transaction?.number?.toString()?.includes(lowerCaseQuery) ?? false) ||
                (transaction?.roombookings?.[0]?.bookingCustomer
                    ?.toLowerCase()
                    .includes(lowerCaseQuery) ??
                    false) ||
                (transaction?.type?.rent?.toString()?.includes(lowerCaseQuery) ??
                    false) ||
                (transaction?.roombookings?.[0]?.bookingPayment
                    ?.toString()
                    .includes(lowerCaseQuery) ??
                    false) ||
                (transaction?.roombookings?.[0]?.bookingDue
                    ?.toString()
                    .includes(lowerCaseQuery) ??
                    false)
            );
        })
        .map((transaction) => ({
            key: transaction?._id,
            roomNumber: transaction?.number,
            contact: transaction?.roombookings?.[0]?.bookingCustomer,
            bookingAmount: transaction?.roombookings?.[0]?.bookingRent,
            paidAmount: transaction?.roombookings?.[0]?.bookingPayment,
            dueAmount: transaction?.roombookings?.[0]?.bookingDue,
            action: transaction?.roombookings?.[0]?.booking,
        }));

    const handlePreviousClick = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
        setFormattedDate(dayjs(newDate).format("YYYY-MM-DD"));
        refetch({ startDate: newDate, endDate: newDate });
    };

    const handleNextClick = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate);
        setFormattedDate(dayjs(newDate).format("YYYY-MM-DD"));
        refetch({ startDate: newDate, endDate: newDate });
    };

    return (
        <>
            <div className="mb-5 flex align-middle justify-between">
                <TitleText text="Booking Overview" />
                <Button type="primary" ghost  className="flex align-middle justify-between">
                    Download / Print <span className="pt-1 px-2"><FiPrinter/></span>
                </Button>
            </div>
            <div className="flex align-middle mb-3 justify-between">
                <div className="w-3/12">
                    <Input
                        placeholder="Search here.."
                        allowClear
                        size="middle"
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                </div>

                <div className="justify-between">
                    <Button type="primary" ghost onClick={handlePreviousClick}>
                        Previous
                    </Button>

                    <DatePicker
                        className="mx-1"
                        allowClear={false}
                        placeholder="Select Date"
                        value={dayjs(formattedDate)}
                        onChange={(_, date) => {
                            const newDate = new Date(date);
                            setSelectedDate(newDate);
                            setFormattedDate(dayjs(newDate).format("YYYY-MM-DD"));
                        }}
                    />

                    <Button type="primary" ghost onClick={handleNextClick}>
                        Next
                    </Button>
                </div>
            </div>

            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </>
    );
};

export default BookingOverview;
