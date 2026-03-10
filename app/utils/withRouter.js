import { useNavigate, useLocation, useParams } from 'react-router-dom'

export function withRouter(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()

    return (
      <Component
        {...props}
        history={{ push: navigate, replace: navigate, goBack: () => navigate(-1) }}
        location={location}
        params={params}
      />
    )
  }
}
