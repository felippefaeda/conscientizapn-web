import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiTrash } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/icon.png';

import './style.css';

interface Coleta{
    id: number;
    tipo:number;
    bairro:string;
    dia_semana:number;
    periodo:string;
    horario:number;
}

const ListColetas = () => {

    const [coletas, setColetas] = useState<Coleta[]>([]);
    const [bairro, setBairro] = useState("Esplanada");

    useEffect(() => {
        buscarColetas();
    }, []);

    async function buscarColetas(){
        await api.get(`coleta/${bairro}`).then(response => {
            setColetas(response.data);
        });
    }

    function deleteColeta(id: number) {
        let resultado = window.confirm("Deseja excluir a coleta?");

        if (resultado) {
            setColetas(coletas.filter(coleta => coleta.id !== id));

            api.delete(`coleta/${id}`)
                .then(() => alert("Coleta Excluída com Sucesso!!!"))
                .catch(error => alert(`Erro ao excluir a Coleta. Error: ${error.message}`));
        }
    }

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const { value } = event.target;
        setBairro(value);

        buscarColetas();
    }

    return (
        <div id="page-create-coleta">
            <header>
                <img src={logo} alt="Conscientiza PN" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>

            <main>
                <h1>Lista de Coletas por Bairro</h1>

                <p>Bairro selecionado: {bairro} </p> 

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

                <table id="customers-table">
                    <tr>
                        <th>Bairro</th>
                        <th>Dia da Semana</th>
                        <th>Tipo de Coleta</th>
                        <th></th>
                    </tr>
                    {coletas.map(coleta => (
                        <tr key={coleta.id}>
                            <td>{coleta.bairro}</td>
                            <td>{coleta.dia_semana}</td>
                            <td>{coleta.tipo}</td>
                            <td className="delete-column">
                                <button onClick={() => deleteColeta(coleta.id)}>
                                    <FiTrash size={24} color="rgba(0, 0, 0, 0.8)" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>

                <Link className="new-pev" to="/coleta">
                    <strong>Novo Ponto de Coleta</strong>
                </Link>
            </main>
        </div>
    );
};

export default ListColetas;