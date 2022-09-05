const Footer = () => {
  return (
    <div className="footer text-center">
      <div className="card-header">Videyoo</div>
      <h5 className="card-title">Hope you found this website useful</h5>
      <p className="card-text">
        would you like to contect me via email click down below.
      </p>
      <a href="/contact-page">
        <button className="about-upload-btn">Contact Us</button>
      </a>
      <div className="card-footer text-muted">
        <p>Created by Shmuel Hendler &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Footer;
