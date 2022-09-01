import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserByLogin } from '../Services/User.store';

const LoginTraitement = () => {

    const { email, password } = useParams();

    const { user } = useUserByLogin(email, password);
    const navigate = useNavigate()

    const handleTraitement = () => {
        console.log(user);
        if (user == null) { navigate('/connexion') }
        else { navigate('/') }
        console.log(user);
    }
    return (
        <div>
            {handleTraitement()}
        </div>
    );
};

export default LoginTraitement;