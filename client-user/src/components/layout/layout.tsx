import { useContext } from "react"
import LoadingComponent from "../loading/loadingComponent"
import { useLocation } from "react-router-dom"
import { StateContext } from "../../context/stateContext"


const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const {isLoading} = useContext(StateContext)
  return location.pathname !== "/auth" ?
    <section className="w-full !h-screen flex flex-wrap content-start justify-center">
      {isLoading && <LoadingComponent />}
      <main className="w-full min-h-[99vh] overflow-y-auto">
        <div className="w-full h-auto">{children}</div>
      </main>
    </section>
    : ""
}

export default Layout