import styled from "styled-components";

export const CardContainer = styled.div`
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 16px 0;
`;

export const CardHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #156082;
  margin-bottom: 8px;
`;

export const CardBody = styled.div`
  font-size: 14px;
  color: #333;

  p {
    margin: 4px 0;
    strong {
      color: #555;
    }
  }
`;
