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
    dataa: number;
    endereco: string;
    status: string;
    descricao: string;
    latitude: number;
    longitude: number;
    foto: string
}

const CreateOcorrencia = () => {

    const [formData, setFormData] = useState({
        status: '0'
    });


    const navigate = useNavigate();

    // const [items, setItems] = useState<Item[]>([]);  
    // const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [dadosOcorrencia, setDadosOcorrencia] = useState<Ocorrencia>({} as Ocorrencia);

    let { ocorrenciaId } = useParams<Params>();

    // useEffect(() => {
    //     api.get('items').then(response => {
    //         setItems(response.data);
    //     });

    if (ocorrenciaId !== undefined) {
        api.get(`ocorrencia/${ocorrenciaId}`).then((response) => {
            setDadosOcorrencia(response.data.ocorrencia);

            setSelectedPosition([response.data.ocorrencia.latitude, response.data.ocorrencia.longitude]);
        })

    };

    //     const vetItems = [ 0 ];

    //     response.data.items.map((item: PointItem) => {
    //         vetItems.push(item.id);
    //     });

    //     setSelectedItems(vetItems);
    // }).catch(function (error) {
    //     alert(error);
    // });
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

    // function handleSelectItem(id: number) {
    //     const alreadySelected = selectedItems.findIndex(item => item === id);

    //     if (alreadySelected >= 0) {
    //         const filteredItems = selectedItems.filter(item => item !== id)

    //         setSelectedItems(filteredItems);
    //     } else {
    //         setSelectedItems([...selectedItems, id]);

    //     }

    // }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (ocorrenciaId !== undefined) {
            const { id, dataa, endereco, status, descricao, foto } = dadosOcorrencia;
            const [latitude, longitude] = selectedPosition;
            // const items = selectedItems;

            const data = {
                id,
                dataa,
                endereco,
                status,
                descricao,
                latitude,
                longitude,
                foto

            };

            await api.put('ocorrencias', data);

            alert('Ocorrência atualizada com sucesso!');

        } else {
            const { dataa, endereco, status, descricao } = dadosOcorrencia;
            const [latitude, longitude] = selectedPosition;
            // const items = selectedItems;

            const data = {
                dataa,
                endereco,
                status,
                descricao,
                latitude,
                longitude,
            };

            await api.post('ocorrencias', data);

            alert('Ocorrência criada!');
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
                                type="date"
                                name="dataa"
                                id="dataa"
                                defaultValue={dadosOcorrencia.dataa}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="name">Endereço</label>
                            <input
                                type="text"
                                name="endereco"
                                id="endereco"
                                defaultValue={dadosOcorrencia.endereco}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="status">Status</label>
                            <select
                                name="status"
                                id="status"
                                defaultValue={formData.status}
                                onChange={handleSelectChange}
                            >
                                <option value="0">Selecione o Período</option>
                                <option value="Em análise">Em análise</option>
                                <option value="Resolvido">Resolvido</option>
                            </select>
                        </div>

                        {/* <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                defaultValue={dadosPoint.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                defaultValue={dadosPoint.whatsapp}
                                onChange={handleInputChange}
                            />
                        </div> */}
                    </div>

                    <div className="field">
                        <label htmlFor="descricao">Descriçao</label>
                        <textarea
                            name="descricao"
                            id="descricao"
                            defaultValue={dadosOcorrencia.descricao}
                            onChange={handleTextAreaChange}
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
                        <img src={`https://conscientizapn.s3.sa-east-1.amazonaws.com/PEV/${dadosOcorrencia.foto}.jpeg`} alt="" />
                        <button
                            type="button"
                        >
                            Upload Imagem
                        </button>
                    </div>
                </fieldset>

                {/* <fieldset>
                    <legend>
                        <h2>Ítems de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(items => (
                            <li key={items.id}
                                onClick={() => handleSelectItem(items.id)}
                                className={selectedItems.includes(items.id) ? 'selected' : ''}
                            >
                                <img src={items.image_url} alt={items.title} />
                                <span>{items.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset> */}

                {ocorrenciaId ? (
                    <button type="submit">
                        Atualizar Ocorrência
                    </button>
                ) : (
                    <button type="submit">
                        Alterar Status
                    </button>
                )}

            </form>
        </div>
    );
};

export default CreateOcorrencia;