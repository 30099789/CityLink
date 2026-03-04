import { useEffect, useState } from "react";
import { getMyFeedback } from "../services/feedbackService";

export default function MyFeedback() {
    const [feedback, setFeedback] = useState([]);
    useEffect(() => {
        const fetchFeedback = async () => {
            const myFeedback = await getMyFeedback();
            setFeedback(myFeedback);
        };
        fetchFeedback();
    }, []);

    return (
        <div className="my-feedback">
            <h1>My Feedback</h1>
            {feedback.length === 0 ? (
                <p>You have no feedback yet.</p>
            ) : (
                <div className="feedback-list">
                    {feedback.map((item) => (
                        <FeedbackCard key={item.id} feedback={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
function FeedbackCard({ feedback }) {
    return (
        <div className="feedback-card bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-100 mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feedback.serviceName}</h3>
            <p className="text-gray-500">Rating: {feedback.rating} / 5</p>
            <p className="text-gray-500">Comment: {feedback.comment}</p>
        </div>
    );
}