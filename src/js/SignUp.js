import React from 'react';
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {Button, FormControl, InputAdornment, Link, TextField, Typography} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import FrontWarnings from "./FrontWarnings";
import BackErrors from "./BackErrors";
import {useState} from "react";
import {sendApiPostRequest} from "./ApiRequests";
import {
    BASE_URL,
    FEATURES_URL_PARAM,
    LOGIN_URL_PARAM,
    MINIMAL_PASSWORD_LENGTH,
    MINIMAL_USERNAME_LENGTH,
    SIGN_UP_REQUEST_PATH
} from "./Globals";
import Cookies from "js-cookie";
import {
    passwordWarningMessage,
    usernameWarningMessage,
    handleDisableButton,
    containsOnlyLetters,
    fullNameWarningMessage, emailWarningMessage
} from "./Utils";
import {useNavigate} from "react-router-dom";


function SignUp(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [errorCode, setErrorCode] = useState(0);
    const navigate = useNavigate();

    function handleSubmit() {
        sendApiPostRequest(BASE_URL+SIGN_UP_REQUEST_PATH , {fullName,email,username,password,repeatPassword} , (response) =>{
            const data = response.data;
            if (data.success){
                // add sucessfull login pop up
                navigate(`/${LOGIN_URL_PARAM}`)
            }else {
                setErrorCode(data.errorCode)
                setTimeout(()=>{
                    setErrorCode(0)
                },5000)
            }
        })

    }









    return (
        <div>
            <div className={"avatar-container"}>
                <Avatar className={"avatar"}>
                    <LockOutlinedIcon />
                </Avatar>
            </div>
            <div>
                <Typography className={"login-title"} component="h1" variant="h5">
                    Sign Up Page
                </Typography>
            </div>
            <div>
                <div className={"form-container"}>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"name"} type={"text"} label={"Full Name"} value={fullName} onChange={e=>setFullName(e.target.value)} variant={"outlined"} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"email"} type={"email"} label={"E-Mail Address"} value={email} onChange={e=>setEmail(e.target.value)} variant={"outlined"} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"username"} type={"text"} label={"Username"} value={username} onChange={e=>setUsername(e.target.value)} variant={"outlined"} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"password"} type={"password"} label={"Password"} variant={"outlined"} value={password} onChange={e=>setPassword(e.target.value)} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    <div className={"form-field"}>
                        <FormControl variant={"standard"}>
                            <TextField id={"repeat-password"} type={"password"} label={"Confirm Password"} variant={"outlined"} value={repeatPassword} onChange={e=>setRepeatPassword(e.target.value)} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}/>
                        </FormControl>
                    </div>
                    {username.length > 0 && <FrontWarnings message = {usernameWarningMessage(username)}/>}
                    {password.length > 0 && <FrontWarnings message = {passwordWarningMessage(password)}/>}
                    {repeatPassword.length > 0 && <FrontWarnings message = {passwordWarningMessage(repeatPassword)}/>}
                    {fullName.length > 0 && <FrontWarnings message = {fullNameWarningMessage(fullName)}/>}
                    {email.length > 0 && <FrontWarnings message ={emailWarningMessage(email)} />}
                    <div className={"form-field"}>
                        {<Button type={"submit"} variant={"contained"} disabled={handleDisableButton("sign-up" , {username , password , repeatPassword , fullName})} onClick={handleSubmit}>Sign Up</Button>}
                    </div>
                    {errorCode !== 0 && <BackErrors errorCode = {errorCode}/>}
                </div>
            </div>
            </div>
    );
}
export default SignUp;