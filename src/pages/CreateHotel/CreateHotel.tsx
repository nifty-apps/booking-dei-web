import { useMutation } from "@apollo/client";
import { Form, Input, message } from "antd";
import { CREATE_HOTEL } from "../../graphql/mutations/createHotelMutation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { UPDATE_USER } from "../../graphql/mutations/loginMutations";
import { AppDispatch } from "../../store";
import { login } from "../../store/authSlice";

interface CreateHotelForm {
  name: string;
}

const CreateHotel = () => {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [createHotel] = useMutation(CREATE_HOTEL);
  const [updateUser] = useMutation(UPDATE_USER);

  const onFinish = async (values: CreateHotelForm) => {
    try {
      const response = await createHotel({
        variables: {
          createHotelInput: {
            name: values.name,
          },
        },
      });
      if (response?.data?.createHotel) {
        const hoteID = response?.data?.createHotel?._id;
        message.success("Hotel created successfully!");
        const newUser = { ...user, hotels: [hoteID] };
        const upadatedUser = { access_token: accessToken, user: newUser };

        // localStorage.setItem("user", JSON.stringify(newUser));
        // update user hotel
        try {
          const response = await updateUser({
            variables: {
              updateUserInput: {
                _id: user!._id,
                hotels: [hoteID],
              },
            },
          });
          if (response?.data?.updateUser) {
            dispatch(login(upadatedUser));
            navigate("/");
          }
        } catch (err) {
          message.error(`something went wrong, try again later`);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[500px]">
      <div className="bg-blue-100 p-16 rounded-2xl">
        <h1 className="font-bold text-2xl mb-2 text-center">
          Welcome to Booking Dei
        </h1>
        <p className="mb-5">
          We're thrilled to have you here! Please enter the name of your hotel
          bellow
        </p>
        <Form
          name="createHotel"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 30 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Enter your hotel name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 18,
              span: 8,
            }}
          >
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            >
              Lets Go
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateHotel;
