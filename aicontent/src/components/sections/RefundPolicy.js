import { Helmet } from "react-helmet-async";


const RefundPolicy = () => {
    return (
        <div>
            <Helmet>
                <title>SkrillBot | Refund Policy</title>
                <meta name="description" content="Skrillbot's Refund Policy | Access and Use Our AI-Powered Services to Revolutionize Your Writing and Coding" />
                <meta rel="canonical" href="/refund-policy" />
            </Helmet>
            <section className="container md:mt-24 px-12 text-justify">
                <h2 className="md:text-4xl text-2xl my-4">Refund Policy<span className="font-light">- Refund Policy for Skrillbot</span></h2>
                <h3 className="md:text-2xl text-xl font-light mb-4">Effective Date: 2023-03-11</h3>
                <p className="mb-4 text-md">
                    All payments made to Skrillbot for the use of our AI-powered writing and coding services are non-refundable. Skrillbot does not provide refunds for any reason, including but not limited to dissatisfaction with the services, technical issues, or user error.
                </p>
                <p className="mb-4 text-md">By using Skrillbot's services, you agree to this refund policy. If you do not agree to this policy, please do not use Skrillbot's services.</p>
                <footer />
            </section>
        </div>
    )
}
export default RefundPolicy