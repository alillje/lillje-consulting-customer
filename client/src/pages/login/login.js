import { useState } from 'react';
import './login.css'

// Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const loginHandler = async (event) => {
        event.preventDefault();

        const user = {
          username: username,
          password: password
        }

        try {
          const response = await fetch("api/v1/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
    
          const json = await response.json();
          console.log(json);
        } catch (error) {
          console.log(error);
        }
      };
    

    return (
        <div className="loginContainer">
            <div className="loginTitle">
            <h2>Logga in</h2>
            </div>
            <div className="loginFormContainer">
    <Form className="loginForm" onSubmit={loginHandler}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Användarnamn</Form.Label>
    <Form.Control 
    type="username" 
    placeholder="Användarnamn" 
    value={username} 
    onChange={(event) => setUsername(event.target.value)} />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Lösenord</Form.Label>
    <Form.Control 
    type="password" 
    placeholder="Lösenord"
    value={password} 
    onChange={(event) => setPassword(event.target.value)} />
  </Form.Group>

  <Button variant="secondary" type="submit">
    Logga in
  </Button>
</Form>
</div>
</div>
    )
}

export default Login;