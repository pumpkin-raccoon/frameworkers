import { useEffect, useState } from "react"
import { Relationship } from "types/relationship"
import { RELATIONSHIP_KEY } from "./constants"

const useRelationship = () => {
  const [relations, setRelations] = useState<Relationship[]>([])
  const [targetIndex, setTargetIndex] = useState<number>(-1)
  const [openModal, setOpenModal] = useState(false)

  const addRelation = () => {
    setOpenModal(true)
    openTargetRelation(-1)
  }

  const openTargetRelation = (index: number) => {
    setTargetIndex(index)
    setOpenModal(true)
  }

  const removeRelation = (index: number) => {
    const newRelations = [...relations]
    newRelations.splice(index, 1)
    setRelations(newRelations)
  }

  const hasInformation = (relation: Relationship) => {
    return Boolean(
      relation.age
      || relation.gender
      || relation.intimacy
      || (relation.category?.length ?? 0) > 0
    )
  }

  const updateRelationship = (relation: Relationship) => {
    const newRelations = [...relations]
    if (targetIndex < 0) {
      newRelations.push(relation)
    } else {
      newRelations.splice(targetIndex, 1, relation)
    }
    setRelations(newRelations)
    setOpenModal(false)
    localStorage.setItem(RELATIONSHIP_KEY, JSON.stringify(newRelations))
  }

  const fetchRelationship = () => {
    const savedRelationship = localStorage.getItem(RELATIONSHIP_KEY)
    if (savedRelationship) {
      const targetRelationship = JSON.parse(savedRelationship)
      setRelations(targetRelationship)
    }
  }

  useEffect(() => {
    fetchRelationship()
  }, [])

  return {
    relations,
    addRelation,
    targetRelation: targetIndex >= 0
      ? relations[targetIndex]
      : undefined,
    closeModal: () => setOpenModal(false),
    openModal,
    removeRelation,
    hasInformation,
    updateRelationship,
    openTargetRelation,
  }
}

export default useRelationship
