import "./footer.scss"

const Footer = () => {
  return (
    <div className="footer">
      <div className="logo">
        <img src="/legit-consulting-logo.png" alt="Legit Consulting Group logo" />
        <hr className="vertical-line" />
        <span className="title">Legitrix Business Intelligence™</span>
      </div>
      <span> ©{new Date().getFullYear()} Legit Consulting Group. All rights reserved.</span>
    </div>
  )
}

export default Footer
