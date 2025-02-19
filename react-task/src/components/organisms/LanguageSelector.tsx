import { useTranslation } from "react-i18next";
import Select from "../atoms/Select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { languages } from "../../utils/constants/app.constants";
import { setLanguage } from "../../redux/features/slices/languageSlice";


const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeTranslation = (code: string) => {
    i18n.changeLanguage(code);
    dispatch(setLanguage(code));
  };


  const currentLanguage = useSelector(
    (state: RootState) => state.lang.language
  );


  return (
    <>
      <div>
        <div>
          <Select
            options={languages}
            handleOnChange={changeTranslation}
            value={currentLanguage}
          />
        </div>
      </div>
    </>
  );
};

export default LanguageSelector;
