import { useEffect, useState } from 'react'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarUsuarios() {
      const resposta = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      )

      const dados = await resposta.json()

      setUsuarios(dados)
      setCarregando(false)
    }

    buscarUsuarios()
  }, [])

  if (carregando) {
    return <p>Carregando...</p>
  }

  return (
    <ul>
      {usuarios.map(usuario => (
        <li key={usuario.id}>
          {usuario.name}
        </li>
      ))}
    </ul>
  )
}

export default App