import { Form, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.png";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { URL_LOGIN } from "../../services/AutenticacionServices";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values: any) => {
    setError("");
    try {
      const response = await axios.post(URL_LOGIN, values);
      const { tokenSession } = response.data;

      const decodedToken: any = jwtDecode(tokenSession);

      signIn({
        auth: {
          token: tokenSession,
          type: "Bearer",
        },
        userState: {
          username: values.username,
          role: decodedToken.role,
          uid: decodedToken.id,
        },
      });

      navigate("/");
    } catch (error) {
      if (error && error instanceof AxiosError)
        setError(
          "El usuario o contraseña son incorrectos"
          // error.response?.data?.message || error.message
        );
      else if (error && error instanceof Error) setError(error.message);
      console.log("Error: ", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className="flex justify-center items-center justify-content w-full h-screen bg-blue-900">
      <Form
        action="POST"
        onSubmit={formik.handleSubmit}
        className="flex justify-center p-6 items-center flex-col gap-2 border-2 border-b-blue-900 bg-white"
        id="formLogin"
      >
        <input type="text" style={{ display: "none" }} id="RCv2" name="RCv2" />
        <p>
          <img src={logo} width="90" height="90" alt="Logo" />
        </p>
        <span className="login100-form-title p-b-12">
          Bienvenido a Austral Group S.A.A.
        </span>

        <div
          className="text-danger validation-summary-valid"
          data-valmsg-summary="true"
        >
          <ul>
            <li style={{ display: "none" }}></li>
          </ul>
        </div>

        <div
          className="form-group wrap-input100 validate-input m-b-36"
          data-validate="Username is required"
        >
          <Input
            id="username"
            className="dark"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <span
            className="focus-input100 field-validation-valid"
            data-valmsg-for="Input.Email"
            data-valmsg-replace="true"
          ></span>
        </div>

        <div
          className="form-group wrap-input100 validate-input m-b-12"
          data-validate="Password is required"
        >
          <span className="btn-show-pass">
            <i className="fa fa-eye"></i>
          </span>
          <Input
            id="password"
            type="password"
            className="dark"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <span
            className="focus-input100 field-validation-valid"
            data-valmsg-for="Input.Password"
            data-valmsg-replace="true"
          ></span>
        </div>

        <div className="container-login100-form-btn">
          <input
            className="btn btn-secondary block m-b col col-sm-12 text-center"
            type="submit"
            value="Ingresar"
            id="btnFormLogin"
          />
        </div>
      </Form>
    </div>
  );
};

export default Login;
