import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Comment from "./components/Comment";
import stylesCommentsBox from "./CommentsBox.module.scss"
import axios from "axios";
import {useAlert} from "@src/AlertContext.jsx";

function CommentsBox(props) {
    const [comments, setComments] = useState([])
    const [opinion, setOpinion] = useState("")
    const [grade, setGrade] = useState(5)
    const {showAlert} = useAlert();

    const fetchData = async () => {
        fetch(`/api/opinions/${props.id}`).then(res => res.json()).then((data) => {
            setComments(data)
        })
    }

    const sendOpinion = async () => {
        const token = localStorage.getItem("token");
        try{
            const response = await axios.post("/api/user/opinion/add", {"productId": props.id, "opinion": opinion, "grade": grade}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if(response.status == 200)
                await fetchData();
        } catch(error)
            {
                console.log(error)

                if (error.response.status == 401) {
                    showAlert("nie jesteś zalogowany", "error")
                } else (
                    showAlert("każdy użytkowik może dodać tylko jedną opinię", "error")
                )
            }

    }

    useEffect(() => {

        fetchData();
    }, [])

    return <>
        <div className={stylesCommentsBox.commentsSection}>
            {comments.map((elem) => (
                <Comment key={elem.id} content={elem.content} author={elem.author} grade={elem.grade}/>))}
        </div>
        <div className={stylesCommentsBox.addComment}>
            <textarea name="opinion" placeholder={"dodaj swoją opinię..."} onChange={(e) => {
                setOpinion(e.target.value)
            }}>{opinion}</textarea>
            <div className={stylesCommentsBox.starRating}>
                {[1, 2, 3, 4, 5].map((star) => {
                    return <span key={star} className={6-star <= grade ? stylesCommentsBox.filledStar : null}
                                 onClick={() => setGrade(6-star)}>★</span>
                })}
            </div>
            <button onClick={sendOpinion}>prześlij</button>
        </div>
    </>

}

CommentsBox.propTypes = {
    id: PropTypes.number.isRequired,
}

export default CommentsBox;