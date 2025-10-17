import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import styles from "../../styles/NavBar.module.css";

const NavBar = () => {
  const [isLogin, setLogin] = useState(false);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(!!context?.user); // ✅ plus fiable : vérifie la présence d’un utilisateur
  }, [context]);

  const handleClick = () => {
    context?.logout();
    navigate("/auth");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-brand"]} onClick={() => navigate("/")}>
        Focus
      </div>
      <ul className={styles["navbar-menu"]}>
        {!isLogin ? (
          <Link to="/auth">Se connecter</Link>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button type="button" onClick={handleClick}>
              Log out
            </button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
