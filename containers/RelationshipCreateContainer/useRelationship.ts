import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { RelationshipPerson } from "types/relationship"
import useInstagramFollower from "./useInstagramFollower"
import usePostRelationship from "./usePostRelationship"

const useRelationship = () => {
  const router = useRouter()
  const { name, instagram } = router.query
  const RELATIONSHIP_KEY = `${name}_relationship`
  const [people, setPeople] = useState<RelationshipPerson[]>([])
  const [targetIndex, setTargetIndex] = useState<number>(-1)
  const [openModal, setOpenModal] = useState<'relation' | 'confirm' | undefined>(undefined)
  const [isToastOpened, setIsToastOpened] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const { 
    postRelationship, 
    isLoading,
  } = usePostRelationship()
  const {
    isAvailable,
    isLoadingAvailability,
    isLoadingProfile,
    profileFollower,
  } = useInstagramFollower(instagram?.toString() ?? '')

  const addPerson = () => {
    if (isLoadingProfile) {
      openToast('인스타그램 팔로워를 불러오고 있습니다.. 잠시만 기다려주세요:)')
      return
    }
    openTargetPerson(-1)
  }

  const openTargetPerson = (index: number) => {
    setTargetIndex(index)
    setOpenModal('relation')
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
    setOpenModal(undefined)
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

  const postRequest = async () => {
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

  const handleSubmit = async () => {
    setOpenModal('confirm')
  }

  useEffect(() => {
    fetchRelationship()
  }, [])

  useEffect(() => {
    console.log('insta loading : ', isLoadingProfile, profileFollower, instagram)
    if (!isLoadingAvailability && !isAvailable && instagram) {
      openToast('현재 인스타그램 정보를 읽어올 수 없어요 :(')
    }
  }, [isLoadingAvailability, isAvailable, instagram])

  useEffect(() => {
    console.log('insta follower : ', isLoadingProfile, profileFollower, instagram)
    if (!isLoadingProfile && instagram) {
      if (profileFollower) {
        // follower를 people에 추가하기
      } else {
        openToast('현재 인스타그램 정보를 읽어올 수 없습니다 :(')
      }
    }
  }, [isLoadingProfile, profileFollower, instagram])

  return {
    people,
    addPerson,
    targetPerson: targetIndex >= 0
      ? people[targetIndex]
      : undefined,
    closeModal: () => setOpenModal(undefined),
    openModal,
    removePerson,
    hasInformation,
    updatePerson,
    openTargetPerson,
    handleSubmit,
    isLoading,
    isLoadingProfile,
    isLoadingAvailability,
    setIsToastOpened,
    isToastOpened,
    toastMessage,
    postRequest,
    shouldRenderPeople: !isLoadingProfile && people.length > 0,
    shouldRenderEmpty: !isLoadingProfile && people.length === 0,
  }
}

export default useRelationship
