import stylesHeader from './Header.module.scss';
import PropTypes from "prop-types";
import {useAuth} from "@src/AuthProvider.jsx";


function Header({userBar}) {
    const {isAuthenticated, logout} = useAuth();
    return (<header className={stylesHeader.header}>
        <h1 className={stylesHeader.title}><a href={"/"}>Sklep Online</a></h1>
        {userBar ? <div className={stylesHeader.headerButtons}>
            {!isAuthenticated ? <><a href={"/login"}>
                <button>zaloguj</button>
            </a><a href={"/register"}>
                <button>zarejestruj</button>
            </a></> : <><a href={"/userPage"}>
                <button>moje konto</button>
            </a>
                <button className={stylesHeader.btn} onClick={logout}>wyloguj</button>
            </>}
        </div> : null}
    </header>);
}

Header.propTypes = {userBar: PropTypes.bool}

Header.defaultProps = {
    userBar: true,
}

export default Header;
