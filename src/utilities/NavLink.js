import {NavLink as CustomLink} from 'react-router-dom'

const NavLink = ({to, children, ...props}) => {
  return (
    <CustomLink {...props} to={to}
      className={({isActive}) => isActive ? "isActive" : "undefined"}>
      {children}
    </CustomLink>
  )
}

export default NavLink