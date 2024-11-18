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

const AddCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const schema = yup.object().shape({
    descricao: yup.string().required("Campo obrigatório"),
    instituicao: yup.string().required("Campo obrigatório"),
    dataInicio: yup.date().required("Campo obrigatório"),
    dataConclusao: yup.date(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    mode: "onSubmit",
  });

  const newType = async (formData) => {
    try {
      const { data } = await api.post(`/cursos`, {
        descricao: formData.descricao,
        instituicao: formData.instituicao,
        dataInicio: formData.dataInicio,
        dataConclusao: formData.dataConclusao,
        pessoa: { id: id },
      });

      console.log(data);
      alert("Curso adicionado com sucesso!");
      navigate(`${location.pathname}`); // Redireciona após o cadastro
      return;
    } catch (e) {
      //TODO: HOUVE UM ERRO
      alert("Houve um erro...");
    }
  };

  return (
    <>
      <Logado />
      <Container>
        <Wrapper>
          <Title>Informações do Curso</Title>
          <form onSubmit={handleSubmit(newType)}>
            <Input
              type="text"
              placeholder="Nome do Curso*"
              name="descricao"
              control={control}
            />
            <span>{errors.descricao?.message}</span>
            <Input
              type="text"
              placeholder="Instituição*"
              name="instituicao"
              control={control}
            />
            <span>{errors.instituicao?.message}</span>
            <Row>
              <Text>Data de Início*:</Text>
              <Input type="date" name="dataInicio" control={control} />
              <span>{errors.dataInicio?.message}</span>
            </Row>
            <Row>
              <Text>Data de Conclusão:</Text>
              <Input type="date" name="dataConclusao" control={control} />
            </Row>
            <ButtonContainer>
              {/* Somente o botão "Confirmar" que envia o formulário */}
              <Button title="Confirmar" variant="primary" type="submit" />
            </ButtonContainer>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export { AddCourse };
