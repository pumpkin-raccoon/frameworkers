import { useMemo } from "react"
import { useQuery } from "react-query"
import { Relationship } from "types/relationship"
import { getAxiosRequest } from "utils/axios"

const useGetRelationship = (relationshipKey: string) => {
  const {
    data,
    isLoading,
    error,
  } = useQuery(
    ['relationship', relationshipKey],
    () => getAxiosRequest({ method: 'get', url: `relationship-diagram/${relationshipKey}` }),
    { enabled: Boolean(relationshipKey) }
  )

  const relationship: Relationship | undefined = useMemo(() => {
    const rawResponse = data?.data
    return rawResponse
      ? {
        name: rawResponse.name,
        people: JSON.parse(rawResponse.people.replace(/\'/g, '"')),
        url: rawResponse.url
      }
      : undefined
  }, [data])

  return {
    isLoading,
    relationship,
    error,
  }
}

export default useGetRelationship
