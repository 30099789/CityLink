import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServiceById, getServices } from "../services/announcementService";

export default function AnnouncementDetails() {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [other, setOther] = useState([]);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                setStatus("loading");
                const data = await getServiceById(id);
                if (!cancelled) {
                    setAnnouncement(data);
                    setStatus("loaded");
                }
            } catch (error) {
                if (!cancelled) {
                    setStatus("error");
                }
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, [id]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }
    if (status === "error") {
        return(
            <main className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5">Announcement Not Found</h1>
                <p className="text-gray-600 text-lg mb-5">Sorry, we couldn't find the announcement you're looking for. It may have been removed or the link is incorrect.</p>
                <Link to="/announcements" className="text-blue-500 hover:underline">Back to Announcements</Link>
            </main>
        )
    }
}
return (
    <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="announcement-details">
            <section className="flex items-center">
                <section>{announcement.imageUrl ? (
                    <img src={announcement.imageUrl} alt={announcement.title} className="w-24 h-24 rounded-full mr-4 object-cover" />
                ) : (
                    <section className="w-24 h-24 rounded-full mr-4 bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-2xl">?</span>
                    </section>
                )}
                </section>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5">{announcement.title}</h1>
            <p className="text-gray-600 text-lg mb-5">{announcement.description}</p>
            <Link to="/announcements" className="text-blue-500 hover:underline">Back to Announcements</Link>
            </section>
        </div>
    </main>
);
