import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import {
  Container,
  Wrapper,
  Row,
  Menu,
  MenuRight,
  UserPicture,
} from "./styles";

const Logado = () => {
  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  const [pessoa, setPessoa] = useState(null);
  const [fotoBase64, setFotoBase64] = useState(null);

  useEffect(() => {
    const fetchPessoa = async () => {
      try {
        const { data } = await api.get(`/pessoas/${id}`);

        if (data) {
          setPessoa(data);

          if (data.foto) {
            const fotoComPrefixo = `data:image/jpeg;base64,${data.foto}`;

            setFotoBase64(fotoComPrefixo);
            console.log("Imagem Base64 recebida:", fotoComPrefixo);
          }
        } else {
          console.error("Usuário não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar pessoa:", error);
      }
    };

    fetchPessoa();
  }, [id]);

  if (!pessoa) return <p>Carregando...</p>;

  const handleAddCourse = () => {
    navigate(`${location.pathname}/cursos`);
  };

  const handleAddExperience = () => {
    navigate(`${location.pathname}/experiencias`);
  };

  return (
    <Wrapper>
      <Container>
        <Row>
          <>
            {/* Usando a string Base64 com o prefixo correto */}
            <UserPicture
              src={fotoBase64 || "caminho/para/imagem/default.jpg"}
              alt={`Foto de ${pessoa.nome}`}
            />
            <Menu href="/">Curriculum&reg;</Menu>
          </>
        </Row>
        <Row>
          <>
            <MenuRight href="/">Alterar dados</MenuRight>
            <MenuRight
              as={Link}
              to={`${location.pathname}/cursos`}
              onClick={handleAddCourse}
            >
              Adicionar curso
            </MenuRight>
            <MenuRight
              as={Link}
              to={`${location.pathname}/experiencias`}
              onClick={handleAddExperience}
            >
              Adicionar experiência
            </MenuRight>
            <MenuRight href="/">Sair</MenuRight>
          </>
        </Row>
      </Container>
    </Wrapper>
  );
};

export { Logado };
