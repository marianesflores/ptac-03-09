import { useEffect, useState } from 'react'

function StatusAPI({ carregando, erro, usuarios }) {
  if (carregando) {
    return <p>Carregando...</p>
  }

  if (erro) {
    return <p>Erro: {erro}</p>
  }

  if (usuarios.length === 0) {
    return <p>Nenhum item encontrado.</p>
  }

  return <p>Sucesso: {usuarios.length} itens carregados.</p>
}

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const controle = new AbortController()

    async function buscarUsuarios() {
      try {
        setCarregando(true)
        setErro(null)

        await new Promise(resolve =>
          setTimeout(resolve, 1000)
        )

        const resposta = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          {
            signal: controle.signal
          }
        )

        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status}`)
        }

        const dados = await resposta.json()
        setUsuarios(dados)

      } catch (e) {
        if (e.name !== 'AbortError') {
          setErro(e.message)
        }

      } finally {
        setCarregando(false)
      }
    }

    buscarUsuarios()

    return () => controle.abort()
  }, [])

  return (
    <main>
      <h1>Status da API</h1>

      <StatusAPI
        carregando={carregando}
        erro={erro}
        usuarios={usuarios}
      />
    </main>
  )
}

export default App