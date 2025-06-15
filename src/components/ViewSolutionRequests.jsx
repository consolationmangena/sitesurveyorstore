
import { useState, useEffect } from "react";

export default function ViewSolutionRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Load requests from localStorage on mount
    try {
      const stored = localStorage.getItem("solutionRequests");
      setRequests(stored ? JSON.parse(stored) : []);
    } catch {
      setRequests([]);
    }
  }, []);

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(requests, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "solutionRequests.json");
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    document.body.removeChild(dlAnchor);
  };

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white border border-slate-200 rounded-2xl shadow px-6 py-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">Solution Requests ({requests.length})</h2>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          disabled={requests.length === 0}
        >
          Download as JSON
        </button>
      </div>
      {requests.length === 0 ? (
        <p className="text-slate-500">No solution requests found.</p>
      ) : (
        <ul className="divide-y divide-slate-200">
          {requests.map((req, idx) => (
            <li key={idx} className="py-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700">{req.email || "Anonymous"}</span>
                <span className="text-xs text-slate-400">{req.submitted_at ? new Date(req.submitted_at).toLocaleString() : ""}</span>
              </div>
              <p className="text-slate-800 mt-1 whitespace-pre-wrap">{req.problem}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
