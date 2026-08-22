import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState } from "react";
import LoadingIndicator from "./LoadingIndicator";
import api from "../api";
import "../styles/Form.css";

function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    
    const name = method === "login" ? "Login" : "Register";
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await api.post(route, { username, password });
            if(method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate("/");
            }
            else {
                navigate("/login");
            }
        }
        catch(error) {
            alert(error);
        }  
        finally {
            setLoading(false);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input 
                className="form-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input 
                className="form-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            {loading && <LoadingIndicator />}
            <button className="form-button">{name}</button>
        </form>
    )
}

export default Form;