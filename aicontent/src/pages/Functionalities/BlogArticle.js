import GeneralForm from "../../components/GeneralForm";


const BlogArticle = () => {
  return (
    <div>
        <GeneralForm header="Blog Writing" paragraph="Unlock our blog's potential with SkrilBats AI-powered writing assistant." maxLength={500} minLength={10} type="FULL_BLOG" btnText="Generate blog" label2="What's your blog about?" />
    </div>
  )
}
export default BlogArticle