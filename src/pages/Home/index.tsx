import React from "react";
import {Link} from 'react-router-dom';

import './styles.css';

import logo from '../../assets/icon.png';
import coletas from '../../assets/garbage-truck.png';
import pev from '../../assets/trash-can.png';
import fiscal from '../../assets/detetive.png';
import logoifmg from '../../assets/campus-ponte-nova.png';
 

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Conscientiza PN" />
          <p>Conscientiza PN</p>
        </header>

        <div className="body-page">
          <main>
            <h1>Projeto Conscientiza PN</h1>
            <p>
              Uma plataforma de apoio e fiscalização ao descarte {'\n'}
              de resíduos sólidos para a cidade de Ponte Nova
            </p>

            <div className="menus">
              <Link to="/list-coleta">
                <img src={coletas} alt="Cadastro de Coletas de Lixo" />
                <strong>Coletas</strong>
              </Link>

              <Link to="/list-point">
                <img src={pev} alt="Ponto de Entrega Voluntára" />
                <strong>PEV</strong>
              </Link>

              <Link to="/list-coleta">
                <img src={fiscal} alt="Cidadão Fiscal" />
                <strong>Cidadão Fiscal</strong>
              </Link>
            </div>
          </main>

          <div className="logos">
            <img src={logoifmg} alt="Conscientiza PN" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home;
