import React, { useState, useEffect} from 'react';

export function Auth() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [profile, setProfile] = useState({});
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
//   const queryUserStatus = (headers, url) => { 
  fetch('/mortgage', {credentials: "same-origin"})
  .then(async data => {
      if(data.status === 201)
      {
          console.log("Mortgage route active!");
          setStatus(false);

          //get the user information
          fetch('/auth/login',
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
              .then(async userData => {
                      const profile = await userData.json();
                      console.log(profile);
                      setProfile(profile);
                      setStatus(true);
                      setErrors([])
              })
      }
  })
},);

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
          if(data.status === 201)
          {
              const profile = await data.json();
              console.log(profile);
              setProfile(profile);
              setStatus(true);
              setErrors([])
          }

          if(data.status > 299)
          {
              console.log("user not found");
              if(user !== "")
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
      .then(async data => {
          if(data.status === 200)
          {
              setStatus(false);
              setProfile({});
              setErrors([])
          }
          else
          {
              console.log("error logging out");
            //   if(user !== "")
            //       setErrors(["Error loggin out"])
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

const renderWelcome = () => {
  return (
      <div>
          <p>You are logged in!, welcome {profile.profile.userName}</p>

          <button onClick={logout} >Logout</button>
      </div>
  )
};

return (
  <div style={{"paddingTop": "20px"}}>

      {!status && renderForm()}
      {status && renderWelcome()}

      {  errors.map((e, index) => <p key={index}>{e}</p>)  }
  </div>
)
}

