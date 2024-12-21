import stylesHeader from './Header.module.scss';
import PropTypes from "prop-types";
import {useAuth} from "@src/AuthProvider.jsx";


function Header({userBar}) {
    const {isAuthenticated, logout} = useAuth();
    return (
        <header className={stylesHeader.header}>
            <h1 className={stylesHeader.title}><a href={"/"}>My App</a></h1>
            {userBar ?
                <div className={stylesHeader.headerButtons}>
                    {!isAuthenticated ? <><button><a href={"/login"}>login</a></button><button><a href={"/register"}>register</a></button></> : <><button><a href={"/userPage"}>my
                    account</a></button><button className={stylesHeader.btn} onClick={logout}>logout</button></>}
                </div> : null}
        </header>
    );
}

Header.propTypes = {userBar: PropTypes.bool}

Header.defaultProps = {
    userBar: true,
}

export default Header;
