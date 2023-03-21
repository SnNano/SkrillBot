import GeneralForm from "../../components/GeneralForm";
import { Helmet } from "react-helmet-async";


const Email = () => {
  return (
    <div>
      <Helmet>
        <title>SkrillBot | Email</title>
      </Helmet>
      <GeneralForm header="Email Writing" paragraph="Unlock the power of persuasive email writing with Skrillbot. Our Al-powered tools provide you with unique and effective email content that captures attention and drives engagement." maxLength={500} minLength={10} type="EMAIL" btnText="Generate email" label2="What's your email about?" />
    </div>
  )
}
export default Email