import { useTranslation } from "react-i18next";
import useUser from "../../hooks/useUser";

const Dashboard = () => {
  const user = useUser();
  const {t} = useTranslation();
  return (
    <div>
      <h1>{t("dashboardContent")}</h1>
      <h1>{t("greetings")} {user.currentUser?.name}</h1>
    </div>
  );
};

export default Dashboard;
