import Head from "next/head";
import Layout from "../components/Layout/Layout";
import LoginForm from "../components/LoginForm/LoginForm";
import Container from "../components/Layout/Container";

// Login component, in which we login and get token
const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <Container className="justify-content-center align-items-center">
          <LoginForm />
        </Container>
      </Layout>
    </>
  );
};

export default Login;
