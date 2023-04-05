import React from 'react'
import LoginForm from '../components/form/loginForm'

type Props = {}

const Login = (props: Props) => {
  return (
    <div className={`bg_loginPage border h-screen w-full flex justify-center items-center`}>
      <LoginForm />
    </div>
  )
}
Login.layout = 'login'

export default Login