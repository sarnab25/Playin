import './PopOTP.css'
function PopOTp({phoneNumber, handlePhoneSubmit,handleotpSubmit,setotp,setphoneNumber,otp, setotpPop})
{
    return(
        <div className="container">
            <div className="send">
    <input type="number" 
    placeholder="Enter your Phone number"
    value={phoneNumber}
    onChange={(e)=>setphoneNumber(e.target.value)} />
    <button onClick={handlePhoneSubmit}>Send OTP</button>
    </div>

    <div className="verify">
    <input type="number" 
    placeholder="Enter OTP"
    value={otp}
    onChange={(e)=>setotp(e.target.value)} />
    <button onClick={handleotpSubmit}>Verify OTP</button>
    </div>
    <div className="x_btn" onClick={()=>setotpPop(false)}>X</div>
    </div>
    )
}

export default PopOTp