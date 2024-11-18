import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  MdEmail,
  MdCalendarMonth,
  MdLock,
  MdPermIdentity,
  MdPerson,
  MdPhoneAndroid,
} from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

import {
  Container,
  Wrapper,
  Title,
  ButtonContainer,
  Row,
  Text,
  UploadButton,
} from "./styles";

const SignUp = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const schema = yup.object().shape({
    nome: yup.string().required("Campo obrigatório"),
    contato: yup.string().required("Campo obrigatório"),
    dataNascimento: yup.date().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório"),
    senha: yup.string().required("Campo obrigatório"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const newLogUser = async (formData) => {
    try {
      const dataForm = new FormData();
      dataForm.append("nome", formData.nome);
      dataForm.append("contato", formData.contato);
      dataForm.append("endereco", formData.endereco);
      dataForm.append("dataNascimento", formData.dataNascimento);
      dataForm.append("github", formData.github);
      dataForm.append("linkedin", formData.linkedin);
      dataForm.append("email", formData.email);
      dataForm.append("senha", formData.senha);

      if (image) {
        dataForm.append("foto", image);
      }

      // Debug: Verifique os dados antes de enviar
      dataForm.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await api.post(`/pessoas`, dataForm); // Sem headers adicionais
      alert("Cadastro realizado! Faça o login para continuar");
      navigate("/login");
      console.log(data);
    } catch (e) {
      console.error("Erro ao cadastrar o usuário:", e);
      alert("Houve um erro ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <Title>Faça seu cadastro</Title>
      <Container>
        <Wrapper>
          <form onSubmit={handleSubmit(newLogUser)}>
            <Row>
              <Input
                type="text"
                placeholder="Nome completo*"
                leftIcon={<MdPerson />}
                name="nome"
                control={control}
              />
              <span>{errors.nome?.message}</span>
              <Input
                type="text"
                placeholder="Telefone"
                leftIcon={<MdPhoneAndroid />}
                name="contato"
                control={control}
              />
              <span>{errors.contato?.message}</span>
            </Row>
            <Row>
              <Text>Data de Nascimento*:</Text>
              <Input
                type="date"
                leftIcon={<MdCalendarMonth />}
                name="dataNascimento"
                control={control}
              />
              <span>{errors.dataNascimento?.message}</span>
            </Row>
            <Row>
              <Input
                type="text"
                placeholder="GitHub"
                leftIcon={<FaGithub />}
                name="github"
                control={control}
              />
              <Input
                type="text"
                placeholder="LinkedIn"
                leftIcon={<FaLinkedin />}
                name="linkedin"
                control={control}
              />
            </Row>
            <Row>
              <Input
                type="text"
                placeholder="E-mail*"
                leftIcon={<MdEmail />}
                name="email"
                control={control}
              />
              <span>{errors.email?.message}</span>
              <Input
                type="password"
                placeholder="Senha*"
                leftIcon={<MdLock />}
                name="senha"
                control={control}
              />
              <span>{errors.senha?.message}</span>
            </Row>
            <Row>
              <Input
                type="text"
                placeholder="Endereco"
                leftIcon={<MdPermIdentity />}
                name="endereco"
                control={control}
              />
              <UploadButton>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }} // Oculta o input padrão
                />
                {image ? "Foto selecionada" : "Adicionar foto"}
              </UploadButton>
            </Row>
            <ButtonContainer>
              {/* Apenas o botão Confirmar, que envia o formulário */}
              <Button title="Confirmar" variant="primary" type="submit" />
            </ButtonContainer>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export { SignUp };
