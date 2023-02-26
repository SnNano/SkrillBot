import GeneralForm from "../../components/GeneralForm";


const SalesCopy = () => {
  return (
    <div>
        <GeneralForm header="Sales Copy" paragraph="Boost your sales with Skrillbot's Al-powered copywriting service." maxLength={500} minLength={10} type="SALES_COPY" btnText="Generate" label2="What's your blog about?" />
    </div>
  )
}
export default SalesCopy