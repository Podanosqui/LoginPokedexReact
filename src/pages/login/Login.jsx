import React from 'react';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const verificaLogin = () => {
        if (username === 'admin' && password === 'admin') {
            setError('');
            console.log("Entrou!");
            navigate('/home');
        } else {
            setError('Usuário ou senha inválidos.');
            console.log("Falhou!")
        }
    }

    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div>
                    <div className="espacamento flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Usuário</label>
                        <InputText id="username" type="text" className="w-12rem" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="espacamento flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Senha</label>
                        <InputText id="password" type="password" className="w-12rem" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button onClick={verificaLogin} label="Login" icon="pi pi-user" className="espacamento w-10rem mx-auto"></Button>
                </div>
            </div>
        </div>
    )
}

export default Login;