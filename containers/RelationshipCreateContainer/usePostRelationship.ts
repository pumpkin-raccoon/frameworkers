import { useMutation } from "react-query"
import { Relationship } from "types/relationship"
import { getAxiosRequest } from "utils/axios"

interface PostRelationshipParams {
  name: string
  people: Relationship[]
}

const usePostRelationship = () => {
  const {
    mutateAsync,
    isLoading,
  } = useMutation(
    ({ name, people }: PostRelationshipParams) => getAxiosRequest({
      method: 'POST',
      url: 'relationship-diagram/',
      data: {
        name,
        people
      }
    })
  )

  return {
    isLoading,
    postRelationship: mutateAsync
  }
}

export default usePostRelationship
