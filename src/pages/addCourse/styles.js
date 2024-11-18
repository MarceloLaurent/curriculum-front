import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 40px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  max-width: 300px;
  max-height: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const Title = styled.h2`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  max-width: 100%;
  margin-bottom: 20px;
  line-height: 44px;

  color: #000000;
`;

export const Text = styled.p`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  max-width: 100%;
  line-height: 12px;
  margin-top: 8px;
  margin-left: 10px;
  color: #808080;
  white-space: nowrap;
`;