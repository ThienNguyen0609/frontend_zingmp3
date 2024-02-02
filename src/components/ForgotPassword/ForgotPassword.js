import './ForgotPassword.scss'

import UsernameOrEmailForm from './UsernameOrEmailForm/UsernameOrEmailForm'
import OTPForm from './OTPForm/OTPForm'
import PasswordForm from './PasswordForm/PasswordForm'
import ZingContent from '../ZingContent'
import { useState } from 'react'

const ForgotPassword = () => {
    const [usernameOrEmailForm, setUsernameOrEmailForm] = useState(true)
    const [oTPForm, setOTPForm] = useState(false)
    const [passwordForm, setPasswordForm] = useState(false)

    const [OTP, setOTP] = useState("")
    const [usernameOrEmail, setUsernameOrEmail] = useState("")

    return (
        <div className='forgot-password-container'>
            <ZingContent className="mb-4" />
            <div>
                {usernameOrEmailForm && 
                    <UsernameOrEmailForm form1={setUsernameOrEmailForm} form2={setOTPForm} setOTP={setOTP} setUsernameOrEmail={setUsernameOrEmail} />}
                {oTPForm && <OTPForm OTPSend={OTP} form2={setOTPForm} form3={setPasswordForm} />}
                {passwordForm && <PasswordForm usernameOrEmail={usernameOrEmail} />}
            </div>
        </div>
    )
}

export default ForgotPassword