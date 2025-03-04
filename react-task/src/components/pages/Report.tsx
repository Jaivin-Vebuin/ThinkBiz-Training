import { useTranslation } from "react-i18next";

const Report = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("reportPageContent")}</h1>
    </div>
  );
};

export default Report;