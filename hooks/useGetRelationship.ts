import { useQuery } from "react-query"
import { Relationship } from "types/relationship"
import { getAxiosRequest } from "utils/axios"

const useGetRelationship = (relationshipKey: string) => {
  const {
    data,
    isLoading,
    error,
  } = useQuery<{ data: Relationship }>(
    ['relationship', relationshipKey],
    () => getAxiosRequest({ method: 'get', url: `relationship-diagram/${relationshipKey}` }),
    {
      enabled: Boolean(relationshipKey),
    }
  )

  return {
    isLoading,
    relationship: data?.data,
    error,
  }
}

export default useGetRelationship
