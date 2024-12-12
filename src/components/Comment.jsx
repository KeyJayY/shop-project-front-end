import PropTypes from "prop-types";

function Comment(props) {
    return <div>
        <div>{props.author}</div>
        <div>{props.content}</div>
    </div>;
}

Comment.propTypes = {
    content: PropTypes.string,
    author: PropTypes.string,
}

export default Comment;