import {Outlet} from 'react-router-dom'

const Root = () => {
  return (
    <div>
        <h1>From Root</h1>
        <Outlet />    
    </div>
  )
}
export default Root