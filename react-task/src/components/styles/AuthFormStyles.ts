import styled from 'styled-components';

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7; /* Subtle pastel background color */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const TitleStyle = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

export const InputFieldStyle = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

export const ButtonStyle = styled.div`
  width: 100%;
  text-align: center;

  button {
    padding: 10px 20px;
    color: white;
    background-color: #4caf50; /* Subtle pastel color */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #45a049;
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      background-color: #aaa;
      cursor: not-allowed;
    }
  }
`;
