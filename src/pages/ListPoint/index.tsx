import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiTrash } from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/icon.png';

import './style.css';

interface Point {
    id: number;
    imagem: string;
    nome: string;
    email: string;
    whatsapp: string;
    latitude: number;
    longitude: number;
    endereco: string;
    descricao: string;
}

const ListPoint = () => {
    const [points, setPoints] = useState<Point[]>([]);

    useEffect(() => {
        api.get('all-points').then(response => {
            setPoints(response.data);
        });
    }, []);

    function deletePoint(id: number, nome: string) {
        let resultado = window.confirm("Deseja excluir o ponto de entrega " + id + " - " + nome + " ?");

        if (resultado) {
            setPoints(points.filter(point => point.id !== id));

            api.delete(`points/${id}`)
                .then(() => alert("Ponto de Coleta Excluído com Sucesso!!!"))
                .catch(error => alert(`Erro ao excluir o ponto de entrega. Error: ${error.message}`));
        }
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Conscientiza PN" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>

            <main>
                <h1>Lista de Pontos de Entrega Voluntária - PEV</h1>

                <table id="customers-table">
                    <tr>
                        <th>Ponto de Entrega Voluntária</th>
                        <th>Endereço</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {points.map(point => (
                        <tr key={point.id}>
                            <td>{point.nome}</td>
                            <td>{point.endereco}</td>
                            <td className="edit-column">
                                <Link to={`/create-point/${point.id}`}>
                                    <FiEdit size={24} color="rgba(0, 0, 0, 0.8)" />
                                </Link>
                            </td>
                            <td className="delete-column">
                                <button onClick={() => deletePoint(point.id, point.nome)}>
                                    <FiTrash size={24} color="rgba(0, 0, 0, 0.8)" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>

                <Link className="new-pev" to="/create-point">
                    <strong>Novo Ponto de Coleta</strong>
                </Link>
            </main>
        </div>
    );
};

export default ListPoint;