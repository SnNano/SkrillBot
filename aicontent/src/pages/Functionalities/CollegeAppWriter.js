import GeneralForm from "../../components/GeneralForm";


const CollegeAppWriter = () => {
    return (
        <div>
            <GeneralForm header="Collge App Writer" paragraph="Unlock our blog's potential with SkrillBot AI-powered writing assistant." maxLength={500} minLength={10} type="COLLEGE" label2="What's your content about?" />
        </div>
    )
}
export default CollegeAppWriter