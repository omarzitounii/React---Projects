import { Link } from "react-router"

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <h2 className="notfound-title">404</h2>
      <p className="notfound-message">The page you are looking for does not exist!</p>
      <Link to="/" className="notfound-link">← Go back Home</Link>
    </div>
  )
}

export default NotFoundPage
