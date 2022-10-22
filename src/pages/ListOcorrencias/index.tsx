import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiTrash } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/icon.png';

import './style.css';

interface Ocorrencia {
    id: number;
    dataa: number;
    endereco: string;
    status: string;
    descricao: string;
    latitude: number;
    longitude: number;
    foto: string
}

const ListOcorrencias = () => {
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([])
    const [bairro, setBairro] = useState("Esplanada");

    useEffect(() => {
        buscarOcorrencias();
    }, []);

    async function buscarOcorrencias() {
        await api.get(`coleta/${bairro}`).then(response => {
            setOcorrencias(response.data);
        });
    }

    // useEffect(()=>{
    //     api.get('all-ocorrencias').then(response =>{
    //         setOcorrencias(response.data);
    //     });
    // }, []);

    // function deleteOcorrencia(id:number, endereco: string){
    //     let resultado = window.confirm("Deseja excluir a ocorrência"+ id +" - "+ endereco + "?");

    //     if(resultado){
    //         setOcorrencias(ocorrencias.filter(ocorrencia => ocorrencia.id !== id));

    //         api.delete(`points/${id}`)
    //             .then(()=> alert("Ocorrência Excluída com Sucesso!!!"))
    //             .catch(error => alert (`Error ao excluir a ocorrência. Error: ${error.message}`));
    //     }
    // }

    function deleteOcorrencia(id: number) {
        let resultado = window.confirm("Deseja excluir a coleta?");

        if (resultado) {
            setOcorrencias(ocorrencias.filter(ocorrencia => ocorrencia.id !== id));

            api.delete(`create-ocorrencia/${id}`)
                .then(() => alert("Ocorrência com Sucesso!!!"))
                .catch(error => alert(`Erro ao excluir a Ocorrência. Error: ${error.message}`));
        }
    }

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const { value } = event.target;
        setBairro(value);

        buscarOcorrencias();

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
                        <label htmlFor="bairro">Selecione um Bairro: </label>
                        <select
                            name="bairro"
                            id="bairro"
                            defaultValue={"Esplanada"}
                            onChange={handleSelectChange}
                        >
                            <option value="Em Análise">Em Análise</option>
                            <option value="Resolvido">Resolvido</option>
                        </select>
                    </div>
                </div>

                <table id="customers-table">
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {ocorrencias.map(ocorrencia => (
                        <tr key={ocorrencia.id}>
                            <td>{ocorrencia.id}</td>
                            <td>{ocorrencia.dataa}</td>
                            <td>{ocorrencia.endereco}</td>
                            <td>{ocorrencia.status}</td>
                            <td className="edit-column">
                                <Link to={`/create-ocorrencia/${ocorrencia.id}`}>
                                    <FiEdit size={24} color="rgba(0, 0, 0, 0)" />
                                </Link>
                            </td>
                            <td className="delete-column">
                                <button onClick={() => deleteOcorrencia(ocorrencia.id)}>
                                    <FiTrash size={24} color="rgba(0, 0, 0, 0.8)" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
                <Link className="new-pev" to="/create-ocorrencia">
                    <strong>Nova ocorrência</strong>
                </Link>
            </main>

        </div>
    );
};

export default ListOcorrencias;