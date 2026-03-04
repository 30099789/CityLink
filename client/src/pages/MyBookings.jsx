import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyBookings } from "../services/bookingService";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
            const myBookings = await getMyBookings();
            setBookings(myBookings);
        };
        fetchBookings();
    }, []);

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            <div className="my-bookings">
                <h1>My Bookings</h1>
                {bookings.length === 0 ? (
                    <p>You have no bookings yet.</p>
                ) : (
                    <div className="booking-list">
                        {bookings.map((booking) => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
function BookingCard({ booking }) {
    return (
        <div className="booking-card bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-100 mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{booking.serviceName}</h3>
            <p className="text-gray-500">Date: {new Date(booking.date).toLocaleDateString()}</p>
            <p className="text-gray-500">Status: {booking.status}</p>
        </div>
    );
}