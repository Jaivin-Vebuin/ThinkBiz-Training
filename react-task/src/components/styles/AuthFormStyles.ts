import styled from 'styled-components';

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 450px;
  padding: 30px;
  background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
  border-radius: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

export const TitleStyle = styled.h1`
  margin-bottom: 30px;
  color: #3a3f58;
  font-size: 28px;
  text-align: center;
`;

export const InputFieldStyle = styled.div`
  margin-bottom: 20px;
  width: 100%;

  input, select {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background-color: #dbeafe;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 14px;

    &:focus {
      outline: none;
      box-shadow: 0 0 8px rgba(164, 202, 254, 0.8);
    }
  }
`;

export const ButtonStyle = styled.div`
  width: 100%;
  text-align: center;

  button {
    padding: 10px 24px;
    color: white;
    background-color: #4a90e2;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;

    &:hover {
      background-color: #3a7bd5;
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      background-color: #bbb;
      cursor: not-allowed;
    }
  }
`;

export const LanguageSelectorWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;

  select {
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    background-color: #dbeafe;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
      outline: none;
      box-shadow: 0 0 8px rgba(164, 202, 254, 0.8);
    }
  }
`;

export const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
`;

export const RegisterWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
`;
