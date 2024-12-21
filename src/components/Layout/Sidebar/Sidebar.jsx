import stylesSidebar from "./Sidebar.module.scss"

function Sidebar() {
    return (
        <aside className={stylesSidebar.sidebar}>
            <ul className={stylesSidebar.sidebarList}>
                <li className={stylesSidebar.sidebarListItem}>dlugi text</li>
                <li className={stylesSidebar.sidebarListItem}>telefony</li>
                <li className={stylesSidebar.sidebarListItem}>komputery</li>
                <li className={stylesSidebar.sidebarListItem}>4</li>
                <li className={stylesSidebar.sidebarListItem}>5</li>
            </ul>
        </aside>
    )
}

export default Sidebar;