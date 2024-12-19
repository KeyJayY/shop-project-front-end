import PropTypes from "prop-types";
import stylesComment from "./Comment.module.scss"
import * as propTypes from "prop-types";

function Comment(props) {
    return <div className={stylesComment.comment}>
        <span className={stylesComment.author}>{props.author + ":"}</span>
        {props.content}
        <span className={stylesComment.starRating}>{[1, 2, 3, 4, 5].map((star) => props.grade >= star ? "★" : "☆")}</span>
    </div>;
}

Comment.propTypes = {
    content: PropTypes.string,
    author: PropTypes.string,
    grade: propTypes.number,
}

export default Comment;