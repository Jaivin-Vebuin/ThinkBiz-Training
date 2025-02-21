import useUser from "../../hooks/useUser";

const Dashboard = () => {
  const user = useUser();

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>welcome {user.currentUser?.name}</h1>
    </div>
  );
};

export default Dashboard;
