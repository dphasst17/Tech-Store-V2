import { useLocation } from "react-router-dom"


const Layout = ({ children }: { children: React.ReactNode })  => {
    const location = useLocation()
  return location.pathname !== "/auth" ?
  <section className="w-full !h-screen flex flex-wrap content-start justify-center">
      <main className="w-full min-h-[99vh] overflow-y-auto">
          <div className="content w-full h-full">{children}</div>
      </main>
  </section>
  : ""
}

export default Layout