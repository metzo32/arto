import LoadArticleCards from '../components/LoadArticleCards'
import { ScrollArticle } from '../components/FramerMotions/scrollArticle'

export default function Article() {
  return (
    <ScrollArticle>
      <LoadArticleCards/>
    </ScrollArticle>
  )
}
