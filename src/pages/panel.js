import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user';
import { currencyFormat, uuid } from '../utils/creditCard'
import { executeTransfer } from '../utils/firebase';

const creditCardInfo = {
  cardNumber: '',
  quantityBalance: ''
};

export const Panel = () => {
  const { userInfo, userInfoTransfer, currentUser } = useContext(UserContext)
  const [balance, setBalance] = useState(null);
  const [loader, setLoader] = useState(false)
  const [formField, setFormField] = useState(creditCardInfo);
  const [userTransfer, setUserTransfer] = useState([])


  useEffect(() => {
    setBalance(currencyFormat(+userInfo.balance))
    if (balance === '$NaN' || balance === null) return setLoader(true);
    setLoader(false)
  })

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormField({ ...formField, [name]: value });
  }

  const findUserTransfer = (e) => {
    e.preventDefault()

    const userInfo = userInfoTransfer.filter(user => user.cardNumber === formField.cardNumber);
    setUserTransfer(userInfo)
  }

  const transfer = (e) => {
    e.preventDefault()
    const quantity = formField.quantityBalance;
    
    const userId = currentUser.uid;
    const userTransferId = userTransfer[0].uid
    const newQuantityBalanceUser = userInfo.balance - formField.quantityBalance;
    const newQuantityBalanceUserTransfer = +userTransfer[0].balance + +formField.quantityBalance;
    if (formField.quantityBalance < 100 ) return alert('La cantidad minima es 100');
    if (formField.quantityBalance > userInfo.balance ) return alert('No cuentas con esa cantidad');

    executeTransfer(userId, userTransferId, newQuantityBalanceUser, newQuantityBalanceUserTransfer, uuid(), quantity)
    e.target.disabled = true;
    setTimeout(() => {
      window.location.replace('/panel')
    }, 2000);
  }

  return (
    <>
      {
        loader === false ? (
          <>
            <h1>{balance}</h1>
            <form>
              {
                userTransfer.length > 0 && userTransfer[0].cardNumber != userInfo.cardNumber ?
                  (
                    <>
                      <form>
                        <input onChange={handleChange}
                          name='quantityBalance'
                          placeholder='Cantidad a depositar'
                          type='number' />
                        <button onClick={transfer}>Transferir</button>
                      </form>
                    </>
                  ) : userTransfer.length > 0 ?
                    <h1>Porfavor utiliza un numero diferente al de tu tarjeta</h1> :
                    <h1>No se ah encontrado un usuario</h1>
              }
              <input onChange={handleChange} name='cardNumber' placeholder='Numero de tarjeta' type='text' />
              <button onClick={findUserTransfer}>Buscar</button>
            </form>
          </>
        ) : <h1>Cargando...</h1>
      }

    </>
  )
}