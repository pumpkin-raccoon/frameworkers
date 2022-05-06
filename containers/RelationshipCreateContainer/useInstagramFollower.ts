import axios from "axios"

const useInstagramFollower = () => {
  const trackFollower = async (username: string) => {
    let followers: any[] = []
    let followings: any[] = []
    try {
      const res: any = await axios(`https://www.instagram.com/${username}/?__a=1`, {
        headers: {
          'Access-Control-Allow-Origin': "*"
        }
      })
      const userId = res.graphql.user.id
      console.log('res : ', res)
      let after = null
      let has_next = true
      while (has_next) {
        await fetch(`https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=` + encodeURIComponent(JSON.stringify({
          id: userId,
          include_reel: true,
          fetch_mutual: true,
          first: 50,
          after: after
        }))).then(res => res.json()).then(res => {
          has_next = res.data.user.edge_followed_by.page_info.has_next_page
          after = res.data.user.edge_followed_by.page_info.end_cursor
          followers = followers.concat(res.data.user.edge_followed_by.edges.map(({node}: any) => {
            return {
              username: node.username,
              full_name: node.full_name
            }
          }))
        })
      }
      console.log('Followers', followers)

      has_next = true
      after = null
      while (has_next) {
        await fetch(`https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=` + encodeURIComponent(JSON.stringify({
          id: userId,
          include_reel: true,
          fetch_mutual: true,
          first: 50,
          after: after
        }))).then(res => res.json()).then(res => {
          has_next = res.data.user.edge_follow.page_info.has_next_page
          after = res.data.user.edge_follow.page_info.end_cursor
          followings = followings.concat(res.data.user.edge_follow.edges.map(({node}: any) => {
            return {
              username: node.username,
              full_name: node.full_name
            }
          }))
        })
      }
      console.log('Followings', followings)
    } catch (err) {
      console.log('Invalid username')
    }
  }

  return {
    trackFollower,
  }
}

export default useInstagramFollower
