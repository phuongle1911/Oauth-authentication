import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");

  // check if any user has logged in by checking username data in cookie
  useEffect(() => {
    const cookies = document.cookie;
    // if no cookie present, meaning no user has logged in
    if (!cookies) {
      setUser(null);
    } else {
      // if cookie present and but does not include username data, meaning no user has logged in
      if (!cookies.includes("username",0)) {
        setUser(null)
      } else { // if cookie contain username data, meaning there is user has logged in, 
      // set user to username data captured in cookie
        const userCookie = cookies.substring(9).replace("%20"," ");

        if (userCookie.length) {
          setUser(userCookie)
        }
      }
    }
    },[]);

  // function for logging in with Google account
  const handleLogin = async () => {
    // redirect to backend API endpoint
    // from there, it will redirect to Google consent screen
    window.location.href = "http://localhost:3000/";
  }


  return (
    // user interface 
    <main style={{textAlign: "center"}}>
      <h1>OAuth authentication</h1>
      {/* if there is no user logged in before, display Log in button
      Otherwise, display welcome message */}
      {
        !user ?
        <button onClick={handleLogin}>
        Log in with Google
      </button>
      :
      <>
      <h2>Welcome {user}</h2>
      </>
      }

    </main>
  )
}

export default App
