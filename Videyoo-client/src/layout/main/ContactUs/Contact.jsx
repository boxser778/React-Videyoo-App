import PageHeader from "../../common/pageHeader";
import "./Contact.scss";

const ContactPage = () => {
  const email_path = "";

  const route = `https://formsubmit.co/${email_path}`;

  return (
    <>
      <PageHeader title="About Videyoo" subTitle="Have Some Questions?" />

      <div className="contact-form-container">
        <div className="theCont">
          <form action={route} method="POST">
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Your Message"
                    className="form-control"
                    name="message"
                    rows="10"
                    required
                  ></textarea>
                  <button type="submit" className="submitBtn">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
