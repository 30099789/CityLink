import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServices } from "../services/announcementService";
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
                    <section className="announcement-list">
                        {services.map((service) => (
                            <AnnouncementCard key={service.id} service={service} />
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}
function AnnouncementCard({ service }) {
    return (
        <link to={`/announcements/${service.id}`} className="announcement-card">
            <div className="card-content">
                <h3 className="card-title">{service.title}</h3>
                <span className="text-gray-400">Read more</span>
            
                <p className="text-gray-500">{service.description}</p>
            </div>
        </link> 
    );
}