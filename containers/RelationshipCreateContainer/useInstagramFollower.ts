import axios from "axios"
import { useQuery } from "react-query"
import { getAxiosRequest } from "utils/axios"

const useInstagramFollower = (profileName: string) => {
  const {
    data: isAvailable,
    isLoading: isLoadingAvailability
  } = useQuery(
    ['InstagramAvailability', profileName],
    () => getAxiosRequest({
      method: 'get',
      url: `https://3.39.80.34:5000/possibility`
    }),
    { enabled: Boolean(profileName), retry: false }
  )

  const {
    data: profileFollower,
    isLoading: isLoadingProfile
  } = useQuery(
    ['InstagramProfile', profileName],
    () => getAxiosRequest({
      method: 'get',
      url: `https://3.39.80.34:5000/?user_id=${profileName}`
    }),
    { enabled: Boolean(profileName), retry: false }
  )

  return {
    isAvailable,
    isLoadingAvailability,
    isLoadingProfile,
    profileFollower,
  }
}

export default useInstagramFollower
