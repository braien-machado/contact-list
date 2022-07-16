import styled from 'styled-components';

const Button = styled.button`
  background-color: #844ee7;
  border-radius: 5px;
  border: 1px solid #844ee7;
  color: white;
  font-weight: bold;
  padding: 0 10px;

  &:hover {
    background-color: #7443ce;
    border-color: #7443ce;
    cursor: pointer;
    transition-duration: 300ms;
  }

  &:disabled {
    background-color: #acacac;
    border-color: #acacac;
    cursor: default;
  }
`;

export default Button;
