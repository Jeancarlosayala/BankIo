import { useContext, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { CardNormal } from '../styles/Cards'
import { FlexCenter } from '../styles/Flex'

import { UserContext } from '../context/user';
import { uuid } from '../utils/creditCard'
import { executeTransfer } from '../utils/firebase';
import { CustomButton, Input } from '../styles/Elements';

import image from '../images/transfer.png'
import '../styles/panelTransfer.scss'

const creditCardInfo = {
  cardNumber: '',
  quantityBalance: ''
};

export const PanelTransfer = () => {
  const { userInfo, userInfoTransfer, currentUser } = useContext(UserContext)
  const [balance, setBalance] = useState(0);
  const [loader, setLoader] = useState(false)
  const [formField, setFormField] = useState(creditCardInfo);
  const [userTransfer, setUserTransfer] = useState([])
  const [message, setMessage] = useState('')
  const [transferStatus, setTransferStatus] = useState(false);

  useEffect(() => {
    setBalance(userInfo.balance)
    if (balance === undefined || balance === null) return setLoader(true);
    setLoader(false)
  }, [balance, userInfo])

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormField({ ...formField, [name]: value });
  }

  const findUserTransfer = (e) => {
    e.preventDefault()

    const userInfo = userInfoTransfer.filter(user => user.cardNumber === formField.cardNumber);
    setUserTransfer(userInfo)

    if (userInfo.length < 1) return setMessage('No existe');
    if (userInfo[0].uid === currentUser.uid) return setMessage('Porfavor ingresa un usuario diferente al tuyo');
    if (userInfo.length >= 1 && userInfo[0].uid !== currentUser.uid) return setTransferStatus(true)
  }

  const transfer = (e) => {
    e.preventDefault()
    const quantity = formField.quantityBalance;
    const userId = currentUser.uid;
    const userTransferId = userTransfer[0].uid
    const newQuantityBalanceUser = userInfo.balance - formField.quantityBalance;
    const newQuantityBalanceUserTransfer = +userTransfer[0].balance + +formField.quantityBalance;
    if (formField.quantityBalance < 100) return alert('La cantidad minima es 100');
    if (formField.quantityBalance > userInfo.balance) return alert('No cuentas con esa cantidad');

    executeTransfer(userId, userTransferId, newQuantityBalanceUser, newQuantityBalanceUserTransfer, uuid(), quantity)
    e.target.disabled = true;
    setTimeout(() => {
      window.location.replace('/panel')
    }, 2000);
  }
  if (loader) return <h1 className='text--bold'>Cargando...</h1>;

  return (
    <>
      <FlexCenter items='center' content='center' direction='row' direction_mb='column-reverse'>
        <CardNormal width='35%' height='100%' width_mb='100%' height_mb='30%' bg_mb='#fff'
          bg='linear-gradient(#53abe7, #3b7fe7, #27dc9b)'
          rounded='0'>
          <img className='imageTransfer' alt='transfer' src={image} />
        </CardNormal>
        <CardNormal height='100%' width='65%' rounded='0' width_mb='100%'>
          <FlexCenter
            items='center'
            content='center'
            direction='column'
            width='60%'
            margin_left='auto'
            margin_right='auto'>

            {!transferStatus && <span className='text--normal text--lg'>{message}</span>}

            <CurrencyFormat
              value={balance}
              displayType='text'
              thousandSeparator={true}
              prefix={'$'}
              renderText={value => <span className='text--bold text--lg'>{value}</span>} />

            <form className='width--100'>
              <FlexCenter direction='column' padding='10px' items='center' content='center' width='auto'>
                <Input
                  placeholder={userTransfer[0] ? userTransfer[0].uid : 'ID de usuario'}
                  border='1px solid #c3c3c3'
                  padding='8px'
                  rounded='5px'
                  name='quantityBalance'
                  type='number'
                  width='-webkit-fill-available'
                  disabled
                />
                <Input
                  placeholder={userTransfer[0] ? userTransfer[0].displayName : 'Nombre'}
                  border='1px solid #c3c3c3'
                  padding='8px'
                  rounded='5px'
                  name='quantityBalance'
                  type='number'
                  width='-webkit-fill-available'
                  disabled
                  margin='10px 0'
                />
                <Input
                  onChange={handleChange}
                  className={userTransfer[0] && userTransfer[0].uid !== currentUser.uid ? 'display--none' : ''}
                  border='1px solid #c3c3c3'
                  padding='8px'
                  rounded='5px'
                  name='cardNumber'
                  placeholder='Numero de tarjeta'
                  type='text'
                  width='-webkit-fill-available'
                  maxLength='16'
                />

                <Input onChange={handleChange}
                  className={userTransfer[0] && userTransfer[0].uid !== currentUser.uid ? '' : 'display--none'}
                  name='quantityBalance'
                  placeholder='Cantidad a depositar'
                  border='1px solid #c3c3c3'
                  padding='8px'
                  rounded='5px'
                  margin='0 0 10px 0'
                  width='-webkit-fill-available'
                  type='number' />

                <CustomButton
                  width='-webkit-fill-available'
                  className={userTransfer[0] && userTransfer[0].uid !== currentUser.uid ? 'text--bold' : 'display--none'}
                  disabled={userTransfer[0] && userTransfer[0].uid !== currentUser.uid ? false : true}
                  onClick={transfer}>Transferir</CustomButton>

                <CustomButton
                  width='-webkit-fill-available'
                  className={userTransfer[0] && userTransfer[0].uid !== currentUser.uid ? 'text--bold' : 'display--none'}
                  margin='10px 0'
                  background='#FF7070'
                  background_hover='#FF3838'
                  color='white'
                  onClick={(e) => {
                    e.preventDefault()
                    setUserTransfer([])
                  }}>cancelar</CustomButton>

                <CustomButton
                  className={userTransfer[0] && userTransfer[0].uid !== currentUser.uid ? 'display--none' : ''}
                  margin='10px 0'
                  width='-webkit-fill-available'
                  onClick={findUserTransfer}>Buscar</CustomButton>
              </FlexCenter>
            </form>
          </FlexCenter>
        </CardNormal>
      </FlexCenter>
    </>
  )
}