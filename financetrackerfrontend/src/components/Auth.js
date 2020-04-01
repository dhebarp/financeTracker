import React, { useState, useEffect } from 'react';

export const Auth = props => {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [profile, setProfile] = useState({});
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        //   const queryUserStatus = (headers, url) => { 
        fetch('/mortgage', { credentials: "same-origin" })
            .then(async data => {
                if (data.status === 200) {
                    setStatus(true);

                    //get the user information
                    fetch('/auth/checkUser',
                        {
                            credentials: "same-origin",
                        })
                        .then(async userData => {
                            const profile = await userData.json();
                            setProfile(profile);
                            setStatus(true);
                            setErrors([])
                        })
                }
            })
    }, []);

    const queryUserStatus = (url) => {
        fetch(url,
            {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user,
                    password: password
                })
            })
            .then(async data => {
                if (data.status === 201) {
                    const profile = await data.json();
                    console.log(profile);
                    setProfile(profile);
                    setStatus(true);
                    setErrors([])
                    props.history.push('/dashboard');
                    window.location.reload();
                }

                if (data.status > 299) {
                    console.log("user not found");
                    if (user !== "")
                        setErrors([data.status + " user not found"])
                }
            })
            .catch(e => {
                console.log(e.status);
            });
    };

    const logout = () => {
        fetch('/auth/logout',
            {
                credentials: "same-origin",
            })
            .then(async response => {
                if (response.status === 201) {
                    setStatus(false);
                    setUser("")
                    setProfile({});
                    setErrors([])
                }
                else {
                    console.log("error logging out");
                    if (user !== "")
                        setErrors(["Error loggin out"])
                }
            })
            .catch(e => {
                console.log(e.status);
            });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('you clicked submit');

        queryUserStatus('/auth/login');
    };

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
          <input type="text" value={user} onChange={(event) => setUser(event.target.value)} />
                </label>

                <label>
                    password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    };

    const renderProfile = () => {
        return (
            <div>
                <p>Username: {profile.username}</p>
                <p>First Name: {profile.firstName}</p>
                <p>Last Name: {profile.lastName}</p>
                <p>Email: {profile.email}</p>
                <button onClick={logout} >Logout</button>
            </div>
        )
    };

    return (
        <div style={{ "paddingTop": "20px" }}>

            {!status && renderForm()}
            {status && renderProfile()}

            {errors.map((e, index) => <p key={index}>{e}</p>)}
        </div>
    )
}

