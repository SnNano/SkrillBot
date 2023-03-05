import Input from "../../components/Input";


const YoutubeSummary = () => {
    return (
        <Input header="Youtube transcripts" paragraph="Unlock our blog's potential with SkrillBot's AI-powered writing assistant." maxLength={500} minLength={10} type="YOUTUBE_SUM" keywordsText="keywords seperated by ," label2="Type the subject" />
    )
}
export default YoutubeSummary