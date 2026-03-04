import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServices } from "../services/service";

export default function ServiceBooking() {
    const [services, setServices] = useState([]);
    useEffect(() => {
        const fetchServices = async () => {
            const servicesData = await getServices();
            setServices(servicesData);
        };
        fetchServices();
    }, []);
    return (
        <main>
            <h1>Service Booking</h1>
            {services.length === 0 ? (
                <p>No services available for booking.</p>
            ) : (
                <div className="service-list">
                    {services.map((service) => (
                        <Card key={service.id} service={service} />
                    ))}
                </div>
            )}
        </main>
    );
}
function Card({ service }) {
    return (
        <div className="service-card bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-100 mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
            <p className="text-gray-500">{service.description}</p>  
        </div>
    );
}