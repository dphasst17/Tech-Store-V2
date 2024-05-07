import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";
/* import { GetToken } from "../../../utils/token"; */
import { Modals } from "../../../types/type";


interface FormValue {
  current: string,
  new: string,
  confirm:string
}
const ModalPassword = ({setModalName}: Modals) => {
  const { register, handleSubmit} = useForm<FormValue>()
  const onSubmit = (data: FormValue) => {
    console.log(data)
    /* const checkData = user?.every((u:any) => data.name !== u.name || data.email !== u.email)
    const token = GetToken()
    console.log(checkData)
    console.log(token)
     */
    
  }
  return <ModalContent>
  {(onClose) => (
    <>
      <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
      <ModalBody>
        <form className="w-full">
          <Input {...register('current', { required: true })} type="text" label="Current password" className="w-full my-2" radius="sm" />
          <Input {...register('new', { required: true })} type="text" label="New password" className="w-full my-2" radius="sm" />
          <Input {...register('confirm', { required: true })} type="text" label="Confirm password" className="w-full my-2" radius="sm" />
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={() => {setModalName("");onClose()}}>
          Close
        </Button>
        <Button onClick={() => { handleSubmit(onSubmit)() }} color="success" className="text-white font-bold">Update</Button>
      </ModalFooter>
    </>
  )}
</ModalContent>

}

export default ModalPassword