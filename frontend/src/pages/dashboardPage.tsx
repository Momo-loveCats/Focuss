import { useContext } from 'react';
import { AuthContext } from '../context/authContext';


// On decrit ici la page du dashboard qui sera associe au context Authcontext
// Elle reste minimal pour l'instant
const DashboardPage = () => {
    const {user} = (useContext(AuthContext))!;
    return (
            <h1>Bievenue {user?.name}</h1>
    );
};

export default DashboardPage;