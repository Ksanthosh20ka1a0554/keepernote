import React from "react";



function Login(){
    return(
        <div className="login-card">
            <h2>Login</h2>
            <input type="text" id="username" className="login"></input>
            <input type="password" id="pass" className="login"></input>
        </div>
    );
}

export default Login;