import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { RelationshipPerson } from "types/relationship"
import { RELATIONSHIP_KEY } from "./constants"
import usePostRelationship from "./usePostRelationship"

const useRelationship = () => {
  const router = useRouter()
  const { name, instagram } = router.query
  const [people, setPeople] = useState<RelationshipPerson[]>([])
  const [targetIndex, setTargetIndex] = useState<number>(-1)
  const [openModal, setOpenModal] = useState(false)
  const [isToastOpened, setIsToastOpened] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const { postRelationship, isLoading } = usePostRelationship()

  const addPerson = () => {
    setOpenModal(true)
    openTargetPerson(-1)
  }

  const openTargetPerson = (index: number) => {
    setTargetIndex(index)
    setOpenModal(true)
  }

  const removePerson = (index: number) => {
    const newPeople = [...people]
    newPeople.splice(index, 1)
    setPeople(newPeople)
    savePeople(newPeople)
  }

  const hasInformation = (person: RelationshipPerson) => {
    return Boolean(
      person.age
      || person.gender
      || person.intimacy
      || (person.category?.length ?? 0) > 0
    )
  }

  const updatePerson = (person: RelationshipPerson) => {
    const newPeople = [...people]
    if (targetIndex < 0) {
      newPeople.push(person)
    } else {
      newPeople.splice(targetIndex, 1, person)
    }
    setPeople(newPeople)
    setOpenModal(false)
    savePeople(newPeople)
  }

  const savePeople = (newPeople: RelationshipPerson[]) => {
    localStorage.setItem(RELATIONSHIP_KEY, JSON.stringify(newPeople))
  }

  const fetchRelationship = () => {
    const savedRelationship = localStorage.getItem(RELATIONSHIP_KEY)
    if (savedRelationship) {
      const targetRelationship = JSON.parse(savedRelationship)
      setPeople(targetRelationship)
    }
  }

  const openToast = (message: string) => {
    setToastMessage(message)
    setIsToastOpened(true)
  }

  const handleSubmit = async () => {
    const result = await postRelationship({
      name: name?.toString() ?? '프레임워커스',
      people,
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
    people,
    addPerson,
    targetPerson: targetIndex >= 0
      ? people[targetIndex]
      : undefined,
    closeModal: () => setOpenModal(false),
    openModal,
    removePerson,
    hasInformation,
    updatePerson,
    openTargetPerson,
    handleSubmit,
    isLoading,
    setIsToastOpened,
    isToastOpened,
    toastMessage,
  }
}

export default useRelationship
