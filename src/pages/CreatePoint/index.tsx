import logo from '../../assets/logo.svg';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';

import './style.css';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        whatsapp: '',
        endereco:'',
        descricao:"",

    })
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    //const [selectedUf, setSelectedUf] = useState('0');
    //const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    
    const navigate = useNavigate();
    

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);

            setUfs(ufInitials);
        })
    }, []);

    // useEffect(() => {
    //     if (selectedUf === '0') {
    //         return;
    //     }

    //     axios
    //         .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    //         .then(response => {
    //             const cityNames = response.data.map(city => city.nome);


    //             setCities(cityNames);
    //         });
    // }, [selectedUf]);

    // function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    //     const uf = event.target.value;

    //     setSelectedUf(uf);
    // }

    // function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    //     const city = event.target.value;

    //     setSelectedCity(city);
    // }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value })
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ])
    }

    function handleTeste() {
        console.log("Teste");
    }

    function LocationMarker() {
        // const [position, setPosition] = useState<[number, number]>([0, 0]);

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

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const { nome, email, whatsapp, endereco, descricao } = formData;
        // const uf = selectedUf;
        // const city = selectedCity;
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
                            name="name"
                            id="name"
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
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
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
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="descricao">Descricao</label>
                        <textarea
                            name="descricao"
                            id="descricao"
                            onChange={handleTextAreaChange}
                        />
                    </div>

                    {/* <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf"
                                value={selectedUf}
                                onChange={handleSelectedUf}
                            >
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectedCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div> */}
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

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>

            </form>
        </div>
    );
};

export default CreatePoint;