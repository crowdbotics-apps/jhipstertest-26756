import './home.scss';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  const language = "eng";

  const handleSubmit = (formData) => {
    formData.preventDefault();
    formData.stopPropagation();
    const data = {
      name: formData.target[0].value,
      email: formData.target[1].value,
      subject: formData.target[2].value,
      phone: formData.target[3].value,
      description: formData.target[4].value,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(
      "https://tiny-tooth-23374.botics.co/api/v1/request_demo/",
      requestOptions
    )
      .then((response) => response.json())
      .then((data1) => {
        alert(data1);
        formData.target[0].value = "";
        formData.target[1].value = "";
        formData.target[2].value = "";
        formData.target[3].value = "";
        formData.target[4].value = "";
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <main id="main">
        <div className="home-hero">
          <video width="100%" height="100%" autoPlay loop>
            <source src="../../../content/images/back.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay">
            {language ? (
              <h1>
                FMC COMPLIANCE
                <br />
                MADE FAST & SIMPLE
              </h1>
            ) : (
              <h1>
               CUMPLIMIENTO FMC
                <br />
                HECHO RÁPIDO & SIMPLE
              </h1>
            )}
          </div>
        </div>

        <section id="our-service">
          <div className="container-fluid our-services">
            <div className="">
              <div className="title-wrapper">
                <h1 className="title-wrapper-text main-heading">
                  {language ? "Client Portal" : "Portal del cliente"}
                </h1>
              </div>
              <div className="container">
                <div className="our-services-inner">
                  <div className="row">

                    <div className="col-md-12 text-center service-desktop">
                      <img
                        src="../../../content/images/desktop.png"
                        className="img-fluid"
                        max-width="700"
                      />
                      <p>
                        <a className="service-try" href="">
                          {language ? "TRY A DEMO" : "PROBAR UNA DEMO"}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="meet-apps">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrapper">
                  <h1 className="title-wrapper-text main-heading">
                    {language ? "MEET AP TARIFFS" : "CUMPLE LAS TARIFAS AP"}
                  </h1>
                </div>

                <div className="container meet-apps-features">
                  <div className="row">
                    <div className="col-md-4 meet-apps-features-inner">
                      <div className="icon-box">
                        <img
                          alt=""
                          src="../../../content/images/img/icons/m1.png"
                          className="img-fluid"
                        />
                        <h3>{language ? "OUR STORY" : "NUESTRA HISTORIA"}</h3>
                        <p>
                          {language
                            ? "AP Tariffs, Inc. se estableció en 1997 con la misión de ayudar a los clientes a cumplir con las regulaciones de FMC de EE. UU. La empresa ofrece servicios de adquisición de licencias FMC, publicación de tarifas NVOCC y gestión de cumplimiento. Durante sus 23 años de historia, AP Tariffs ha trabajado incansablemente para brindar asistencia experta en tarifas de FMC, regulaciones de contratos de servicio, auditorías de FMC y los requisitos de licencia para los intermediarios de transporte marítimo (OTI) con el fin de ayudar a los clientes a evitar sanciones de cumplimiento. La compañía sirve a una amplia gama de transportistas marítimos, transitarios, NVOCC y abogados marítimos."
                            : "AP Tariffs, Inc. was established in 1997 with a mission to help clients comply with US FMC regulations. The company offers FMC license procurement, NVOCC tariff publication, and compliance management services. During its 23-year history, AP Tariffs has worked tirelessly to provide expert assistance on FMC tariffs, service contract regulations, FMC audits, and the licensing requirements for Ocean Transportation Intermediaries (OTIs) in order to help clients avoid compliance penalties. The company serves a wide range of ocean carriers, forwarders, NVOCCs, and maritime attorneys."}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-4 meet-apps-features-inner">
                      <div className="icon-box">
                        <img
                          alt=""
                          src="../../../content/images/img/icons/m2.png"
                          className="img-fluid"
                        />
                        <h3>{language ? "OUR VISION" : "NUESTRA VISIÓN"}</h3>
                        <p>
                          {language
                            ? "AP Tariffs, Inc. proporciona a los transportistas marítimos y NVOCC servicios convenientes y rentables de mantenimiento de tarifas FMC y consultoría de cumplimiento (2 horas gratis al mes) con las regulaciones de la Comisión Federal Marítima de EE. UU. (FMC)."
                            : "AP Tariffs, Inc. provides Ocean Carriers, and NVOCCs with a convenient and cost-effective services of maintaining FMC tariffs and compliance consulting (2-hours free/month) with the regulations of the U.S. Federal Maritime Commission (FMC)."}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-4 meet-apps-features-inner">
                      <div className="icon-box">
                        <img
                          alt=""
                          src="../../../content/images/img/icons/m3.png"
                          className="img-fluid"
                        />
                        <h3>
                          {language
                            ? "OUR TECHNOLOGY"
                            : "NUESTRA TECNOLOGIA"}
                        </h3>
                        <p>
                          {language
                            ? "AP Tariffs Inc. ofrece publicación de tarifas de pago por archivo, así como un sistema automatizado de presentación de contratos oceánicos de última generación que elimina la necesidad de presentar tarifas individuales. Esta tecnología de automatización permite a nuestros clientes reducir significativamente los costos laborales asociados con la presentación de tarifas, al tiempo que aumenta el cumplimiento de la empresa."
                            : "AP Tariffs Inc. offers both pay per file tariff publication, as well as a state of the art automated Ocean Contract filing system that eliminates the need to submit individual rates. This automation technology enables our clients to significant reduce labor costs associated with rate filings, while increasing a company's compliance."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="hp-client">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrapper">
                  <h1 className="title-wrapper-text main-heading">
                    {language
                      ? "AP TARIFF CLIENTS"
                      : "CLIENTES DE TARIFA AP"}
                  </h1>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-4 client-logo-box">
                  <img src="../../../content/images/img/icons/cl1.png" className="img-fluid" />
                </div>
                <div className="col-md-4 client-logo-box">
                  <img src="../../../content/images/img/icons/cl2.png" className="img-fluid" />
                </div>
                <div className="col-md-4 client-logo-box">
                  <img src="../../../content/images/img/icons/cl3.png" className="img-fluid" />
                </div>
                <div className="col-md-4 client-logo-box">
                  <img src="../../../content/images/img/icons/cl4.png" className="img-fluid" />
                </div>
                <div className="col-md-4 client-logo-box">
                  <img src="../../../content/images/img/icons/cl5.png" className="img-fluid" />
                </div>
                <div className="col-md-4 client-logo-box">
                  <img src="../../../content/images/img/icons/cl6.png" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="hp-stay-intouch">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrapper">
                  <h1 className="title-wrapper-text main-heading">
                    {language ? "STAY IN TOUCH" : "MANTENTE EN CONTACTO"}
                  </h1>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="hp-stay-intouch-cont">
                    {language ? (
                      <>
                        <a
                          className="stay-intouch-link"
                          href="tel:+1-305-610-2244"
                        >
                          +1-305-610-2244
                        </a>
                        <p className="stay-intouch-para">
                          10111 NW 24th Place <br />
                          Suite 408 <br />
                          Sunrise, FL 33322 USA
                        </p>
                        <a
                          className="stay-intouch-link"
                          href="mailto:info@aptariffs.com"
                        >
                          info@aptariffs.com
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          className="stay-intouch-link"
                          href="tel:+1-305-610-2244"
                        >
                          +1-305-610-2244
                        </a>
                        <p className="stay-intouch-para">
                          10111 NW 24th Place <br />
                          Suite 408 <br />
                          Sunrise, FL 33322 USA
                        </p>
                        <a
                          className="stay-intouch-link"
                          href="mailto:info@aptariffs.com"
                        >
                          info@aptariffs.com
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="hp-req-demo">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrapper">
                  <h1 className="title-wrapper-text main-heading">
                    {language ? "REQUEST A DEMO" : "SOLICITE UNA DEMO"}
                  </h1>
                </div>
              </div>
            </div>

            <div className="container hp-req-demo-cont">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    {language
                      ? "Please fill your contact details below"
                      : "Por favor complete sus datos de contacto a continuación"}
                  </p>

                  <form onSubmit={handleSubmit} role="form">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control textfield"
                        name=""
                        id=""
                        placeholder={language ? "Name" : "Nombre"}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control textfield"
                        name=""
                        id=""
                        placeholder={language ? "Email" : "Email"}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control textfield"
                        name=""
                        id=""
                        placeholder={language ? "Subject" : "Sujeto"}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control textfield"
                        name=""
                        id=""
                        placeholder={language ? "Phone" : "Teléfono"}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control textfield"
                        name=""
                        id=""
                        placeholder={
                          language ? "Description" : "Descripción"
                        }
                      />
                    </div>

                    <p>
                        <a className="submit" href="">
                          {language ? "SUBMIT" : "ENVIAR"}
                        </a>
                      </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
