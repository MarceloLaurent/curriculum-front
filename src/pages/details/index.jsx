import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import { Container, Title, CardContainer } from "./styles";
import { api } from "../../services/api";
import { Logado } from "../../components/Logado";

const Details = () => {
  const { id } = useParams(); 
  const [dados, setDados] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`/pessoas/${id}`);
        setDados(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
        setLoading(false); 
      }
    };

    fetchUserDetails(); 
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>; 
  }

  const getDataTermino = (dataTermino) => {
    if (dataTermino === null) {
      return "Cursando";
    }
    return new Date(dataTermino).toLocaleDateString();
  };

  const getExperienciaTermino = (dataTermino) => {
    if (dataTermino === null) {
      return "Cargo atual";
    }
    return new Date(dataTermino).toLocaleDateString();
  };

  return (
    <Container>
      <Logado />
      <Title>Cursos e Experiências</Title>
      <CardContainer>
        <h3>Experiências Profissionais</h3>
        {dados.experiencias && dados.experiencias.length > 0 ? (
          dados.experiencias.map((experiencia) => (
            <Card
              key={experiencia.id}
              dados={{
                cargo: experiencia.cargo,
                empresa: experiencia.empresa,
                dataInicio: experiencia.dataInicio,
                dataTermino: getExperienciaTermino(experiencia.dataTermino),
              }}
            />
          ))
        ) : (
          <p>Nenhuma experiência registrada.</p>
        )}
      </CardContainer>
      <CardContainer>
        <h3>Cursos Realizados</h3>
        {dados.cursos && dados.cursos.length > 0 ? (
          dados.cursos.map((curso) => (
            <Card
              key={curso.id}
              dados={{
                descricao: curso.descricao,
                instituicao: curso.instituicao,
                dataInicio: curso.dataInicio,
                dataConclusao: getDataTermino(curso.dataConclusao),
              }}
            />
          ))
        ) : (
          <p>Nenhum curso registrado.</p>
        )}
      </CardContainer>
    </Container>
  );
};

export { Details };
