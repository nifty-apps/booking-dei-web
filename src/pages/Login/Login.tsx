import { useMutation } from "@apollo/client";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../../graphql/mutations/loginMutations";
import { AppDispatch } from "../../store";
import { login } from "../../store/authSlice";

interface LoginForm {
  phone: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [loginUser] = useMutation(LOGIN_USER);

  const onFinish = async (values: LoginForm) => {
    try {
      const response = await loginUser({
        variables: {
          phone: values.phone,
          password: values.password,
        },
      });
      if (response?.data?.login) {
        dispatch(login(response.data.login));
        localStorage.setItem("accessToken", response.data.login.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.login.user));
        message.success("Login successful!");
        navigate("/");
      }
    } catch (err) {
      message.error(`something went wrong!`);
    }
  };

  return (
    <div className="flex items-center justify-center h-[500px]">
      <Form
        className="margin-auto w-[400px]"
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
      >
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
            Submit
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
