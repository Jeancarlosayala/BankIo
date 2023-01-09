import { useContext, useState } from "react"
import { UserContext } from "../context/user"
import { updateUser } from "../utils/firebase";

const updateDataInfo = {
  displayName: ''
}

export const EditInfo = () => {

  const { currentUser } = useContext(UserContext);
  const [displayNameUser, setDisplayNameUser] = useState(updateDataInfo)

  const handleChange = (e) => {
    const { value, name } = e.target;

    setDisplayNameUser({ ...displayNameUser, [name]: value });
  }

  const handleUpdate = (e) => {

    e.preventDefault()

    const id = currentUser.uid,
      { displayName } = displayNameUser;

    updateUser(id, displayName);
  }

  return (

    <>
      <form>
        <input onChange={handleChange} placeholder="usuario" name="displayName" />
        <button onClick={handleUpdate} type="submit">Editar</button>
      </form>
    </>
  )
}