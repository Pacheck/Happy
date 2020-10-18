import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orfanatos-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orfanato {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

function OrfanatosMapa(){

    const [orfanatos, setOrfanatos] = useState<Orfanato[]>([]);

    useEffect(() => {
        api.get('/orfanatos').then(response => {
            setOrfanatos(response.data);
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>RJ</span>
                </footer>
            </aside>

            <Map 
                center={[-22.9261818,-43.2037672]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orfanatos.map(orfanato => {
                    return  (
                        <Marker icon={mapIcon} position={[orfanato.latitude,orfanato.longitude]} key={orfanato.id}>
                            <Popup className="map-popup" closeButton={false} minWidth={240} maxWidth={240} >
                                {orfanato.name}
                                <Link to={`/orfanatos/${orfanato.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}

            </Map>

            <Link to="/orfanatos/create" className="create-orfanatos">
                <FiPlus size={32} color="#FFF"/>
            </Link>


        </div>
    )
}

export default OrfanatosMapa;