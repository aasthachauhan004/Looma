import { colors } from "../styles/colors";

function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.text,
      }}
    >
      <h1>Dashboard Page</h1>
    </div>
  );
}

export default Dashboard;
