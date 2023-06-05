import {Outlet} from 'react-router-dom'

const Root = () => {
  return (
    <div className="md:flex md:min-h-screen ">
       <div className="md:w-3/4 p-10 md:h-screen m-auto">
        <Outlet />
      </div>
    </div>
  )
}
export default Root