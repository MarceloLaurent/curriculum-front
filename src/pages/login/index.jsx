import { useNavigate } from "react-router-dom";
import { MdPermIdentity, MdLock } from "react-icons/md";
import { useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

import {
  Container,
  Wrapper,
  Title,
  Row,
  EsqueciText,
  CriarText,
} from "./styles";

const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSubmit = async (formData) => { 
    try {
      const { data } = await api.get(`/pessoas`);

      for (let i = 0; i < data.length; i++) {
        if (data[i].email === formData.email && data[i].senha.toString() === formData.senha) {
          console.log("Usuário encontrado:", data[i]);
          navigate(`/logado/${data[i].id}`);
          return "Usuário autenticado";
        }
      }

      alert("Usuário ou senha inválido");
      return "Usuário não encontrado";
    } catch (e) {
      console.error("Erro ao tentar fazer login:", e);

      if (e.response && e.response.status === 404) {
        alert("Servidor não encontrado. Tente novamente mais tarde.");
      } else if (e.response && e.response.status === 500) {
        alert("Erro no servidor. Tente novamente mais tarde.");
      } else {
        alert(
          "Ocorreu um erro inesperado. Verifique sua conexão e tente novamente."
        );
      }
      return "Erro no login";
    }
};

  const handleSendPassword = () => {
    alert("Um e-mail de redefinição de senha foi enviado.");
  };

  return (
    <>
      <Header />
      <Title>Inicie sua sessão</Title>
      <Container>
        <Wrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="E-mail"
              leftIcon={<MdPermIdentity />}
              name="email"
              control={control}
            />
            {errors.email && <span>Email é obrigatório</span>}
            <Input
              type="password"
              placeholder="Senha"
              leftIcon={<MdLock />}
              name="senha"
              control={control}
            />
            {errors.senha && <span>Senha é obrigatória</span>}
            <Button title="Entrar" variant="primary" type="submit" />
          </form>
        </Wrapper>
        <Row>
          <EsqueciText href="" onClick={handleSendPassword}>
            Esqueci minha senha
          </EsqueciText>
          <CriarText href="/signup">Criar Conta</CriarText>
        </Row>
      </Container>
    </>
  );
};

export { Login };
