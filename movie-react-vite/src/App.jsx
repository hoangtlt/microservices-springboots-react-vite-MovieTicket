import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [movies, setMovies] = useState([]);
    const [bookings, setBookings] = useState([]);

    const [movieId, setMovieId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [seatNumber, setSeatNumber] = useState("");

    const MOVIE_API = "http://localhost:8081";
    const BOOKING_API = "http://localhost:8082";

    useEffect(() => {
        loadMovies();
        loadBookings();
    }, []);

    const loadMovies = async () => {
        const response = await axios.get(`${MOVIE_API}/api/movies`);
        setMovies(response.data);
    };

    const loadBookings = async () => {
        const response = await axios.get(`${BOOKING_API}/api/bookings`);
        setBookings(response.data);
    };

    const handleBooking = async (e) => {
        e.preventDefault();

        const bookingData = {
            movieId: Number(movieId),
            customerName,
            seatNumber
        };

        await axios.post(`${BOOKING_API}/api/bookings`, bookingData);

        setMovieId("");
        setCustomerName("");
        setSeatNumber("");

        loadBookings();
    };

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-8">
            <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-8 text-center text-3xl font-bold text-slate-800">
                    Mini Movie Ticket
                </h1>

                <h2 className="mb-4 text-xl font-semibold text-slate-700">
                    Danh sách phim
                </h2>

                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                        >
                            <h3 className="mb-2 text-lg font-bold text-slate-800">
                                {movie.name}
                            </h3>
                            <p className="text-slate-600">
                                Thể loại: {movie.genre}
                            </p>
                            <p className="mt-2 font-semibold text-red-600">
                                Giá: {movie.price.toLocaleString()}đ
                            </p>
                        </div>
                    ))}
                </div>

                <h2 className="mb-4 text-xl font-semibold text-slate-700">
                    Đặt vé
                </h2>

                <form
                    onSubmit={handleBooking}
                    className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-4"
                >
                    <select
                        value={movieId}
                        onChange={(e) => setMovieId(e.target.value)}
                        required
                        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    >
                        <option value="">Chọn phim</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Tên khách hàng"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />

                    <input
                        type="text"
                        placeholder="Số ghế"
                        value={seatNumber}
                        onChange={(e) => setSeatNumber(e.target.value)}
                        required
                        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                    />

                    <button
                        type="submit"
                        className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
                    >
                        Đặt vé
                    </button>
                </form>

                <h2 className="mb-4 text-xl font-semibold text-slate-700">
                    Vé đã đặt
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse overflow-hidden rounded-xl">
                        <thead>
                            <tr className="bg-slate-900 text-white">
                                <th className="border border-slate-300 p-3">ID</th>
                                <th className="border border-slate-300 p-3">Movie ID</th>
                                <th className="border border-slate-300 p-3">Khách hàng</th>
                                <th className="border border-slate-300 p-3">Ghế</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="text-center hover:bg-slate-50">
                                    <td className="border border-slate-300 p-3">
                                        {booking.id}
                                    </td>
                                    <td className="border border-slate-300 p-3">
                                        {booking.movieId}
                                    </td>
                                    <td className="border border-slate-300 p-3">
                                        {booking.customerName}
                                    </td>
                                    <td className="border border-slate-300 p-3">
                                        {booking.seatNumber}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;