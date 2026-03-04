import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServices } from "../services/announcementDetailsService";
export default function Announcements() {
    const [services, setServices] = useState([]);
    useEffect(() => {
        const fetchServices = async () => {
            const servicesData = await getServices();
            setServices(servicesData);
        };
        fetchServices();
    }, []);
    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            <div className="announcements">
                <h1>Announcements</h1>
                {services.length === 0 ? (
                    <p>No announcements at the moment.</p>
                ) : (
                    <div className="announcement-list">
                        {services.map((service) => (
                            <AnnouncementCard key={service.id} service={service} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
function AnnouncementCard({ service }) {
    return (
        <div className="announcement-card bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-100 mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
            <p className="text-gray-500">{service.description}</p>
        </div>
    );
}