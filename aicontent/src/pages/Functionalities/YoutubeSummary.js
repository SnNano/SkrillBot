import Input from "../../components/Input";


const YoutubeSummary = () => {
    return (
        <Input header="Youtube Summary" paragraph="Unlock our blog's potential with SkrillBot's AI-powered writing assistant." maxLength={500} minLength={10} type="YOUTUBE_SUM" btnText="Generate" label2="Copy your Article here" />
    )
}
export default YoutubeSummary