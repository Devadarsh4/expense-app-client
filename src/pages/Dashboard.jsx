function Dashboard({ user }) {
    return (
      <div className="container mt-4">
        <h2>Welcome {user.email}</h2>
      </div>
    );
  }
  
  export default Dashboard;
  