import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import NavBar from '../composants/ui/navBar';
import Dashboard from '../composants/ui/dashbord';


// On decrit ici la page du dashboard qui sera associe au context Authcontext
// Elle reste minimal pour l'instant
const DashboardPage = () => {
    const {user} = (useContext(AuthContext))!;
    return (
            <>
            <NavBar/>
            <h1>Bievenue {user?.name}</h1>
            <Dashboard/>
            </>
    );
};

export default DashboardPage;