import React from 'react';
import AppLayout from '../../Layout/AppLayout';
import { useAuthContext } from "../../../Context/AuthContext";

const MembreActualite = () => {
    const { auth } = useAuthContext();
    return (
        <AppLayout>
        {auth && (
            <div>
            <h1>Membre Actu</h1>
        </div>
        )}
        </AppLayout>
    );
};

export default MembreActualite;