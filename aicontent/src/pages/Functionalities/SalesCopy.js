import GeneralForm from "../../components/GeneralForm";
import { Helmet } from "react-helmet-async";


const SalesCopy = () => {

  return (
    <div>
      <Helmet>
        <title>SkrillBot | Sales Copy</title>
      </Helmet>
      <GeneralForm header="Sales Copy" paragraph="Boost your sales with Skrillbot's Al-powered copywriting service. From compelling headlines to persuasive calls-to-action, our algorithms generate copy that converts." maxLength={500} minLength={10} type="SALES_COPY" btnText="Generate" label2="What's your sales about?" />
    </div>
  )
}
export default SalesCopy