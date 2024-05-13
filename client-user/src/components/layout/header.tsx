import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react"
import { useLocation, useNavigate } from "react-router-dom"
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { GiLaptop } from "react-icons/gi";
import { FaRegNewspaper, FaCaretDown, FaRegUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineContactPhone } from "react-icons/md";
import { useContext, useState } from "react";
import { StateContext } from "../../context/stateContext";
import { CartContext } from "../../context/cartContext";
import { CartType } from "../../types/type";
import Product_layout_02 from "../../pages/product/layout/product_layout_02";
import { GetToken, RemoveToken } from "../../utils/token";
import { removeLocalStorage } from "../../utils/localStorage";
import { authLogout } from "../../api/auth";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogin, setIsLogin } = useContext(StateContext)
  const { cart } = useContext(CartContext)
  const [toggle, setToggle] = useState(true)
  const [inputSearch, setInputSearch] = useState<string>("");
  const listNav = [
    {
      id: 1,
      name: 'HOME',
      url: '/',
      icon: AiOutlineHome
    },
    {
      id: 2,
      name: 'PRODUCT',
      url: '/product',
      icon: GiLaptop
    },
    {
      id: 3,
      name: 'POST',
      url: '/post',
      icon: FaRegNewspaper
    },
    {
      id: 4,
      name: 'CONTACT',
      url: '/contact',
      icon: MdOutlineContactPhone
    }
  ]
  const handleLogout = async () => {
    const token = await GetToken()
    token && authLogout(token)
      .then(res => {
        if (res.status === 200) {
          RemoveToken('aTk')
          RemoveToken('rTk')
          removeLocalStorage('isLogs')
          setIsLogin(false)
          navigate('/auth')
        }
      })
  }
  const handleSearch = () => {
    console.log("test")
    inputSearch !== "" && navigate(`/search/${inputSearch}`)
  }
  return <header className={`w-[98vw] h-[7vh] flex justify-around transition-all fixed bottom-2 ${toggle ? 'z-40' : 'z-0'} rounded-md`}>
    <div onClick={() => { setToggle(!toggle) }} className="w-[3%] h-4/5 my-auto flex items-center justify-center bg-zinc-900 rounded-md">
      <FaCaretDown className={`text-white w-3/5 h-3/5 cursor-pointer ${toggle ? 'rotate-0' : 'rotate-180'} transition-all`} />
    </div>
    <nav className={`w-full md:w-[45%] h-full flex justify-around items-center bg-zinc-900 bg-opacity-60 ${toggle ? 'translate-y-0' : 'translate-y-20'} transition-all rounded-lg`}>
      {listNav.map((n: any) => <div
        key={`header-${n.id}`}
        onClick={() => { navigate(n.url) }}
        className={`w-1/5 h-4/5 flex items-center justify-evenly text-[17px] ${location.pathname === n.url ? "bg-zinc-800 bg-opacity-100 font-semibold" : "bg-transparent"} hover:bg-zinc-800 hover:font-semibold transition-all rounded-md cursor-pointer`}
      >
        <span>{<n.icon />}</span>
        <span className="hidden lg:block">{n.name}</span>
      </div>)}
    </nav>
    {/* Search */}
    <nav className={`w-[35%] h-full hidden md:flex justify-around items-center bg-zinc-900 bg-opacity-60 ${toggle ? 'translate-y-0' : 'translate-y-20'} transition-all rounded-lg`}>
      <Input
        onChange={(e) => setInputSearch(e.target.value)}
        onKeyDown={(e: any) => { if (e.key === "Enter") { handleSearch() } }}
        type="search"
        radius="sm"
        className="w-4/5"
        placeholder="Search..." />

      <Button onClick={handleSearch} radius="sm" className="w-[10%] bg-zinc-800 hover:bg-opacity-100" isIconOnly>
        <BiSearchAlt2 className="text-[20px] text-white" />
      </Button>
    </nav>
    <nav className={`w-[10%] h-full hidden md:flex justify-around items-center bg-zinc-900 bg-opacity-60 ${toggle ? 'translate-y-0' : 'translate-y-20'} transition-all rounded-lg`}>
      {!isLogin && <Button radius="sm" color="danger" onClick={() => { navigate('/auth') }}>Login</Button>}
      {isLogin && <Dropdown placement="top-end" offset={20} className="relative bg-zinc-700">
        <DropdownTrigger className="fixed">
          <Button radius="sm" isIconOnly className="relative">
            <AiOutlineShoppingCart className="w-4/5 h-3/5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu closeOnSelect={true} className="w-[500px] h-[450px]">
          {cart && cart.slice(0, 4).map((c: CartType) => <DropdownItem key={c.idCart}>
            <Product_layout_02 data={c} isButton={true} />
          </DropdownItem>)}
          <DropdownItem className="flex justify-center items-center" variant="light">
            <Button className="mx-auto" onClick={() => { navigate('/cart') }}>Detail</Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      }
      {isLogin && <Button radius="sm" isIconOnly><IoIosNotifications className="w-4/5 h-3/5" /></Button>}
      {isLogin && <Dropdown placement="top-end" offset={20} className="bg-zinc-700">
        <DropdownTrigger>
          <Button radius="sm" isIconOnly>
            <FaRegUser className="w-4/5 h-3/5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu closeOnSelect={true}>
          <DropdownItem onClick={() => { navigate('/user'); }}>User</DropdownItem>
          <DropdownItem variant="light">
            <Button size="sm" radius="sm" color="danger" onClick={handleLogout}>Logout</Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      }
    </nav>
  </header>
}

export default Header