import stylesHeader from './Header.module.scss';
import PropTypes from "prop-types";
import {useAuth} from "./AuthProvider.jsx";


function Header({userBar}) {
    const {isAuthenticated, logout} = useAuth();
    return (
        <header className={stylesHeader.header}>
            <h1 className={stylesHeader.title}>My App</h1>
            {userBar ?
                <div className={stylesHeader.userMenu}>
                    {!isAuthenticated ? <><div><a href={"/login"}>login</a></div><div><a href={"/register"}>register</a></div></> : <><div><a href={"/userPage"}>my
                    account</a></div><div className={stylesHeader.btn} onClick={logout}>logout</div></>}
                </div> : null}
        </header>
    );
}

Header.propTypes = {userBar: PropTypes.bool}

Header.defaultProps = {
    userBar: true,
}

export default Header;
