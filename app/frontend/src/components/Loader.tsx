import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content:center;
  position: fixed;
  width: 100vw;
  
  .loader-bg {
    background-color: white;
    height: 100vh;
    opacity: 0.5;
    position: absolute;
    width: 100vw;
  }

  .loader {
    -webkit-animation: spin 1s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
    border-radius: 50%;
    border: 16px solid #e6e6e6;
    border-top: 16px solid #844ee7;
    height: 120px;
    width: 120px;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function LoaderComponent() {
  return (
    <LoaderContainer>
      <div className="loader-bg" />
      <div className="loader" />
    </LoaderContainer>
  );
}
