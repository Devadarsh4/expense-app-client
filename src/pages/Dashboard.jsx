function Dashboard({ user }) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Welcome, {user?.name}</h3>
      </div>
    );
  }
  
  export default Dashboard;
  