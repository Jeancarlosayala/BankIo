import React from 'react'
import { Link } from 'react-router-dom'

import bank from '../images/bank.svg'
import home from '../images/home.svg'
import money from '../images/money.svg'

import { BiBadgeCheck, BiDonateHeart, BiFingerprint, BiHistory, BiMoney, BiPhoneCall } from 'react-icons/bi'

import '../styles/home.scss'

export const Home = () => {
  // function currencyFormat(num) {
  //   return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  // }

  return (
    <>
      <section className='header'>
        <div className='header__text'>
          <span className='text--bold text--lg width--mx'>Tu banco seguro</span>
          <div className='header__text__options'>
            <span className='header__text__options__steps'>Transfiere</span>
            <i className="fa-solid fa-arrow-right header__text__options__arrow"></i>
            <span className='header__text__options__steps'>Recibe</span>
            <i className="fa-solid fa-arrow-right header__text__options__arrow"></i>
            <span className='header__text__options__steps'>Ahorra</span>
          </div>
        </div>
        <div className='header__image'>
          <img src={bank} alt="Phone illustration"></img>
        </div>
      </section>

      <section className='benefits'>
        <div className='benefits__texts'>
          <span className='text--sm text--green text--bold'>
            Obten cashback en todas tus compras
          </span>
          <span className='text--md text--bold'>
            Abre tu tarjeta gratis y obten nuestros beneficios
          </span>
          <span className='text--xs text--normal benefits__texts__info'>
            Aprovecha la tasa de interés fija anual desde 9.25% Solicita un crédito.
            Sin anualidad, segura y con beneficios exclusivos. Ahorra en dolares mientras
            proteges a tu familia
          </span>

          <span className='benefits__texts__check text--normal'>
            <i className="fa fa-check-circle text--green" aria-hidden="true"></i>
            Aprovacion rapida
          </span>
          <span className='benefits__texts__check text--normal'>
            <i className="fa fa-check-circle text--green" aria-hidden="true"></i>
            Compras en cualquier tienda
          </span>
          <span className='benefits__texts__check text--normal'>
            <i className="fa fa-check-circle text--green" aria-hidden="true"></i>
            Obten puntos para viajes
          </span>
          <Link className='benefits__texts__button'>Aplica ahora a BankIo</Link>
        </div>
        <div className='benefits__image'>
          <img src={home} alt="Phone illustration"></img>
        </div>
      </section>

      <section className='card'>
        <div className='card__background'>
          <div className='card__background__content'>
            <span className='text--lg text--bold'>Déjanos ayudarte</span>
            <span className='text--sm text--normal'>¿Perdiste tu tarjeta o tienes algún
              problema con tu cuenta?</span>
          </div>
        </div>
      </section>

      <section className='getBenefits'>
        <div className='getBenefits__text'>
          <span className='text--sm text--green text--bold'>Porque BankIo es tu mejor opcion</span>
          <span className='text--lg text--bold'>Grandes beneficios con BankIo</span>
        </div>
        <div className='getBenefits__grid'>
          <div className='getBenefits__grid__item'>
            <BiBadgeCheck className='getBenefits__grid__item--icon' />
            <span className='text--sm text--bold'>Aprovacion rápida</span>
          </div>
          <div className='getBenefits__grid__item'>
            <BiDonateHeart className='getBenefits__grid__item--icon' />
            <span className='text--sm text--bold'>Tu dinero seguro en todo momento</span>
          </div>
          <div className='getBenefits__grid__item'>
            <BiFingerprint className='getBenefits__grid__item--icon' />
            <span className='text--sm text--bold'>Accede desde cualquier lugar</span>
          </div>
          <div className='getBenefits__grid__item'>
            <BiHistory className='getBenefits__grid__item--icon' />
            <span className='text--sm text--bold'>Genera tu primer historial</span>
          </div>
          <div className='getBenefits__grid__item'>
            <BiPhoneCall className='getBenefits__grid__item--icon' />
            <span className='text--sm text--bold'>Asistencia las 24 horas</span>
          </div>
          <div className='getBenefits__grid__item'>
            <BiMoney className='getBenefits__grid__item--icon' />
            <span className='text--sm text--bold'>Obten cashback en todas tus compras</span>
          </div>
        </div>
      </section>

      <section className='ivaInfo'>
        <div className='ivaInfo__container'>
          <div className='ivaInfo__container__range'>
            <div className='ivaInfo__container__range__info'>
              <span className='text--normal ivaInfo__container__range__info__text'>
                Obten un prestamo hasta por:&nbsp;
                <span id='loanRangeValue' className='text--green text--bold'>
                  $20,000.00
                </span>
              </span>
              <input id='loanRange' defaultValue={60000} type='range' max='200000' />

              <div className='ivaInfo__container__range__info__card'>
                <span className='ivaInfo__container__range__info__card__title text--bold'>
                  Periodo
                </span>

                <div className='ivaInfo__container__range__info__card__radius text--normal text--sm'>
                  <input value={12} disabled type='radio' id='12' name='month' />
                  <label htmlFor='12'>1 año</label>
                </div>
                <div className='ivaInfo__container__range__info__card__radius text--normal text--sm'>
                  <input value={36} disabled type='radio' id='36' name='month' />
                  <label htmlFor='36'>3 años</label>
                </div>
                <div className='ivaInfo__container__range__info__card__radius text--normal text--sm'>
                  <input value={72} defaultChecked type='radio' id='72' name='month' />
                  <label htmlFor='72'>6 años</label>
                </div>
              </div>
            </div>
          </div>

          <div className='ivaInfo__container__image'>
            <img src={money} alt="Phone illustration"></img>
            <div className='ivaInfo__container__image__card'>
              <span className='text--normal text--xs margin__bottom--10'>
                Tu pago total es
              </span>
              <div className='ivaInfo__container__image__card__content'>
                <span id='loanTotal' className='text--bold text--green text--lg'>
                  $972
                </span>
                <div className='ivaInfo__container__image__card__content__rate margin__top--20'>
                  <div>
                    <span className='text--normal text--xs'>Tarifa</span>
                    <span className='text--bold text--green text--xs'>6.5%</span>
                  </div>
                  <div>
                    <span className='text--normal text--xs'>APR</span>
                    <span className='text--bold text--green text--xs'>4.25%</span>
                  </div>
                  <div>
                    <span className='text--normal text--xs'>Puntos</span>
                    <span className='text--bold text--green text--xs'>1.003</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='ivaInfo__container__image__card'>
              <span className='text--normal text--xs margin__bottom--10'>
                Tu pago total es
              </span>
              <div className='ivaInfo__container__image__card__content'>
                <span id='loanTotal' className='text--bold text--green text--lg'>
                  $972
                </span>
                <div className='ivaInfo__container__image__card__content__rate margin__top--20'>
                  <div>
                    <span className='text--normal text--xs'>Tarifa</span>
                    <span className='text--bold text--green text--xs'>6.5%</span>
                  </div>
                  <div>
                    <span className='text--normal text--xs'>APR</span>
                    <span className='text--bold text--green text--xs'>4.25%</span>
                  </div>
                  <div>
                    <span className='text--normal text--xs'>Puntos</span>
                    <span className='text--bold text--green text--xs'>1.003</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}