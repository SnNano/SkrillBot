import GeneralForm from "../../components/GeneralForm";
import { Helmet } from "react-helmet-async";


const BookSummary = () => {
    return (
        <>
            <Helmet>
                <title>SkrillBot | Book Summary</title>
            </Helmet>
            <GeneralForm header="Book Summary" paragraph="Unlock our blog's potential with SkrillBot's AI-powered writing assistant." maxLength={500} minLength={10} type="ARTICLE_SUM" btnText="Generate" label2="Book Name" keywordP="Ex. Chapter, Setting, Pg, and etc…" />
        </>
    )
}
export default BookSummary