import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context"
import { useContext, type JSX } from "react";
// on Creer un composant pour verifier que l'user est bien connecter 
const ProtectedRoute = ({children} : {children : JSX.Element}) => {
    const {user} = useContext(AuthContext)!;
    console.log(user);
    return user ? children : <Navigate to='/auth' />;
}

export default ProtectedRoute;