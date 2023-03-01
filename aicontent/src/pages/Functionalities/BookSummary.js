import GeneralForm from "../../components/GeneralForm";


const BookSummary = () => {
    return (
        <GeneralForm header="Book Summary" paragraph="Unlock our blog's potential with SkrillBot's AI-powered writing assistant." maxLength={500} minLength={10} type="ARTICLE_SUM" btnText="Generate" label2="Book Name" />
    )
}
export default BookSummary