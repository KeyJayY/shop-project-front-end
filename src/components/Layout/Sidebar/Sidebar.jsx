import stylesSidebar from "./Sidebar.module.scss"
import {useState, useEffect} from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Sidebar(props) {
    const [categories, setCategories] = useState([])

    const fetchCategories = async () => {
        await axios.get("/api/getCategories").then((response) => {
            setCategories(response.data);
        })
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    return (
        <aside className={stylesSidebar.sidebar}>
            <ul className={stylesSidebar.sidebarList}>
                {categories.map((elem, index) => <li key={index} className={`${stylesSidebar.sidebarListItem} ${elem.category === props.chosenCategory ? stylesSidebar.clicked: ""}`}
                                                     onClick={props.onClick}>{elem.category}</li>)}
            </ul>
        </aside>
    )
}

Sidebar.propTypes = {
    onClick: PropTypes.func,
    chosenCategory: PropTypes.string,
}

export default Sidebar;