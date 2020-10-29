import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: "https://github.com/Emerson-Sacono/conceitos-nodejs",
      techs: "ReactJS",
      likes: 0
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id, index) {
    // TODO
    repositories.splice(index,1)
    await api.delete(`repositories/${id}`)

    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((respository, index) => {
          return (
            <li key={respository.id}>
              {respository.title}

              <button onClick={() => handleRemoveRepository(respository.id, index)}>Remover</button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
