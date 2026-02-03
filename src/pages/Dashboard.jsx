function Dashboard({ user }) {
  return (
    <div className="container mt-5 text-center">
      <h2>Welcome {user?.email}</h2>
    </div>
  );
}

export default Dashboard;
