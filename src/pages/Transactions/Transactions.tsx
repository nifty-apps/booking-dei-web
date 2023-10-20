import {
  ExclamationCircleFilled,
  PrinterOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TitleText from "../../components/Title";
import { Transaction } from "../../graphql/__generated__/graphql";
import { UPDATE_CONTACT } from "../../graphql/mutations/contactMutations";
import {
  REMOVE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "../../graphql/mutations/transactionMutations";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_DATE_RANGE,
} from "../../graphql/queries/transactionsQueries";
import { RootState } from "../../store";

const { confirm } = Modal;

const { RangePicker } = DatePicker;

const Transactions = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedDateRange, setSelectedDateRange] = useState<[string, string]>([
    dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [editingTransactionId, setEditingTransactionId] = useState<
    string | null
  >(null);

  const [form] = Form.useForm();

  const { data: transactionsData, loading, error } = useQuery(GET_TRANSACTIONS);
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS }],
  });

  // update contact API call
  const [updateContact] = useMutation(UPDATE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  // Fetch data based on the selected date range
  const { data: transactionsByDateRangeData } = useQuery(
    GET_TRANSACTIONS_BY_DATE_RANGE,
    {
      variables: {
        hotelId: user?.hotels[0] || "",
        startDate: selectedDateRange[0],
        endDate: selectedDateRange[1],
      },
      skip: !selectedDateRange[0] || !selectedDateRange[1], // Skip the query if dates are not selected
    }
  );

  // remove transaction
  const [removeTransaction] = useMutation(REMOVE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS }],
  });

  const handleRemoveTransaction = async (transactionId: string) => {
    confirm({
      title: "Do you want to delete this transaction?",
      icon: <ExclamationCircleFilled />,
      okType: "danger",
      async onOk() {
        try {
          await removeTransaction({ variables: { id: transactionId } });
          message.success("Transaction deleted successfully.");
        } catch (error) {
          message.error("An error occurred while deleting the transaction.");
        }
      },
    });
  };

  // Update transaction
  const onFinish = async (values: Transaction, transactionId: string) => {
    try {
      const res = await updateTransaction({
        variables: {
          updateTransactionInput: {
            _id: transactionId,
            date: values.date.format("YYYY-MM-DD"),
            contact: values.contact._id,
            description: values.description,
            method: values.method,
            amount: Number(values.amount),
          },
        },
      });

      // update contact
      if (res.data?.updateTransaction?.contact?._id) {
        await updateContact({
          variables: {
            updateContactInput: {
              _id: res?.data?.updateTransaction.contact._id,
              name: values.contact.toString(),
            },
          },
        });
      }

      message.success("Transaction updated successfully.");
      setIsModalOpen(false);
    } catch (error) {
      message.error("An error occurred while updating the transaction.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const transactions = transactionsData?.transactions || [];
  const transactionsByDateRange =
    transactionsByDateRangeData?.transactionsByDateRange || [];

  // Combine the data from both queries based on date range
  const combinedTransactions = selectedDateRange[0]
    ? transactionsByDateRange
    : transactions;

  // Filter transactions based on search text
  const filteredTransactions = combinedTransactions.filter((transaction) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      transaction?.date.toLowerCase().includes(lowercaseSearchText) ||
      transaction?.contact?.name.toLowerCase().includes(lowercaseSearchText) ||
      transaction?.category?.toLowerCase().includes(lowercaseSearchText) ||
      transaction?.subCategory?.toLowerCase().includes(lowercaseSearchText) ||
      transaction?.method.toLowerCase().includes(lowercaseSearchText)
    );
  });

  const dataSource = filteredTransactions.map((transaction) => ({
    key: transaction._id,
    date: dayjs(transaction.date).format("YYYY-MM-DD"),
    contact: transaction.contact.name,
    category: transaction.category,
    subCategory: transaction.subCategory,
    method: transaction.method,
    amount: transaction.amount,
    description: transaction.description,
    action: transaction.booking || transaction._id,
  }));

  const columns = [
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "CONTACT",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "SUB-CATEGORY",
      dataIndex: "subCategory",
      key: "subCategory",
    },
    {
      title: "METHOD",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (bookingId: string, record: { key: string }) => {
        return (
          <div className="flex gap-4">
            {bookingId && (
              <Link
                to={`/booking-details/${bookingId}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Booking Details
              </Link>
            )}

            <div className="flex items-center gap-3 cursor-pointer">
              <FaRegEdit
                onClick={() => {
                  setIsModalOpen(true);
                  setEditingTransactionId(record.key);
                  const editedTransaction = dataSource.find(
                    (item) => item.key === record.key
                  );
                  form.setFieldsValue({
                    date: dayjs(editedTransaction?.date),
                    contact: editedTransaction?.contact,
                    description: editedTransaction?.description,
                    method: editedTransaction?.method,
                    amount: editedTransaction?.amount.toString(),
                  });
                }}
              />
              <FaRegTrashAlt
                onClick={() => handleRemoveTransaction(record.key)}
              />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <TitleText text="Transactions" />

        {/*  top button  filter transaction & Download PDF */}
        <div className="flex items-center gap-4">
          <button className="text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 hover:bg-blue-900 hover:text-white">
            Download/Print <PrinterOutlined />
          </button>
          <button
            type="submit"
            className="text-white px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2  bg-blue-900 w-full"
          >
            + Add Expense
          </button>
        </div>
      </div>
      <div className="flex align-middle justify-between mb-3">
        <div className="w-3/12">
          <Input
            placeholder="Search here.."
            allowClear
            size="middle"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="flex items-center gap-2">
          <RangePicker
            allowClear={true}
            format="YYYY-MM-DD"
            value={
              selectedDateRange[0] && selectedDateRange[1]
                ? [dayjs(selectedDateRange[0]), dayjs(selectedDateRange[1])]
                : undefined
            }
            onChange={(dates) =>
              setSelectedDateRange([
                dates?.[0]?.format("YYYY-MM-DD") || "",
                dates?.[1]?.format("YYYY-MM-DD") || "",
              ])
            }
          />

          <button
            onClick={() => setFilterModalOpen(true)}
            type="submit"
            className="flex items-center gap-1 text-white  px-10 w-fit py-1 rounded-md font-semibold capitalize bg-blue-900 "
          >
            Filters <FilterOutlined />
          </button>
        </div>
      </div>

      <Table dataSource={dataSource} columns={columns} pagination={false} />

      {/* modal to filter transactions  */}
      <Modal
        title="Filters"
        open={filterModalOpen}
        onOk={() => setFilterModalOpen(false)}
        onCancel={() => setFilterModalOpen(false)}
        footer={null}
        centered
      >
        <Form
          className="mt-5"
          form={form}
          // onFinish={(values) => handleUpdate(values, guestID || "")}
        >
          <Space direction="vertical" className="w-full">
            <h3 className="font-semibold">Transaction Type</h3>
            <Form.Item name="income" className="mb-0">
              <Checkbox>Income</Checkbox>
            </Form.Item>
            <Form.Item name="expense" className="mb-0">
              <Checkbox>Expenses</Checkbox>
            </Form.Item>
          </Space>

          <div className="flex justify-center gap-4 mt-6 mb-2">
            <button
              type="reset"
              className="text-blue-700 px-20 py-1 rounded-md  font-semibold capitalize flex items-center gap-2 border border-blue-900 hover:bg-blue-500 hover:text-white"
            >
              Reset
            </button>
            <button
              type="submit"
              className="  bg-blue-600  hover:bg-blue-500 text-white font-semibold py-2 px-20 rounded"
            >
              Apply
            </button>
          </div>
        </Form>
      </Modal>

      {/* Modal for edit transaction */}
      <Modal
        title="Edit Transaction"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={(values) => onFinish(values, editingTransactionId || "")}
        >
          <Space direction="vertical" className="w-full">
            <h3>Date</h3>
            <Form.Item name="date" className="mb-0">
              <DatePicker className="w-full" />
            </Form.Item>

            <h3>Contact</h3>
            <Form.Item name="contact" className="mb-0">
              <Input placeholder="contact" autoComplete="off" />
            </Form.Item>

            <h3>Description</h3>
            <Form.Item name="description" className="mb-0">
              <TextArea
                placeholder="Enter description"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>

            <h3>Method</h3>
            <Form.Item name="method" className="mb-0">
              <Select
                placeholder="method"
                options={[
                  { value: "CASH", label: "Cash" },
                  { value: "BANK", label: "Bank" },
                  { value: "BKASH", label: "Bkash" },
                ]}
              />
            </Form.Item>

            <h3>Amount</h3>
            <Form.Item name="amount" className="mb-0">
              <Input placeholder="Amount" autoComplete="off" />
            </Form.Item>
          </Space>

          <div className="flex justify-end">
            <button
              type="submit"
              className=" mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-8 rounded"
            >
              Edit Transaction
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Transactions;
