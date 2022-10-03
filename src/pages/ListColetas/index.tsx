import React, { useState, useEffect } from 'react';
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

    const[coletas, setColetas] = useState<Coleta[]>([]);


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

                <h1>Lista das Coletas</h1>

                <table id="customers-table">
                    <tr>
                        <th>Bairro</th>
                        <th>Dia da Semana</th>
                        <th>Tipo de Coleta</th>
                    </tr>
                </table>

                <Link className="new-coleta" to="/coleta">
                    <strong>Novo Ponto de Coleta</strong>
                </Link>

            </main>

        </div>
    );
};

export default ListColetas;