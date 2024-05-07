import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../../context/stateContext";
import { useForm } from "react-hook-form";
import { Modals } from "../../../types/type";
import { getApiProvince, getProvincesDetail } from "../../../api/user";

interface FormAddress{
  provinces:string,
  districts:string,
  wards:string
}

const ModalAddress = ({ setModalName }: Modals) => {
  const { user, setUser } = useContext(StateContext)
  const [province, setProvince] = useState(null);
  const [idProvinces, setIdProvinces] = useState(null);
  const [district, setDistrict] = useState(null);
  const [idDistrict, setIdDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [resultAddress, setResultAddress] = useState({ provinces: '', districts: '', wards: '', details: '' })
  const { register, handleSubmit, formState: { errors } } = useForm<FormAddress>()

  useEffect(() => {
    getApiProvince()
      .then(res => setProvince(res.results))
  }, [])
  useEffect(() => {
    idProvinces !== null && getProvincesDetail('district', idProvinces).then(res => setDistrict(res.results))
  }, [idProvinces])
  useEffect(() => {
    idDistrict !== null && getProvincesDetail('ward', idDistrict).then(res => setWard(res.results))
  }, [idDistrict])

  
  return <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
        <ModalBody>
          <form className="w-full">
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={() => { setModalName(""); onClose() }}>
            Close
          </Button>
          <Button color="success" className="text-white font-bold">Update</Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>

}

export default ModalAddress