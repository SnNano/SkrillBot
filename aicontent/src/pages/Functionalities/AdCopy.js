import GeneralForm from "../../components/GeneralForm";
import { Helmet } from "react-helmet-async";


const AdCopy = () => {
  return (
    <div>
      <Helmet>
        <title>SkrillBot | Ad Copy</title>
      </Helmet>
      <GeneralForm header="Ad Copy" paragraph="Transform your ad copy from mediocre to amazing with SkrillBot's Al-powered writing assistant. Say goodbye to the guesswork and hello to increased conversions." maxLength={500} minLength={10} type="AD_COPY" btnText="Generate Ad" label2="What's your Ad about?" />
    </div>
  )
}
export default AdCopy