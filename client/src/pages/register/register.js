import { useState } from 'react';
import './register.css'

// Bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const loginHandler = async (event) => {
        event.preventDefault();
        console.log(username, password, email)

        const user = {
          username: username,
          password: password,
          email: email
        }
        try {

            const response = await fetch('api/v1/register', {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const json = await response.json();
            console.log(json)
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div className="registerContainer">
            <div className="registerTitle">
            <h2>Registrera användare</h2>
            </div>
            <div className="registerFormContainer">
    <Form className="registerForm" onSubmit={loginHandler}>

    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Ange Användarnamn</Form.Label>
    <Form.Control 
    type="email" 
    placeholder="Email" 
    value={email} 
    onChange={(event) => setEmail(event.target.value)} />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicUsername">
    <Form.Label>Ange Användarnamn</Form.Label>
    <Form.Control 
    type="username" 
    placeholder="Användarnamn" 
    value={username} 
    onChange={(event) => setUsername(event.target.value)} />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Ange Lösenord</Form.Label>
    <Form.Control 
    type="password" 
    placeholder="Lösenord"
    value={password} 
    onChange={(event) => setPassword(event.target.value)} />
  </Form.Group>

  <Button variant="secondary" type="submit">
    Registrera användare
  </Button>
</Form>
</div>
</div>
    )
}

export default Register;