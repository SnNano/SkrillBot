import GeneralForm from "../../components/GeneralForm";


const YoutubeScripts = () => {
    return (
        <div>
            <GeneralForm header="Youtube Scripts" paragraph="Unlock our blog's potential with SkrilBats AI-powered writing assistant." maxLength={500} minLength={5} type="YOUTUBE_SCRIPT" btnText="Generate Script" label2="What's your content about?" />
        </div>
    )
}
export default YoutubeScripts