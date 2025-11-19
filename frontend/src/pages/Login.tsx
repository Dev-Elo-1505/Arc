import AuthForm from "../components/AuthForm"


const Login = () => {
  return (
    <div>
      <AuthForm title="Log in" subtext="Welcome back! Please enter your details." buttonText="Log in" mode="login" onSubmit={() => {}} />
    </div>
  )
}

export default Login