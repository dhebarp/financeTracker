import React, { useState } from 'react';

export function Signup() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const signupform = () => {
        fetch('/public/newuser',
            {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user,
                    password: password,
                    email: email,
                    firstName: firstName,
                    lastName: lastName
                })
            })
            .then(async userData => {
                const profile = await userData.json();
                console.log(profile);
            })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('you clicked submit');
  
        signupform();
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Email</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email" onSubmit={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Password</label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password" onSubmit={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="form-group col-md-4">
                        <label>User Name</label>
                        <input type="text" class="form-control" id="userName" placeholder="JohnSmith123" onSubmit={(event) => setUser(event.target.value)} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input type="text" class="form-control" id="firstName" placeholder="First Name" onSubmit={(event) => setFirstName(event.target.value)} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input type="text" class="form-control" id="lastName" placeholder="Last Name" onSubmit={(event) => setLastName(event.target.value)} />
                    </div>
                </div>
                {/* <div class="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div class="form-group">
    <label for="inputAddress2">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
  </div> */}
                {/* <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity"/>
    </div> */}
                {/* <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div> */}
                {/* <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip"/>
    </div> */}
                {/* </div> */}
                <button type="submit" class="btn btn-primary" onClick={'/'}>Create</button>
            </form>
        </div>
    )
}