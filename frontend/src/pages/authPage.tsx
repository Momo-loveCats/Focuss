import useLogin from "../hooks/loginHook";
import styles from "./../styles/AuthPage.module.css"

// La page d'authentification est la page que l'utilisateur standart a acces 
// elle n'est pas tres complexe elle contient un formulaire unique . 
// Elle a un etat simple isLogin = true default ou si il est en mode login ou connection


const AuthPage = () => {
    // etat du composant
    const [isLogin, setLogin, handleLogin] = useLogin();

    return (
        <form onSubmit={handleLogin} className={styles.form}>
            <div className="logo">
                <h1>Focuss</h1>
                <p>Gestion de tache collaborative</p>
            </div>
            {!isLogin && (<div>
                <label htmlFor="name" >Nom complet</label>
                <input type="text" name="name" id="name" required/>
            </div>)}
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required/>
            </div>
            <div>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" required/>
            </div>

            <button>{!isLogin ? "Creer mon compte" : "Me connecter"}</button>

            <div className="info">
                {!isLogin ? (<>Deja un compte? <a href='#' onClick={() => setLogin(true)}>Se connecter</a> </>):
                <>Pas de compte? <a href='#' onClick={() => setLogin(false)}>S'inscrire</a> </>}
            </div>
        </form>
    );
};

export default AuthPage