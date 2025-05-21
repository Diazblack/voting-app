import React, {useState} from "react";

function Vote({ candidates, user }) {
  const [selectedCandidateId, setSelectedCandidateId] = useState(user.vote_id || null);
  const [message, setMessage] = useState('');

  const handleVoteSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const selectedCandidate = formData.get('candidate');
  };

    const handleChange = (e) => {
      console.log(e)

      setSelectedCandidateId((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newCandidate = formData.get('newCandidate');

    console.log(newCandidate)

    const response = await fetch("http://localhost:3000/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  
            candidate: {
                name: newCandidate
            }
        }) 
    })

    const data = await response.json();

    if (response.ok) {
      setMessage("✅ Signed up successfully!");
    } else {
      setMessage(`❌ ${data.errors?.join(', ') || "Something went wrong"}`);
    }
  };


  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <header className="border-b flex justify-between items-center p-4">
        <h1 className="text-sm font-bold">VOTE.WEBSITE</h1>
        <span className="text-sm">signed in as {user.email}</span>
      </header>

      <main className="max-w-xl mx-auto mt-16 px-4">
        <h2 className="text-4xl font-semibold mb-10 leading-tight">Cast your vote today!</h2>

        <form onSubmit={handleVoteSubmit} className="space-y-6 mb-12">
          <div className="flex flex-col space-y-4">
            {candidates?.map((candidate, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="candidate"
                  onClick={handleChange}
                  checked={selectedCandidateId === candidate.id}
                  value={selectedCandidateId}
                  className="accent-black"
                  required
                />
                <span>{candidate.name}</span>
              </label>
            ))}
          </div>

          <button type="submit">
            Vote
          </button>
        </form>

        <hr className="mb-8" />
        {!selectedCandidateId  && (
            <form onSubmit={handleAddCandidate}>
            <label>Or, add a new candidate:</label>
            <input
                type="text"
                name="newCandidate"
                placeholder="Enter name..."
                required
            />
            <button type="submit">
                Vote
            </button>
            </form>
        )}
        {message && <p className="mt-4">{message}</p>}
      </main>
    </div>
  );
}


export default Vote;