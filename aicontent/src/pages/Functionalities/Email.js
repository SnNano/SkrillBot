import GeneralForm from "../../components/GeneralForm";


const Email = () => {
  return (
    <div>
        <GeneralForm header="Email Writing" paragraph="Unlock the power of persuasive email writing with Skrillbot." maxLength={500} minLength={10} type="EMAIL" btnText="Generate email" label2="What's your email about?" />
    </div>
  )
}
export default Email