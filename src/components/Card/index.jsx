import React from "react";
import { CardContainer, CardHeader, CardBody } from "./styles";

const Card = ({ dados }) => {
  return (
    <CardContainer>
      <CardHeader>{dados.cargo}</CardHeader>
      <CardBody>
        {Object.entries(dados).map(([key, value]) => {
          if (key === "cargo") return null;
          const formatado =
            key.toLowerCase().includes("data") && !isNaN(Date.parse(value))
              ? new Date(value).toLocaleDateString()
              : value;
          return (
            <p key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
              {formatado}
            </p>
          );
        })}
      </CardBody>
    </CardContainer>
  );
};

export default Card;
