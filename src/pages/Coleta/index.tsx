import logo from '../../assets/logo.svg';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';

import './style.css';


const Coleta = () => {

    const [selectedBairro, setSelectedBairro] = useState('0');
    const [selectedTipo, setSelectedTipo] = useState('0');
    const [selectedDia, setSelectedDia] = useState('0');
    const [selectedPeriodo, setSelectedPeriodo] = useState('0');
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
                            onChange={handleSelectTipo}>
                                <option value="0">Selecione o Tipo de Coleta</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="bairro">Bairro</label>
                            <select 
                            name="bairro" 
                            id="bairro" 
                            value={selectedBairro}
                            onChange={handleSelectBairro}>
                                <option value="0">Selecione um Bairro</option>
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
                            onChange={handleSelectDia}>
                                <option value="0">Selecione o Dia da Semana</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="periodo">Período</label>
                            <select 
                            name="periodo" 
                            id="periodo" 
                            value={selectedPeriodo}
                            onChange={handleSelectPeriodo}>
                                <option value="0">Selecione o Período</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="horario">Horário</label>
                            <select 
                            name="horario" 
                            id="horario" 
                            value={selectedHorario}
                            onChange={handleSelectHorario}>
                                <option value="0">Selecione o Horário</option>
                            </select>
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

