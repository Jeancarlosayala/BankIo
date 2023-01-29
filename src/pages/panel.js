import { useContext, useEffect, useState } from 'react';

import CurrencyFormat from 'react-currency-format';
import { TransferContext } from '../context/transfers';
import { UserContext } from '../context/user';
import { apiService } from '../utils/apiServices';

import { RiRestaurantFill } from 'react-icons/ri'
import { hideNumberCard } from '../utils/creditCard';
import { CardNormal, CardShadow, HeaderOutline } from '../styles/Cards';
import { FlexCenter } from '../styles/Flex';
import { CustomInput, LinkButton, LinkText, SearchButton } from '../styles/Elements';

import { AiOutlineSearch } from 'react-icons/ai'
import mastercard from '../images/mastercard.png'
import '../styles/panel.scss'




export const Panel = () => {
  const { userInfo } = useContext(UserContext)
  const { historial } = useContext(TransferContext)
  const [newApiServices, setNewApiServices] = useState(apiService)

  const { uid, cardNumber } = userInfo;

  const [balance, setBalance] = useState(0);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setBalance(userInfo.balance)
    if (balance === undefined || balance === null) return setLoader(true);
    setLoader(false)
  }, [balance, userInfo])

  if (loader) return <h1 className='text--bold'>Cargando...</h1>;
  const newApi = newApiServices.filter((_, idx) => idx < 4);

  return (
    <>
      <div className='panel'>
        <div className='panel--left'>
          <FlexCenter content='center' items='center' margin_bottom='20px'>
            <CardShadow padding='20px'>
              <div className='panel__header__card__type'>
                <div className='panel__header__card__type__logo'>
                  <span className='text--normal text--sm'>Dinero disponible en BankIo</span>
                </div>
              </div>
              <div className='panel__header__card__balance'>
                <CurrencyFormat
                  value={balance}
                  displayType='text'
                  thousandSeparator={true}
                  prefix={'$'}
                  renderText={value => <span className='text--bold'>{value}</span>}
                />
              </div>
            </CardShadow>
          </FlexCenter>

          <FlexCenter content='center' items='center' margin_bottom='20px'>
            <CardShadow padding='20px'>
              <FlexCenter content='center' items='center' gap='10px'>
                <LinkButton rounded='3px' className='text--bold' to='/'>Transferir dinero</LinkButton>
                <LinkButton rounded='3px' to='#' className='text--bold'>Pedir un prestamo</LinkButton>
              </FlexCenter>
            </CardShadow>
          </FlexCenter>

          <FlexCenter content='center' items='center'>
            <CardNormal padding='20px'>
              <FlexCenter items='center' content='center'>
                <FlexCenter
                  direction='row'
                  border='1px solid #cacaca !important'
                  rounded='5px'
                  margin_bottom='15px'
                  items='center'
                  content='center'>
                  <CustomInput placeholder='Paga tus servicios sin salir de casa'
                    onChange={(e) => {
                      const searchService = apiService.filter((service, idx) => {
                        return service.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
                      })
                      setNewApiServices(searchService)
                    }} />
                  <SearchButton type='submit' font_size='20px'>
                    <AiOutlineSearch />
                  </SearchButton>
                </FlexCenter>

                {
                  newApi.map(({ id, name, img }) => {
                    return (
                      <FlexCenter
                        key={id}
                        border_bottom='1px solid #cacaca'
                        padding='10px 0px'>
                        <LinkText to={`/service/${name.toLocaleLowerCase()}`}>
                          <FlexCenter direction='row' items='center'>
                            <img src={img} alt={name} className='service-image' />
                            <span className='text--normal margin__left--10'>{name}</span>
                          </FlexCenter>
                        </LinkText>
                      </FlexCenter>
                    )
                  })
                }

                <FlexCenter padding='10px 0 0 0'>
                  <LinkText className='text--normal' color='#4299fd'>
                    Ver todos ({apiService.length})
                  </LinkText>
                </FlexCenter>
              </FlexCenter>
            </CardNormal>
          </FlexCenter>
        </div>

        <div className='panel--right'>
          <CardShadow>
            <HeaderOutline padding='15px 20px' border_bottom='1px solid #dbdbdb'>
              <span className='text--bold text--sm'>Ultima actividad</span>
            </HeaderOutline>

            {
              historial.filter(item => item.sendTo === uid || item.sendBy === uid).map(({ quantityTransfer, dateTransfer, sendTo, subject }, index) => {
                const date = new Date(dateTransfer.seconds * 1000).toLocaleDateString('en-us');
                return (
                  <div key={index} className='transactions'>
                    <div className='transactions__short-info'>
                      <RiRestaurantFill className='transactions__short-info__icon' />
                      <div className='transactions__short-info__dateconcept'>
                        <span className='text--xs text--bold'>{subject}</span>
                        <span className='text--sxs text--normal text--gray'>{date}</span>
                      </div>
                    </div>

                    <div className='transactions__card'>
                      <div className='transactions__card__type'>
                        <img className='mastercard' src={mastercard} alt='card' />
                      </div>
                      <div className='transactions__card__number'>
                        <span className='text--xs text--normal text--gray'>{hideNumberCard(cardNumber)}</span>
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
          </CardShadow>
        </div>
      </div>
    </>
  )
}