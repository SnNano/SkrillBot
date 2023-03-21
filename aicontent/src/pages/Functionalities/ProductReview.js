import Input from "../../components/Input";

const ProductReview = () => {
  return (
    <div>
      <Input header="Product Review" paragraph="Get insightful and well-written product reviews with SkillBot." maxLength={500} minLength={10} type="PRODUCT_REVIEW" btnText="Generate" keywordsText="Lobster great, noisy, service polite, prices good." label2="What's your experience with the product?" />
    </div>
  )
}
export default ProductReview