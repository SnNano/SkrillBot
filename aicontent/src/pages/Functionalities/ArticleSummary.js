import GeneralForm from "../../components/GeneralForm";
import { Helmet } from "react-helmet-async";

const ArticleSummary = () => {
    return (
        <>
            <Helmet>
                <title>SkrillBot | Summarizer</title>
            </Helmet>
            <GeneralForm header="Summarizer" paragraph="Summarize Any Text." maxLength={500} minLength={10} type="ARTICLE_SUM" btnText="Generate" label2="Copy your text here" />
        </>
    )
}
export default ArticleSummary