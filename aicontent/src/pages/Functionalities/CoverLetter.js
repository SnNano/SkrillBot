import GeneralForm from "../../components/GeneralForm";
import { Helmet } from "react-helmet-async";


const CoverLetter = () => {
    return (
        <>

            <Helmet>
                <title>SkrillBot | Cover Letter</title>
            </Helmet>
            <GeneralForm header="Cover letter" paragraph="Condense lengthy content into succinct, easy-to-understand summaries." maxLength={500} minLength={10} type="COVER_LETTER" btnText="Generate" label2="Job you want to apply for" />
        </>
    )
}
export default CoverLetter