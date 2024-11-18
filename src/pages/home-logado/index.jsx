import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { Container } from "./styles";
import { Logado } from "../../components/Logado";
import { api } from "../../services/api";

const HomeLogado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); 
  const [courses, setCourses] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/pessoas/${id}`);
        setUserData(response.data);
        setCourses(response.data.cursos || []);
        setExperiences(response.data.experiencias || []);
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
        alert("Não foi possível carregar os dados do usuário.");
      }
    };

    fetchUserData();
  }, [id]);

  const handleNavigateToDetails = () => {
    navigate(`/pessoas/${id}/detalhes`);
  };

  return (
    <>
      <Logado />
      <Container>
        <div>
          <h2>Dados Cadastrais</h2>
          {userData ? (
            <div>
              <p><strong>Nome:</strong> {userData.nome}</p>
              <p><strong>Contato:</strong> {userData.contato}</p>
              <p><strong>Endereço:</strong> {userData.endereco}</p>
              <p>
                <strong>Data de Nascimento:</strong>{" "}
                {new Date(userData.dataNascimento).toLocaleDateString()}
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a href={userData.linkedin} target="_blank" rel="noopener noreferrer">
                  {userData.linkedin}
                </a>
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a href={userData.github} target="_blank" rel="noopener noreferrer">
                  {userData.github}
                </a>
              </p>
              <p><strong>E-mail:</strong> {userData.email}</p>
              <p>
                <strong>Cursos:</strong>{" "}
                {courses.length > 0
                  ? courses.map((course) => course.descricao).join(", ")
                  : "Nenhum curso atribuído."}
              </p>
              <p>
                <strong>Experiências:</strong>{" "}
                {experiences.length > 0
                  ? experiences.map((experience) => experience.cargo).join(", ")
                  : "Nenhuma experiência atribuída."}
              </p>
              <Button title="Ver detalhes" variant="primary" onClick={handleNavigateToDetails} />
            </div>
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </Container>
    </>
  );
};

export { HomeLogado };
