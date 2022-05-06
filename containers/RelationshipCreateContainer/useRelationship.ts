import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Relationship } from "types/relationship"
import { RELATIONSHIP_KEY } from "./constants"
import usePostRelationship from "./usePostRelationship"

const useRelationship = () => {
  const router = useRouter()
  const { name, instagram } = router.query
  const [relations, setRelations] = useState<Relationship[]>([])
  const [targetIndex, setTargetIndex] = useState<number>(-1)
  const [openModal, setOpenModal] = useState(false)
  const [isToastOpened, setIsToastOpened] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const { postRelationship, isLoading } = usePostRelationship()

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
    saveRelationship(newRelations)
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
    saveRelationship(newRelations)
  }

  const saveRelationship = (newRelations: Relationship[]) => {
    localStorage.setItem(RELATIONSHIP_KEY, JSON.stringify(newRelations))
  }

  const fetchRelationship = () => {
    const savedRelationship = localStorage.getItem(RELATIONSHIP_KEY)
    if (savedRelationship) {
      const targetRelationship = JSON.parse(savedRelationship)
      setRelations(targetRelationship)
    }
  }

  const openToast = (message: string) => {
    setToastMessage(message)
    setIsToastOpened(true)
  }

  const handleSubmit = async () => {
    const result = await postRelationship({
      name: name?.toString() ?? '프레임워커스',
      people: relations
    })
    const targetPath = result?.data?.url
    if (!targetPath) {
      openToast('요청에 실패했어요 :(')
      return
    }
    localStorage.removeItem(RELATIONSHIP_KEY)
    router.push(`/relationship/${targetPath}`)
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
    handleSubmit,
    isLoading,
    setIsToastOpened,
    isToastOpened,
    toastMessage,
  }
}

export default useRelationship
