import { useState } from "react"
import * as EmailValidator from 'email-validator'
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeClosed } from "@phosphor-icons/react"
import './Login.css'

export default function Login () {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [type, setType] = useState('password')
    const navigate = useNavigate()

    const handleChange1 = (event) => {
        setEmail(event.target.value)            
    }

    const handleChange2 = (event) => {
        setPassword(event.target.value)            
    }
    
    const handleClick = () => {
        setType(type === 'password' ? 'text' : 'password')
    }

    return (
        <>            
            <form action="">            
                <h1>Faça seu login</h1>
                <br />
                <input onChange={ handleChange1 } placeholder="Digite seu email" type="text" size="25"/>
                <br /><br /><br />
                <input onChange={ handleChange2 } placeholder="Digite sua senha" type={ type } size="25" />
                <br /><br />
                { type === 'password' ? <Eye onClick={ handleClick } size={32} color="white"/> : <EyeClosed onClick={ handleClick } size={32} color="white" />}
                <br /><br />
                <button type="submit" disabled={ !(EmailValidator.validate(email) && (password.length >= 8)) } onClick={ () => {navigate('/products')}} >Entrar</button>
                <br /><br />
                <Link to='/products'>Entrar como visitante</Link>
            </form>
        </>
    )
}