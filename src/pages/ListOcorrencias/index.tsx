import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiTrash } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/icon.png';

import './style.css';

interface Ocorrencia {
    id: number;
    descricao: string;
    foto: string;
    latitude: number;
    longitude: number;
    reportacoes: number;
    nomeUsuario: string;
    bairro: string;
    rua: string;
    status: number;
    data: number; 
}

const ListOcorrencias = () => {
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([])
    const [bairro, setBairro] = useState("Esplanada");
    const [status, setStatus] = useState("Todos");
    const [load, setLoad] = useState(true);

    useEffect(() => {
        buscarOcorrencias();

    }, [load]);

    async function buscarOcorrencias() {
        await api.get(`ocorrencias/${bairro}/${status}`).then(response => {
            setOcorrencias(response.data);
        });
    }

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target;

        if(name == "bairro")
            setBairro(value);
        else if(name == "status")
            setStatus(value);

        setLoad(!load);
    }

    return (
        <div id="page-list-ocorrencias">
            <header>
                <img src={logo} alt="Conscientiza PN" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>

            <main>
                <h1>Cidadão Fiscal - Ocorrências</h1>
                <br />
                <div className="field-group">
                    <div className="field">
                        <label htmlFor="bairro">Selecione um Bairro: </label>
                        <select
                            name="bairro"
                            id="bairro"
                            defaultValue={"Esplanada"}
                            onChange={handleSelectChange}
                        >
                            <option value="0">Selecione um Bairro</option>
                            <option value="Todos">Todos os Bairros</option>
                            <option value="Ana Florência">Ana Florência</option>
                            <option value="Área Rural de Ponte Nova">Área Rural de Ponte Nova</option>
                            <option value="Bom Pastor">Bom Pastor</option>
                            <option value="Centro">Centro</option>
                            <option value="Cidade Nova">Cidade Nova</option>
                            <option value="Copacabana">Copacabana</option>
                            <option value="Esplanada">Esplanada</option>
                            <option value="Fátima">Fátima</option>
                            <option value="Fortaleza">Fortaleza</option>
                            <option value="Guarapiranga">Guarapiranga</option>
                            <option value="Ipanema">Ipanema</option>
                            <option value="Jardim">Jardim</option>
                            <option value="Nossa Senhora Auxiliadora">Nossa Senhora Auxiliadora</option>
                            <option value="Nova Almeida">Nova Almeida</option>
                            <option value="Nova Copacabana">Nova Copacabana</option>
                            <option value="Nova Suíça">Nova Suíça</option>
                            <option value="Novo Horizonte">Novo Horizonte</option>
                            <option value="Palmeiras">Palmeiras</option>
                            <option value="Paraíso">Paraíso</option>
                            <option value="Progresso">Progresso</option>
                            <option value="Rasa">Rasa</option>
                            <option value="Sagrado Coração de Jesus">Sagrado Coração de Jesus</option>
                            <option value="Santa Teresa">Santa Teresa</option>
                            <option value="Santo Antônio I">Santo Antônio II</option>
                            <option value="São Geraldo">São Geraldo</option>
                            <option value="São Judas Tadeu">São Judas Tadeu</option>
                            <option value="São Pedro">São Pedro</option>
                            <option value="Sumaré">Sumaré</option>
                            <option value="Triângulo">Triângulo</option>
                            <option value="Vale do Ipê">Vale do Ipê</option>
                            <option value="Vale Verde">Vale Verde</option>
                            <option value="Vila Alvarenga">Vila Alvarenga</option>
                            <option value="Vila Oliveira">Vila Oliveira</option>
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="status">Selecione um Status: </label>
                        <select
                            name="status"
                            id="status"
                            defaultValue={"Todos"}
                            onChange={handleSelectChange}
                        >
                            <option value="Todos">Todos os Status</option>
                            <option value="0">0 - Em Aberto</option>
                            <option value="1">1 - Em Análise</option>
                            <option value="2">2 - Resolvido</option>
                        </select>
                    </div>
                </div>

                <table id="customers-table">
                    <tr>
                        <th>Data</th>
                        <th>Bairro</th>
                        <th>Rua</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    {ocorrencias.map(ocorrencia => (
                        <tr key={ocorrencia.id}>
                            <td>{ocorrencia.data}</td>
                            <td>{ocorrencia.bairro}</td>
                            <td>{ocorrencia.rua}</td>
                            <td>{ocorrencia.descricao}</td>
                            <td>{(ocorrencia.status === 0) ? "Em aberto" : 
                                 (ocorrencia.status === 1) ? "Em Análise" : "Concluído"   
                                }
                            </td>
                            <td className="edit-column">
                                <Link to={`/create-ocorrencia/${ocorrencia.id}`}>
                                    <FiEdit size={24} color="rgba(0, 0, 0, 0.8)" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </table>
            </main>

        </div>
    );
};

export default ListOcorrencias;