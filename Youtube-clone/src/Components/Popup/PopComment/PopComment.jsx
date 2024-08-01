import './PopComment.css'
 function PopComment({comment, onClose}){

    return (
        <div className="model-overlay">
            <div className="model-content">
                <button onClick={onClose} className="model-close">x</button>
                <h3>Comments</h3>

                <ul>
                    {
                        comment.length>0?( comment.map(c=>
                        (
                               ( <li key={c._id}>{c.commentBody}</li>) 
                            )
                            )):(<><li>No comments Available</li></>)
                       
                    }
                </ul>
            </div>
        </div>
    )

}

export default PopComment