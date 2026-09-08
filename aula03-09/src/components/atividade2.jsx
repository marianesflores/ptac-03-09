import { useEffect, useState } from 'react'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        setCarregando(true)
        setErro(null)

        const resposta = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )

        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status}`)
        }

        const dados = await resposta.json()
        setUsuarios(dados)

      } catch (e) {
        setErro(e.message)

      } finally {
        setCarregando(false)
      }
    }

    buscarUsuarios()
  }, [])

  if (carregando) {
    return <p>Carregando...</p>
  }

  if (erro) {
    return <p>Erro: {erro}</p>
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