import React, {useState} from "react";

const Home = ({ user }) => {
  const [formData, setFormData] = useState(user);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          email: formData.email,
          password_digest: formData.password_digest,
          zip_code: formData.zip_code
        }
      })
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("✅ Signed up successfully!");
      window.location.href = "/candidates";
    } else {
      setMessage(`❌ ${data.errors?.join(', ') || "Something went wrong"}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <header className="border-b p-4">
        <h1 className="text-sm font-bold">VOTE.WEBSITE</h1>
      </header>
      <main className="max-w-md mx-auto mt-20 p-4">
        <h2>Sign in to vote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="myemail@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password_digest"
              type="password"
              placeholder="................."
              value={formData.password_digest}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="zip_code">Zip Code</label>
            <input
              id="zip_code"
              type="text"
              placeholder="54321"
              value={formData.zip_code}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">
            Sign In
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </main>
    </div>
  );
};

export default Home;
