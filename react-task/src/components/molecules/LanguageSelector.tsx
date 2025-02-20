import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Select from "../atoms/Select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { languages } from "../../utils/constants/app.constants";
import { setLanguage } from "../../redux/features/slices/languages/languageSlice";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeTranslation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
    dispatch(setLanguage(selectedLanguage));
  };

  const currentLanguage = useSelector(
    (state: RootState) => state.lang.language
  );

  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  return (
    <>
      <div>
        <div>
          <Select
            options={languages}
            name="selectLanguage"
            handleOnChange={changeTranslation}
            value={currentLanguage}
          />
        </div>
      </div>
    </>
  );
};

export default LanguageSelector;
