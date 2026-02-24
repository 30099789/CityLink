export default function Login() {
  return (
    <main style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h1>Sign In</h1>
      <p>Please sign in to access your community account.</p>

      <form style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="email"
          placeholder="Email"
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#1e3a5f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Sign In
        </button>
      </form>
    </main>
  );
}