import PageHeader from "../common/pageHeader";
import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <div className="container">
      <PageHeader
        title="Error 404 - Page Not Found"
        subTitle="Oops... An error occurred Page not found"
      />
      <Link to="/">Click here to return to the home page</Link>
    </div>
  );
};

export default Error404;
