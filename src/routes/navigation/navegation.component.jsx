import { Outlet, Link } from 'react-router-dom'
import { Fragment } from 'react'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'

const Navigation = () => {
    return (
      <Fragment>
        {/* frament allow us to not be obligate to put it inside a div */}
        <div className='navigation'>
          <Link className='logo-container' to='/'>
            <CrwnLogo className='logo' />
          </Link>
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
                SHOP
            </Link>
            <Link className='nav-link' to='/sign-in'>
                SIGN IN
            </Link>
          </div>  
        </div>
        {/* define the position that the children routes will be rendered */}
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation