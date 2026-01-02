import React, { useEffect, useState } from "react";
import axios from "axios";

function OwnerDashboard() {
    const [requests, setRequests] = useState([]);
    const [status, setStatus] = useState("Pending");

    // Fetch all contact requests from API
    useEffect(() => {
        axios.get("http://localhost:8080/api/contact-requests/all")
            .then(response => {
                setRequests(response.data);
            })
            .catch(error => {
                console.error("Error fetching requests:", error);
            });
    }, []);

    // Separate requests into Pending & Resolved
    const pendingRequests = requests.filter(req => req.status === "Pending");
    const resolvedRequests = requests.filter(req => req.status === "Resolved");

    // Function to mark a request as resolved
    const markAsResolved = (id) => {
        axios.put(`http://localhost:8080/api/contact-requests/resolve/${id}`)
            .then(() => {
                setRequests(prevRequests => 
                    prevRequests.map(req => req.id === id ? { ...req, status: "Resolved" } : req)
                );
            })
            .catch(error => {
                console.error("Error updating status:", error);
            });
    };

    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-2xl font-bold mb-4">Owner Dashboard - Contact Requests</h1>
            <div className="flex justify-evenly py-3 cursor-pointer">
                {/* Pending Requests Tab */}
                <div>
                    <h2
                        className={`text-xl font-semibold mb-2 text-red-500 p-3 rounded-lg cursor-pointer 
                        ${status === 'Pending' ? 'bg-accent border-b-2 border-red-500' : 'bg-base-300'}`}
                        onClick={() => setStatus('Pending')}
                    >
                        Pending Requests
                    </h2>
                </div>

                {/* Resolved Requests Tab */}
                <div>
                    <h2
                        className={`text-xl font-semibold mb-2 text-green-700 p-3 rounded-lg cursor-pointer 
                        ${status === 'Resolved' ? 'bg-accent border-b-2 border-green-700' : 'bg-base-300'}`}
                        onClick={() => setStatus('Resolved')}
                    >
                        Resolved Requests
                    </h2>
                </div>
            </div>

            {/* 🔴 Pending Requests Section */}
            <div className="mb-8">
                {status === 'Pending' ? (
                    <RequestTable requests={pendingRequests} markAsResolved={markAsResolved} />
                ) : (
                    <RequestTable requests={resolvedRequests} />
                )}
            </div>
        </div>
    );
}

// 📌 Reusable Table Component
const RequestTable = ({ requests, markAsResolved }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Message</th>
                        <th className="py-2 px-4 border">Status</th>
                        {markAsResolved && <th className="py-2 px-4 border">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {requests.length > 0 ? (
                        requests.map((req) => (
                            <tr key={req.id} className="border">
                                <td className="py-2 px-4">{req.name}</td>
                                <td className="py-2 px-4">{req.email}</td>
                                <td className="py-2 px-4">{req.message}</td>
                                <td className={`py-2 px-4 ${req.status === "Pending" ? "text-red-500" : "text-green-500"}`}>
                                    {req.status}
                                </td>
                                {markAsResolved && req.status === "Pending" && (
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => markAsResolved(req.id)}
                                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                        >
                                            Mark as Resolved
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">No Requests available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OwnerDashboard;
