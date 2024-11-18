import React from "react";
import { ButtonContainer } from "./styles";

const Button = ({ title, variant = "primary", onClick, onReset }) => {
  // Função padrão para limpar os campos
  const handleClick = () => {
    if (onReset) {
      onReset(); // Chama a função de reset (limpar os campos)
    } else if (onClick) {
      onClick(); // Chama a função onClick se estiver definida
    }
  };

  return (
    <ButtonContainer variant={variant} onClick={handleClick}>
      {title}
    </ButtonContainer>
  );
};

export { Button };
