import stylesSidebar from "./Sidebar.module.scss"

function Sidebar() {
    return (
        <nav className={stylesSidebar.categoryNavigation}>
            <ul>
                <li className={stylesSidebar.navItem}>dlugi text</li>
                <li className={stylesSidebar.navItem}>telefony</li>
                <li className={stylesSidebar.navItem}>komputery</li>
                <li className={stylesSidebar.navItem}>4</li>
                <li className={stylesSidebar.navItem}>5</li>
            </ul>
        </nav>
    )
}

export default Sidebar;