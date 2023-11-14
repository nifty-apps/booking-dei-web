import { useMutation } from "@apollo/client";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CREATE_USER,
  LOGIN_USER,
} from "../../graphql/mutations/loginMutations";
import { AppDispatch } from "../../store";
import { login } from "../../store/authSlice";

interface RegistrationForm {
  name: string;
  phone: string;
  password: string;
}

const Registration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [createUser] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const onFinish = async (values: RegistrationForm) => {
    try {
      const response = await createUser({
        variables: {
          name: values.name,
          phone: values.phone,
          password: values.password,
        },
      });
      if (response?.data?.signup) {
        message.success("Account created successfully!");
        const user = response?.data?.signup;
        try {
          const response = await loginUser({
            variables: {
              phone: user.phone,
              password: user.password,
            },
          });
          if (response?.data?.login) {
            dispatch(login(response.data.login));
            navigate("/create-hotel");
          }
        } catch (err) {
          message.error(`something went wrong!`);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[500px]">
      <Form
        className="margin-auto w-[400px]"
        name="registration"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Enter your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Enter phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Enter password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Create Account
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
