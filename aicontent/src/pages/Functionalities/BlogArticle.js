import GeneralForm from "../../components/GeneralForm";
import { Helmet } from "react-helmet-async";


const BlogArticle = () => {
  return (
    <div>
      <Helmet>
        <title>SkrillBot | Blog Article</title>
      </Helmet>
      <GeneralForm header="Blog Article" paragraph="Unlock our blog's potential with SkrillBot AI-powered writing assistant From headlines to conclusions, we harp you create engaging content quickly and easily." maxLength={500} minLength={10} type="FULL_BLOG" btnText="Generate blog" label2="What's your blog about?" />
    </div>
  )
}
export default BlogArticle