
import React, { useEffect, useState } from 'react'
import {
    CRow,
    CCol,
   CButton,
   CCard,
   CCardBody,
   CCardHeader,
   CModal,
   CModalBody,
   CModalFooter,
   CModalHeader,
    CModalTitle,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CFormText,
    CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios'

const ManagePartner = () => {

    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    const [partnerSelected, setPartnerSelected] = useState({})
    const [add_Partner, setAddPartner] = useState(false)
    const [edit_partner, setEditPartner] = useState(false)

    const [partnername, setPartnerName] = useState("")
    const [taxid, setPartnerTaxid] = useState("")
    const [phone, setPartnerPhone] = useState("")
    const [email, setPartnerEmail] = useState("")
    const [address, setAddress] = useState("")
    const [desc, setDesc] = useState("")

    const [partners, setPartners] = useState(
        [
            {
                partner_id: "10000000",
                partnername: "test1",
                taxid: "236413212",
                desc: "test",
                address: "Ha Noi",
                email: "test1@gmail.com",
                phone: "123456789"
            },
            {
                partner_id: "10000000",
                partnername: "test1",
                taxid: "236413212",
                desc: "test",
                address: "Ha Noi",
                email: "test1@gmail.com",
                phone: "123456789"
            }
        ]
    )

    // run dau tien
    useEffect (() => {
        getPartner()
    },[f5]
    )

    // funtion vao server lay data sd thu vien axios

    async function getPartner ()
    {
        var rs = await axios.post("/api/getpartners")
        var rs = rs.data
        var data = rs.data // phai nhu nay ms lay dc data
        console.log(rs)

        setPartners(data) // truyen data vao bien

    }

    async function deletePartner( {partner_id} )
    {
        var data = {
            "partner_id" : partner_id
        }
        var rs = await axios.post("/api/delete_partner", data) //truyen data vao api
        setF5(!f5)


    }

    async function addPartner () {
        var data = {
            "partnername": partnername,
            "taxid": taxid,
            "address": address,
            "desc": desc,
            "phone": phone,
            "email": email
        }
        var rs = await axios.post("/api/add_partner", data)
        setPartnerName("")
        setPartnerTaxid("")
        setPartnerPhone("")
        setPartnerEmail("")
        setAddress("")
        setDesc("")

        setF5(!f5)
    }
    async function editPartner (item) {
        setPartnerSelected(item);
        setPartnerName(item.partnername)
        setPartnerTaxid(item.taxid)
        setPartnerPhone(item.phone)
        setPartnerEmail(item.email)
        setAddress(item.address)
        setDesc(item.desc)
    }

    async function editPartnerApi () {
        var data = {
            "id": partnerSelected.partner_id,
            "partnername": partnername,
            "taxid": taxid,
            "address": address,
            "desc": desc,
            "phone": phone,
            "email": email

        }
        var rs = await axios.post("/api/edit_partner_info", data)
        setF5(!f5)
    }


return (
    <>
     {/* Confirm delete */}

        <CModal
            show={warning}
              onClose={() => setWarning(!warning)}
              color="warning"
              centered
            >

              <CModalBody>
                Bạn có chắc chắn muốn xóa?
              </CModalBody>
              <CModalFooter className="justify-content-center">
                <CButton color="warning" onClick={() => {deletePartner(partnerSelected); setWarning(!warning)}}>Xóa</CButton>{' '}
                <CButton color="secondary" onClick={() => setWarning(!warning)}>Hủy</CButton>
              </CModalFooter>

        </CModal>

    {/* Add Partner */}
        <CModal
              show={add_Partner}
              onClose={() => setAddPartner(!add_Partner)}
              color="primary"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Thêm đối tác</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">

                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Tên</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={partnername} onChange={(e) => setPartnerName(e.target.value)} />

                        </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                        <CCol xs="2">
                            <CLabel>Mã số thuế</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={taxid} onChange={(e) => setPartnerTaxid(e.target.value)} />
                        </CCol>
                    </CFormGroup >

                    <CFormGroup row>
                        <CCol xs="2">
                            <CLabel>Số điện thoại</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={phone} onChange={(e) => setPartnerPhone(e.target.value)}/>
                        </CCol>
                    </CFormGroup >

                    <CFormGroup row>
                        <CCol xs="2">
                            <CLabel>Email</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={email} onChange={(e) => setPartnerEmail(e.target.value)}/>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel >Địa chỉ</CLabel>
                        </CCol>
                        <CCol >
                            <CTextarea name="textarea-input" id="textarea-input" rows="2" value={address} onChange={(e) => setAddress(e.target.value)}/>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel >Ghi chú</CLabel>
                        </CCol>
                        <CCol >
                            <CTextarea name="textarea-input" id="textarea-input" rows="2" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                        </CCol>
                    </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center">
                <CButton color="primary" onClick={() => addPartner()}>
                  Thêm
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setAddPartner(!add_Partner)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>

    {/* Edit Partner */}
        <CModal
              show={edit_partner}
              onClose={() => setEditPartner(!edit_partner)}
              color="info"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Sửa đối tác</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Tên</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={partnername} onChange={(e) => setPartnerName(e.target.value)} />

                        </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                        <CCol xs="2">
                            <CLabel>Mã số thuế</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={taxid} onChange={(e) => setPartnerTaxid(e.target.value)} />
                        </CCol>
                    </CFormGroup >

                    <CFormGroup row>
                        <CCol xs="2">
                            <CLabel>Số điện thoại</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={phone} onChange={(e) => setPartnerPhone(e.target.value)}/>
                        </CCol>
                    </CFormGroup >

                    <CFormGroup row>
                        <CCol xs="2">
                            <CLabel>Email</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={email} onChange={(e) => setPartnerEmail(e.target.value)}/>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel >Địa chỉ</CLabel>
                        </CCol>
                        <CCol >
                            <CTextarea name="textarea-input" id="textarea-input" rows="2" value={address} onChange={(e) => setAddress(e.target.value)}/>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel >Ghi chú</CLabel>
                        </CCol>
                        <CCol >
                            <CTextarea name="textarea-input" id="textarea-input" rows="2" value={desc} onChange={(e) => setDesc(e.target.value)}/>
                        </CCol>
                    </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center" >
                <CButton color="info" onClick={() => editPartnerApi()} >
                  Sửa
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setEditPartner(!edit_partner)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>


     {/* Table */}
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        <CButton color="primary" onClick={() => setAddPartner(!add_Partner)}>Thêm đối tác</CButton>
                    </CCardHeader>
                    <CCardBody>
                            <table class="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th scope="col"> Mã </th>
                                        <th scope="col"> Tên </th>
                                        <th scope="col">Mã số thuế</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">Ghi chú</th>
                                        <th scope="col">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        partners.map((item) =>
                                            <>
                                                <tr>
                                                    <td scope="row">{item.partner_id}</td>
                                                    <td>{item.partnername}</td>
                                                    <td>{item.taxid}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.desc}</td>
                                                    <td>
                                                        <CButton color="info" onClick={() => {editPartner(item); setEditPartner(!edit_partner)}}>Sửa</CButton>
                                                        <CButton color="danger" onClick={() => {setPartnerSelected(item); setWarning(!warning)}}>Xóa</CButton>
                                                    </td>
                                                </tr>

                                            </>
                                        )
                                    }

                                </tbody>
                            </table>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </>
)
}

export default ManagePartner
