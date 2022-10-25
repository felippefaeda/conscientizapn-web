import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import api from '../../services/api';
import logo from '../../assets/icon.png';
import './style.css';

type Params = {
    ocorrenciaId: string;
};

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
    data: string; 
}

const CreateOcorrencia = () => {
    const navigate = useNavigate();

    const [dadosOcorrencia, setDadosOcorrencia] = useState<Ocorrencia>({} as Ocorrencia);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    let { ocorrenciaId } = useParams<Params>();

    useEffect(() => {

        if (ocorrenciaId !== undefined){
            api.get(`ocorrencias/${ocorrenciaId}`).then((response) => {
                setDadosOcorrencia(response.data);
                setSelectedPosition([response.data.latitude, response.data.longitude]);
            }).catch(function (error) {
                alert(error);
            });
        }
    }, []);

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target;
        setDadosOcorrencia({ ...dadosOcorrencia, [name]: value });
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setDadosOcorrencia({ ...dadosOcorrencia, [name]: value })
    }

    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setDadosOcorrencia({ ...dadosOcorrencia, [name]: value })
    }

    function LocationMarker() {
        useMapEvents({
            click(e: LeafletMouseEvent) {
                setSelectedPosition([e.latlng.lat, e.latlng.lng]);
            }
        });

        return selectedPosition === null ? null : (
            <Marker position={selectedPosition} />
        )
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (ocorrenciaId !== undefined) {
            const { id, status } = dadosOcorrencia;

            const data = {
                id,
                status
            };

            await api.put(`ocorrencias/${ocorrenciaId}`, data);

            alert('Status da Ocorrência atualizado com sucesso!');
        }

        navigate('/list-ocorrencias');
    }

    return (
        <div id="page-ocorrencia">
            <header>
                <img src={logo} alt="Conscientiza PN" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cidadão Fiscal - Ocorrência</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">Data</label>
                            <input
                                type="text"
                                name="data"
                                id="data"
                                defaultValue={dadosOcorrencia.data}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="name">Bairro</label>
                            <input
                                type="text"
                                name="bairro"
                                id="bairro"
                                defaultValue={dadosOcorrencia.bairro}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="status">Status</label>
                            <select
                                name="status"
                                id="status"
                                value={dadosOcorrencia.status}
                                onChange={handleSelectChange}
                            >
                                <option value="0">0 - Em Aberto</option>
                                <option value="1">1 - Em Análise</option>
                                <option value="2">2 - Resolvido</option>
                            </select>
                        </div>
                    </div>

                    <div className="field">
                            <label htmlFor="name">Rua</label>
                            <input
                                type="text"
                                name="rua"
                                id="rua"
                                defaultValue={dadosOcorrencia.rua}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </div>

                    <div className="field">
                        <label htmlFor="descricao">Descriçao</label>
                        <textarea
                            name="descricao"
                            id="descricao"
                            defaultValue={dadosOcorrencia.descricao}
                            onChange={handleTextAreaChange}
                            readOnly
                        />
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <MapContainer center={[-20.41923570907382, -42.91273444890976]} zoom={15}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                    </MapContainer>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Imagem</h2>
                    </legend>
                    <div className="field">
                        <img 
                            src={`https://conscientizapn.s3.sa-east-1.amazonaws.com/${dadosOcorrencia.foto}.jpg`} 
                            alt=""                          
                        />                        
                    </div>
                </fieldset>
                
                <button type="submit">
                    Atualizar Ocorrência
                </button>
            </form>
        </div>
    );
};

export default CreateOcorrencia;