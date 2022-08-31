import logo from '../../assets/logo.svg';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';

import './style.css';


const Coleta = () => {

    const [selectedBairro, setSelectedBairro] = useState("");
    const [selectedTipo, setSelectedTipo] = useState('0');
    const [selectedDia, setSelectedDia] = useState('-1');
    const [selectedPeriodo, setSelectedPeriodo] = useState("");
    const [selectedHorario, setSelectedHorario] = useState('0');

    const navigate = useNavigate();

    function handleSelectBairro(event: ChangeEvent<HTMLSelectElement>){
        const bairro = event.target.value;

        setSelectedBairro(bairro);
    };

    function handleSelectTipo(event: ChangeEvent<HTMLSelectElement>){
        const tipo = event.target.value;

        setSelectedTipo(tipo);
    };

    function handleSelectDia(event: ChangeEvent<HTMLSelectElement>){
        const dia_semana = event.target.value;

        setSelectedDia(dia_semana);
    };

    function handleSelectPeriodo(event: ChangeEvent<HTMLSelectElement>){
        const periodo = event.target.value;

        setSelectedPeriodo(periodo);
    };

    function handleSelectHorario(event: ChangeEvent<HTMLSelectElement>){
        const horario = event.target.value;

        setSelectedHorario(horario);
    };


    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const tipo = selectedTipo;
        const bairro = selectedBairro;
        const dia_semana = selectedDia;
        const periodo = selectedPeriodo;
        const horario = selectedHorario;

        const data = {
            tipo,
            bairro,
            dia_semana,
            periodo,
            horario
        };

        await api.post('coleta', data);

        alert('Dados da coleta cadastrado!');

        navigate('/');
    }


    return(
        <div id="page-coleta">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft/>
                    Voltar para home
                </Link>

            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro dos Dados de Coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="tipo">Tipo de Coleta</label>
                            <select 
                                name="tipo" 
                                id="tipo" 
                                value={selectedTipo}
                                onChange={handleSelectTipo}
                            >
                                <option value="0">Selecione o Tipo de Coleta</option>
                                <option value="1">Tradicional</option>
                                <option value="2">Seletiva</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="bairro">Bairro</label>
                            <select 
                                name="bairro" 
                                id="bairro" 
                                value={selectedBairro}
                                onChange={handleSelectBairro}
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
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="dia_semana">Dia da Semana</label>
                            <select 
                                name="dia_semana" 
                                id="dia_semana" 
                                value={selectedDia}
                                onChange={handleSelectDia}
                            >
                                <option value="-1">Selecione o Dia da Semana</option>
                                <option value="0">Domingo</option>
                                <option value="1">Segunda-feira</option>
                                <option value="2">Terça-feira</option>
                                <option value="3">Quarta-feira</option>
                                <option value="4">Quinta-feira</option>
                                <option value="5">Sexta-feira</option>
                                <option value="6">Sábado</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="periodo">Período</label>
                            <select 
                                name="periodo" 
                                id="periodo" 
                                value={selectedPeriodo}
                                onChange={handleSelectPeriodo}
                            >
                                <option value="0">Selecione o Período</option>
                                <option value="Manhã">Manhã</option>
                                <option value="Tarde">Tarde</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="horario">Horário</label>
                            <input 
                                type="time" 
                                id="horario" 
                                name="horário" 
                                min="06:00" 
                                max="18:00" 
                                required 
                            />
                        </div>
                    </div>
                </fieldset>

                <button type="submit">
                    Cadastrar dados da coleta
                </button>

            </form>
        </div>
    );
};

export default Coleta;

