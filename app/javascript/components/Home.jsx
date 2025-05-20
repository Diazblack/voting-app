import React from "react";

const Home = ({ user }) => {
  return (
    <div className="min-h-screen bg-white text-black font-mono">
            <header className="border-b p-4">
        <h1 className="text-sm font-bold">VOTE.WEBSITE</h1>
      </header>
      <main className="max-w-md mx-auto mt-20 p-4">
        <h2>Sign in to vote</h2>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="myemail@example.com" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="................." />
          </div>
          <div>
            <label htmlFor="zip_code">Zip Code</label>
            <input id="zip_code" type="text" placeholder="54321" />
          </div>
          <button
            type="submit"
          >
            Sign In 
          </button>
        </form>
      </main>
    </div>
  );
};

export default Home;
