import { useTranslation } from "react-i18next"
import LanguageSelector from "../molecules/LanguageSelector"
import useUser from "../../hooks/useUser";


const Dashboard = () => {
  const {t} = useTranslation();
  const user = useUser();
  console.log(user.allUsers)
  return (
    <div>Dashboard
      <LanguageSelector />
      <h1>{t("greetings")}</h1>
    </div>
  )
}

export default Dashboard