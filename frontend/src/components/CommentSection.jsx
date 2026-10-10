import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/comment-section.css'

const CommentSection = ({ foodId, onClose, onCommentAdded }) => {
    const [comments, setComments] = useState([])
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/comment/${foodId}`)
            setComments(res.data.comments)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [foodId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!text.trim()) return
        setLoading(true)
        try {
            const res = await axios.post(
                "http://localhost:3000/api/comment",
                { foodId, text },
                { withCredentials: true }
            )
            setComments([res.data.comment, ...comments])
            setText('')
            if (onCommentAdded) onCommentAdded()
        } catch (err) {
            console.log(err)
            alert("Login karo pehle comment karne ke liye")
        }
        setLoading(false)
    }

    return (
        <div className="comment-overlay" onClick={onClose}>
            <div className="comment-sheet" onClick={(e) => e.stopPropagation()}>
                <div className="comment-header">
                    <h3>Comments ({comments.length})</h3>
                    <button onClick={onClose} className="comment-close">✕</button>
                </div>

                <div className="comment-list">
                    {comments.length === 0 && (
                        <p className="comment-empty">No comments yet. Be the first!</p>
                    )}
                    {comments.map((c) => (
                        <div key={c._id} className="comment-item">
                            <div className="comment-avatar">
                                {(c.user?.fullName || c.user?.name || 'U')[0].toUpperCase()}
                            </div>
                            <div className="comment-body">
                                <div className="comment-author">
                                    {c.user?.fullName || c.user?.name || 'User'}
                                </div>
                                <div className="comment-text">{c.text}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="comment-form">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={500}
                    />
                    <button type="submit" disabled={loading || !text.trim()}>
                        {loading ? '...' : 'Post'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CommentSection