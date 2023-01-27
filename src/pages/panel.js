import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom';

import { TransferContext } from '../context/transfers';
import { agregarCaracter, cartType, currencyFormat } from '../utils/creditCard'
import { apiService } from '../utils/apiServices';

import { RiRestaurantFill } from 'react-icons/ri'

import chip from '../images/chip.png'
import logo from '../images/banamex.png'
import mastercard from '../images/mastercard.png'

import '../styles/panel.scss'

export const Panel = () => {
  const { userInfo } = useContext(UserContext)
  const { historial } = useContext(TransferContext)

  const { cardNumber, displayName, uid } = userInfo;

  const [balance, setBalance] = useState(null);
  const [loader, setLoader] = useState(false)
  const [cardType, setCardType] = useState(null)
  const [formatCard, setFormatCard] = useState(null)


  useEffect(() => {
    setBalance(currencyFormat(+userInfo.balance))
    if (balance === '$NaN' || balance === null) return setLoader(true);
    setLoader(false)
    setCardType(cartType(cardNumber))
    setFormatCard(agregarCaracter(cardNumber, '-', 4));
  }, [balance, userInfo, cardNumber])

  return (
    <>
      {
        loader === false ? (
          <div className='panel'>
            <div className='panel--left'>
              <div className='panel__header'>
                <div className='panel__header__card'>
                  <div className='panel__header__card__type'>
                    <div className='panel__header__card__type__logo'>
                      <img src={logo} alt='logo' />
                      <span className='text--bold'>BankIo</span>
                    </div>

                    {
                      cardType === 'MasterCard' ?
                        <img className='mastercard' src={mastercard} alt={cardType} /> :
                        <span className='text--normal'>{cardType}</span>
                    }
                  </div>

                  <div className='panel__header__card__balance'>
                    <span className='text--bold'>{balance}</span>
                  </div>

                  <div className='panel__header__card__number'>
                    <span className='text--bold text--sm'>{formatCard}</span>
                    <img className='panel__header__card__number__chip' src={chip} alt='chip' />
                  </div>

                  <div className='panel__header__card__info'>
                    <div className='panel__header__card__info__beneficiary'>
                      <span className='text--bold text--xs'>Propietario</span>
                      <span className='text--normal text--xs'>{displayName}</span>
                    </div>
                    <div className='panel__header__card__info__other'>
                      <div className='panel__header__card__info__other__date'>
                        <span className='text--bold text--xs'>Fecha</span>
                        <span className='text--normal text--xs'>04/29</span>
                      </div>
                      <div className='panel__header__card__info__other__cvv'>
                        <span className='text--bold text--xs'>CVV</span>
                        <span className='text--normal text--xs'>780</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='panel__services'>
                <Services />
              </div>
            </div>

            <div className='panel--right'>
              <div className='panel__transactions'>
                <span className='text--bold text--sm'>Ultimas transacciones</span>
                {
                  historial.filter(item => item.sendTo === uid || item.sendBy === uid).map(({ quantityTransfer, uid, dateTransfer, sendTo, sendBy, subject }, index) => {
                    const date = new Date(dateTransfer.seconds * 1000).toLocaleDateString('en-us');
                    return (
                      <div key={index} className='panel__transactions__history'>
                        <div className='panel__transactions__history__short-info'>
                          <RiRestaurantFill className='panel__transactions__history__short-info__icon' />
                          <div className='panel__transactions__history__short-info__dateconcept'>
                            <span className='text--xs text--bold'>{subject}</span>
                            <span className='text--sxs text--normal text--gray'>{date}</span>
                          </div>
                        </div>

                        <div className='panel__transactions__history__card'>
                          <div className='panel__transactions__history__card__type'>
                            <img className='mastercard' src={mastercard} alt='card' />
                          </div>
                          <div className='panel__transactions__history__card__number'>
                            <span className='text--xs text--normal text--gray'>8686</span>
                          </div>
                        </div>

                        {
                          sendTo === userInfo.uid ?
                            <span className='text--bold text--xs text--light-green'>{quantityTransfer}</span>
                            : <span className='text--bold text--xs'>{quantityTransfer}</span>
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        ) : <h1 className='text--bold'>Cargando...</h1>
      }
    </>
  )
}

const Services = () => {
  return (
    <>
      <span className='text--bold text--md'>Servicios</span>

      <div className='panel__services__grid'>
        {
          apiService.map(({ name, id, img }) => {
            return (
              <div key={id} className='panel__services__grid__item'>
                <img className='margin__bottom--5' src={img} alt='service' />
                <span className='text--bold'>{name}</span>
                <Link to='#' className='text--normal button--outline-gray margin__top--10'>Comprar ahora</Link>
              </div>
            )
          })
        }
      </div>
    </>
  )
}