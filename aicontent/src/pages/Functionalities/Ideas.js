import GeneralForm from "../../components/GeneralForm";


const Ideas = () => {
  return (
    <div>
      <GeneralForm header="Ideas" paragraph="Spark your imagination with SkrillBot. Our Al-powered tool generates endless ideas to help you create anything from blog posts to business plans." maxLength={500} minLength={10} type="IDEAS" btnText="Generate" label2="You want ideas about (Brand name, Product name)" />
    </div>
  )
}
export default Ideas