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
   CTextarea,
   CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios'
import useAccount from 'src/useAccount'
import moment from 'moment'

const ManageReciept = () => {
    const {account, saveAccount} = useAccount()

    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)

    const [add_reciept, setReciept] = useState(false)

    const [userid, setuserid] = useState("")
    const [receipttype, setreceipttype] = useState("")
    const [desc, setdesc] = useState("")
    const [amount, setamount] = useState(0)
    const [time, settime] = useState(0)

    const [reciept, setReciepts] = useState([])
    useEffect (() =>
    {

        getReciept()
       
    } , [f5])

    async function getReciept() {
        var rs = await axios.post("/api/get_receipt")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setReciepts(data)
    }

    async function addReciept()
    {
        var data = {
        "userid": account.user_id, 
        "receipttype": receipttype, 
        "desc": desc,
        "name": "",
        "content": "",
        "amount": amount,
        "time" : moment(time).format("DD/MM/YYYY")
        }
        var rs = await axios.post("/api/add_receipt", data)

        setreceipttype("")
        setdesc("")
        setamount(0)
        settime("")

        setF5(!f5)
    }


    return(
        <>
        {/* Add Product */}
        <CModal 
                show={add_reciept} 
                onClose={() => setReciept(!add_reciept)}
                color="primary"
                size="lg"
                centered
                >
                <CModalHeader closeButton className="text-center">
                    <CModalTitle className="w-100 addcustom ">Thêm chi phí phát sinh</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Tên chi phí</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="text-input" name="text-input" value={receipttype} onChange={(e) => setreceipttype(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Ngày chi</CLabel>
                            </CCol>
                            <CCol >
                                <CInput type="date" value={time} onChange={(e) => settime(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Tiền chi</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="text-input" name="text-input" value={amount} onChange={(e) => setamount(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Mục đích chi</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="text-input" name="text-input" value={desc} onChange={(e) => setdesc(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>

                        
                    
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={(e) => addReciept()} >
                    Thêm
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => setReciept(!add_reciept)}>
                    Hủy
                    </CButton>
                </CModalFooter>
            </CModal>

        {/* Table */}
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        <CButton color="primary" onClick={()=> setReciept(!add_reciept)}>Thêm chi phí</CButton>
                    </CCardHeader>
                    <CCardBody>
                            <table class="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th scope="col"> # </th>
                                        <th scope="col"> Tên chi phí </th>
                                        <th scope="col">Ngày chi</th>
                                
                                        <th scope="col">Tiền chi</th>
                                        <th scope="col">Mục đích chi</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reciept.map((item, idx) => 
                                            <>
                                                <tr>
                                                    <td scope="row">{idx+1}</td>
                                                    <td>{item.receipttype}</td>
                                                    <td>{item.documentid.time}</td>
                                                    <td>{item.documentid.amount ? item.documentid.amount.toLocaleString('en-US')+" VNĐ" : ""}</td>
                                                    <td>{item.desc}</td>
                                                
                                                    <td>
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
export default ManageReciept