import { Button, Code, Input, Modal, useDisclosure } from "@nextui-org/react"
import { StateContext } from "../../context/stateContext"
import { useContext, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa";
import ModalEdit from "./modal/edit";
import ModalPassword from "./modal/password";
import ModalAddress from "./modal/address";
import { Modals } from "../../types/type";
interface ListModalType {
  displayName: string,
  name: string,
  modalDetail: ({ setModalName }: Modals) => JSX.Element
}
const User = () => {
  const { user } = useContext(StateContext)
  const [modalName, setModalName] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const listModal:ListModalType[] = [
    {
      displayName: "Add address",
      name: 'address',
      modalDetail: ModalAddress
    },
    {
      displayName: "Update password",
      name: 'password',
      modalDetail: ModalPassword
    },
    {
      displayName: "Edit",
      name: 'edit',
      modalDetail: ModalEdit
    }
  ]
  return user && <div className="user w-full h-auto min-h-screen p-2">
    <div className="userInfo w-full h-auto min-h-[400px] flex flex-wrap justify-center items-center">
      <div className="info w-2/4 h-[150px] flex flex-wrap justify-center items-center">
        <div className="info-detail w-[35%]">
          <Input type="text" labelPlacement="outside-left" variant="underlined" radius="sm" label="Name" value={user[0]?.nameUser} isReadOnly />
          <Input type="text" labelPlacement="outside-left" variant="underlined" radius="sm" label="Phone" value={user[0]?.phone} isReadOnly />
          <Input type="text" labelPlacement="outside-left" variant="underlined" radius="sm" label="Email" value={user[0]?.email} isReadOnly />
        </div>
        <div className="info-btn flex flex-col m-1">
          {listModal.map((m: ListModalType) => <Button 
          key={`Button-${m.name}`}
          size="sm" className="m-1" color="primary" 
          onPress={onOpen} onClick={() => { setModalName(m.name) }}>
            {m.displayName}
          </Button>)}
        </div>
      </div>
      <div className="address w-2/4 h-full text-zinc-900">

        {user && user[0]?.address.map((a: any) => <div className="address-detail my-2" key={a.idAddress}>
          <Code radius="sm" className={`${a.type === "extra" ? "bg-zinc-700" : "bg-blue-500"} text-zinc-100 mx-1 cursor-pointer`}>{a.detail}</Code>
          <Button size="sm" radius="sm" className={`w-[80px] text-center ${a.type === "extra" ? "bg-zinc-700" : "bg-blue-500"} text-zinc-100 mx-1 cursor-pointer`}>{a.type}</Button>
          <Button isIconOnly size="sm" radius="sm" color="danger"><FaRegTrashAlt /></Button>
        </div>)}
      </div>
    </div>
    <Modal
      isOpen={isOpen}
      onOpenChange={() => { onOpenChange(); setModalName("") }}
      size="lg"
      backdrop="opaque"
      placement="center"
    >
      {listModal.filter((f: ListModalType) => f.name === modalName).map((m: ListModalType) =>
        <m.modalDetail setModalName={setModalName} key={`Modal-${m.name}`} />
      )}
    </Modal>
  </div>
}

export default User