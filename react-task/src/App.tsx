import { useTranslation } from "react-i18next";
import LanguageSelector from "./components/organisms/LanguageSelector";

function App() {
  const { t } = useTranslation();
  return (
    <>
      <div className="App class">
        <LanguageSelector />
        <h1> {t("greetings")} </h1>
      </div>
    </>
  );
}

export default App;
