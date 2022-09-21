import logo from '../../assets/logo.svg';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';

import './style.css';

type Params = {
    pointId: string;
};

interface Item {
    id: number;
    title: string;
    image_url: string;    
}

interface PointItem {
    id: number;
    image: string;
    title: string;
}

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

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);  

    let { pointId } = useParams<Params>();

    /* const [formData, setFormData] = useState({
        nome: 'Teste',
        email: '',
        whatsapp: '',
        endereco: '',
        descricao: "",
    }); */

    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const navigate = useNavigate();

    const [dadosPoint, setDadosPoint] = useState<Point>({} as Point);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });

        if (pointId !== undefined){
            api.get(`points/${pointId}`).then((response) => {
                setDadosPoint(response.data.point);

                setSelectedPosition([response.data.point.latitude, response.data.point.longitude]);

                const vetItems = [ 0 ];

                response.data.items.map((item: PointItem) => {
                    vetItems.push(item.id);
                });

                setSelectedItems(vetItems);
            }).catch(function (error) {
                alert(error);
            });
        }
    }, []);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setDadosPoint({ ...dadosPoint, [name]: value })
    }

    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setDadosPoint({ ...dadosPoint, [name]: value })
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

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id)

            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);

        }

    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (pointId !== undefined){
            const { id, imagem, nome, email, whatsapp, endereco, descricao } = dadosPoint;
            const [latitude, longitude] = selectedPosition;
            const items = selectedItems;

            const data = {
                id,
                imagem,
                nome,
                email,
                whatsapp,
                latitude,
                longitude,
                endereco,
                descricao,                
                items
            };

            await api.put('points', data);

            alert('Ponto de coleta atualizado com sucesso!');

        } else {
            const { nome, email, whatsapp, endereco, descricao } = dadosPoint;
            const [latitude, longitude] = selectedPosition;
            const items = selectedItems;

            const data = {
                nome,
                email,
                whatsapp,
                endereco,
                descricao,
                latitude,
                longitude,
                items
            };

            await api.post('points', data);

            alert('Ponto de coleta criado!');
        }

        

        navigate('/');

    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do PEV<br />(Ponto de coleta seletiva)</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            defaultValue={dadosPoint.nome}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
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
                        </div>
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

                    <div className="field">
                        <label htmlFor="name">Endereço</label>
                        <input
                            type="text"
                            name="endereco"
                            id="endereco"
                            defaultValue={dadosPoint.endereco}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="descricao">Descriçao</label>
                        <textarea
                            name="descricao"
                            id="descricao"
                            defaultValue={dadosPoint.descricao}
                            onChange={handleTextAreaChange}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Imagem</h2>
                    </legend>
                    <div className="field">
                        <img src={`https://conscientizapn.s3.sa-east-1.amazonaws.com/PEV/${dadosPoint.imagem}.jpeg`} alt="" />
                        <button
                            type="button"
                        >
                            Upload Imagem
                        </button>
                    </div>
                </fieldset>

                <fieldset>
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
                </fieldset>

                {pointId ? (
                    <button type="submit">
                        Atualizar Ponto de Entrega
                    </button>
                ) : (
                    <button type="submit">
                        Cadastrar Ponto de Entrega
                    </button>
                )}               

            </form>
        </div>
    );
};

export default CreatePoint;