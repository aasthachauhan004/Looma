import { colors } from "../../styles/colors";

const DashboardLayout = ({ children, sidebar }) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: colors.bg,
      }}
    >
      {/* Sidebar */}
      {sidebar}

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: "260px",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default DashboardLayout;
