import { useState } from "react"

const useRelationship = () => {
  const [relations, setRelations] = useState('')

  return {
    relations,
  }
}

export default useRelationship
