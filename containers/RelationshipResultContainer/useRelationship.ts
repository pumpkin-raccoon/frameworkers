import { useState } from "react"
import { Relationship } from "types/relationship"

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
    console.log('index : ', targetIndex)
    console.log('relation : ', relation)
    if (targetIndex < 0) {
      newRelations.push(relation)
    } else {
      newRelations.splice(targetIndex, 1, relation)
    }
    console.log('newRelations : ', newRelations)
    setRelations(newRelations)
    setOpenModal(false)
  }

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
