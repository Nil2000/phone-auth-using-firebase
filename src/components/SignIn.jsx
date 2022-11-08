import React, { useState } from "react";
// import PhoneInput from "react-phone-input-2";

function SignIn({ loginSubmit, otpSubmit, viewOtpForm }) {
    const [otpForm, setOtpForm] = useState("");
    const [value, setValue] = useState("+91");
    // const otpFieldChange=(e)=>{
    //     setOtpForm()
    // }

    return (
        <div className="wrapper">
            <h1 className="main-heading">Sign in</h1>
            <p className="sub-text">Sign in using your mobile number.</p>
            {!viewOtpForm ? (
                <div className="form-wrapper">
                    <form id="loginForm" onSubmit={loginSubmit}>
                        <div className="input-field">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                autoComplete="false"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </div>
                        <button
                            className="main-button"
                            type="submit"
                            id="sign-in-button"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            ) : (
                <div className="form-wrapper" onSubmit={otpSubmit}>
                    <form id="otpForm">
                        <div className="input-field">
                            <label>Enter OTP</label>
                            <input
                                type="number"
                                placeholder="One time password"
                                name="otp_value"
                                autoComplete="false"
                                value={otpForm}
                                onChange={(e) => setOtpForm(e.target.value)}
                            />
                        </div>
                        <button className="main-button" type="submit">
                            Verify OTP
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SignIn;
