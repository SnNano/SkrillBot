import GeneralForm from "../../components/GeneralForm";

const ArticleSummary = () => {
    return (
        <GeneralForm header="Article Summary" paragraph="Unlock our blog's potential with SkrillBot's AI-powered writing assistant." maxLength={500} minLength={10} type="ARTICLE_SUM" btnText="Generate" label2="Copy your Article here" />
    )
}
export default ArticleSummary