import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

function CommentsBox(props) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            fetch(`/api/opinions/${props.id}`).then(res => res.json()).then((data) => {
                setComments(data)
            })
        }
        fetchData();
    }, [])

    return <div>
        {comments.map((elem) => (
            <Comment key={elem.id} content={elem.content} author={elem.author}/>
        ))}
    </div>

}

CommentsBox.propTypes = {
    id: PropTypes.number.isRequired,
}

export default CommentsBox;