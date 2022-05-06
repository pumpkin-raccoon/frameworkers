import { useEffect, useState } from "react"
import { Relationship } from "types/relationship"
import { CATEGORY_SET } from "./constants"

interface UseRelationModalProps {
  opened: boolean
  inputRelation: Relationship
  updateRelation: (relation: Relationship) => void
}

const useRelationModal = ({
  opened,
  inputRelation,
  updateRelation
}: UseRelationModalProps) => {
  const [relation, setRelation] = useState<Relationship>(inputRelation)
  const [step, setStep] = useState<'info' | 'category'>('info')
  const [openToast, setOpenToast] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState(CATEGORY_SET)
  const [customCategoryMode, setCustomCategoryMode] = useState(false)
  const [customCategoryInput, setCustomCategoryInput] = useState('')

  const handleClick = () => {
    if (step === 'info') {
      setStep('category')
      return
    }
    if (!relation.name) {
      setOpenToast(true)
      return
    }
    updateRelation(relation)
    reset()
  }

  const reset = () => {
    setStep('info')
    setRelation({})
    setCustomCategoryInput('')
    setCustomCategoryMode(false)
  }

  const setRelationByKey = (key: keyof Relationship, value: Relationship[keyof Relationship]) => {
    setRelation({ ...relation, [key]: value })
  }

  const onClickCategory = (category: string) => {
    let newCategories = relation.category ?? []
    console.log('newCategories : ', newCategories)
    if (newCategories.includes(category)) {
      console.log('빼기')
      newCategories = newCategories.filter((c) => c !== category)
    } else {
      console.log('더하기')
      newCategories.push(category)
    }
    setRelationByKey('category', newCategories)
  }

  const setStepBack = () => {
    setStep('info')
  }

  const onClickCategoryInput = () => {
    if (customCategoryInput) {
      setCategoryOptions([...categoryOptions, customCategoryInput])
      onClickCategory(customCategoryInput)
    }
    setCustomCategoryMode(false)
    setCustomCategoryInput('')
  }

  useEffect(() => {
    if (opened && inputRelation.name) {
      setRelation(inputRelation)
    }
  }, [inputRelation, opened])

  return {
    openToast,
    closeToast: () => setOpenToast(false),
    handleClick,
    relation,
    setRelationByKey,
    step,
    reset,
    setStepBack,
    categoryOptions,
    onClickCategory,
    customCategoryMode,
    setCustomCategoryMode,
    customCategoryInput,
    setCustomCategoryInput,
    onClickCategoryInput,
  }
}

export default useRelationModal
