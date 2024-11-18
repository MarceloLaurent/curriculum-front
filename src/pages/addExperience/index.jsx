import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

import { Container, Wrapper, Title, Row, Text } from "./styles";
import { Logado } from "../../components/Logado";
import { ButtonContainer } from "../signup/styles";

const AddExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const schema = yup.object().shape({
    cargo: yup.string().required("Campo obrigatório"),

    empresa: yup.string().required("Campo obrigatório"),

    dataInicio: yup.date().required("Campo obrigatório"),

    dataTermino: yup.date(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const newType = async (formData) => {
    try {
      const { data } = await api.post(`/experiencias`, {
        cargo: formData.cargo,
        empresa: formData.empresa,
        dataInicio: formData.dataInicio,
        dataTermino: formData.dataTermino,
        pessoa: { id: id },
      });

      console.log(data);
      alert("Experiencia adicionada com sucesso!");
      navigate(`${location.pathname}`)
      return;
    } catch (e) {
      //TODO: HOUVE UM ERRO
      alert("Houve um erro...");
    }
  };

  const handleReset = () => {
    reset({
      cargo: "",
      empresa: "",
      dataInicio: "",
      dataTermino: "",
    }); // Resetando os valores dos campos
  };

  return (
    <>
      <Logado />
      <Container>
        <Wrapper>
          <Title>Detalhes da Experiência</Title>
          <form onSubmit={handleSubmit(newType)}>
            <Input
              type="text"
              placeholder="Cargo*"
              name="cargo"
              control={control}
            />
            <span>{errors.cargo?.message}</span>
            <Input
              type="text"
              placeholder="Empresa*"
              name="empresa"
              control={control}
            />
            <span>{errors.empresa?.message}</span>
            <Row>
              <Text>Data de Início*:</Text>
              <Input type="date" name="dataInicio" control={control} />
              <span>{errors.dataInicio?.message}</span>
            </Row>
            <Row>
              <Text>Data de Término:</Text>
              <Input type="date" name="dataTermino" control={control} />
            </Row>
            <ButtonContainer>
              <Button title="Confirmar" variant="primary" type="submit" />
              <Button
                title="Cancelar"
                variant="secondary"
                type="button"
                onClick={handleReset}
              />
            </ButtonContainer>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export { AddExperience };
