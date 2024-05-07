import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useContext } from "react";
import { StateContext } from "../../../context/stateContext";
import { useForm } from "react-hook-form";
import { GetToken } from "../../../utils/token";
import { Modals, UserUpdateType } from "../../../types/type";
import { updateUser } from "../../../api/user";


interface FormValue {
  name: string,
  phone: string,
  email: string,
}
const ModalEdit = ({ setModalName }: Modals) => {
  const { user, setUser } = useContext(StateContext)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValue>()
  const onSubmit = async (data: FormValue) => {
    const changedKeys = (Object.keys(data) as (keyof FormValue)[]).filter((key: keyof FormValue) => {
      const userKey = key === 'name' ? 'nameUser' : key;
      return user[0][userKey] !== data[key];
    });
    const token = await GetToken()
    const detailData = changedKeys.reduce((acc, key) => {
      return { ...acc, [key]: data[key] };
    }, {});
    const dataUpdate: UserUpdateType = {
      table: "users",
      col: "idUser",
      detail: [detailData]
    }
    token && changedKeys.length !== 0 && updateUser(token, dataUpdate)
      .then(res => {
        if (res.status === 200) {
          setUser(user.map((u: any) => {
            const updatedUser = changedKeys.reduce((acc, key: keyof FormValue) => {
              const userKey = key === 'name' ? 'nameUser' : key;
              return { ...acc, [userKey]: data[key] };
            }, { ...u });
            return updatedUser;
          }));
        }
        alert(res.message)
      })

  }
  return <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
        <ModalBody>
          <form className="w-full">
            <Input {...register('name', { required: true })} type="text" label="Name" className="w-full my-2" radius="sm" defaultValue={user[0]?.nameUser} />
            <Input {...register('phone', { required: true })} type="text" label="Name" className="w-full my-2" radius="sm" defaultValue={user[0]?.phone} />
            <Input {...register('email', {
              required: true, pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
            })} type="text" label="Email" className="w-full my-2" radius="sm" defaultValue={user[0]?.email} />
            {errors.email && <p>{errors.email.message}</p>}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={() => { setModalName(""); onClose() }}>
            Close
          </Button>
          <Button onClick={() => { handleSubmit(onSubmit)() }} color="success" className="text-white font-bold">Update</Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>

}

export default ModalEdit