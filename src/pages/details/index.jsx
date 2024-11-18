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
  const [filtro, setFiltro] = useState(""); 

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

  const filterData = (dataArray, filtro, dateField) => {
    if (filtro === "em_andamento") {
      return dataArray.filter((item) => item[dateField] === null);
    }
    if (filtro) {
      return dataArray.filter((item) => {
        const endYear = item[dateField] ? new Date(item[dateField]).getFullYear() : null;
        return endYear === parseInt(filtro);
      });
    }
    return dataArray;
  };

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

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

  const experienciasFiltradas = filterData(dados.experiencias || [], filtro, "dataTermino");
  const cursosFiltrados = filterData(dados.cursos || [], filtro, "dataConclusao");

  const anosDisponiveis = [
    ...new Set([
      ...(dados.experiencias || []).map((exp) => exp.dataTermino ? new Date(exp.dataTermino).getFullYear() : null),
      ...(dados.cursos || []).map((curso) => curso.dataConclusao ? new Date(curso.dataConclusao).getFullYear() : null),
    ]),
  ]
    .filter((year) => year !== null)
    .sort();

  return (
    <Container>
      <Logado />
      <Title>Cursos e Experiências</Title>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="filtro-select">Selecione o filtro:</label>
        <select id="filtro-select" value={filtro} onChange={handleFiltroChange}>
          <option value="">Todos</option>
          <option value="em_andamento">Em andamento</option>
          {anosDisponiveis.map((anoDisponivel) => (
            <option key={anoDisponivel} value={anoDisponivel}>
              {anoDisponivel}
            </option>
          ))}
        </select>
      </div>
      <CardContainer>
        <h3>Experiências Profissionais</h3>
        {experienciasFiltradas && experienciasFiltradas.length > 0 ? (
          experienciasFiltradas.map((experiencia) => (
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
          <p>
            Nenhuma experiência registrada{" "}
            {filtro === "em_andamento"
              ? "em andamento"
              : filtro
              ? `para o ano ${filtro}`
              : ""}
            .
          </p>
        )}
      </CardContainer>
      <CardContainer>
        <h3>Cursos Realizados</h3>
        {cursosFiltrados && cursosFiltrados.length > 0 ? (
          cursosFiltrados.map((curso) => (
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
          <p>
            Nenhum curso registrado{" "}
            {filtro === "em_andamento"
              ? "em andamento"
              : filtro
              ? `para o ano ${filtro}`
              : ""}
            .
          </p>
        )}
      </CardContainer>
    </Container>
  );
};

export { Details };
