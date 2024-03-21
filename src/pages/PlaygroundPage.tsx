import SearchBox from '@/components/SearchBox'

const PlaygroundPage = () => {
  return (
    <SearchBox
      onChange={(term) => {
        console.log(term)
      }}
    />
  )
}

export default PlaygroundPage
