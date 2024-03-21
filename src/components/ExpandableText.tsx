import { useState } from 'react'

type Props = {
  text: string
}

const ExpandableText = ({ text }: Props) => {
  const limit = 50
  const [isExpanded, setExpanded] = useState(false)

  if (text.length <= limit) return <article>{text}</article>

  return (
    <div>
      {isExpanded ? <article>{text}</article> : <article>{text.substring(0, limit)}...</article>}
      <button className="btn" onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  )
}

export default ExpandableText
