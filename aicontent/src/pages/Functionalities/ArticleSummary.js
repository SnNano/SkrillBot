import GeneralForm from "../../components/GeneralForm";

const ArticleSummary = () => {
    return (
        <GeneralForm header="Summarizer" paragraph="Summarize Any Text." maxLength={500} minLength={10} type="ARTICLE_SUM" btnText="Generate" label2="Copy your Article here" />
    )
}
export default ArticleSummary