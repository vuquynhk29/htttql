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

const ManageBalance = () => {
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
        var rs = await axios.post("/api/get_balance")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setReciepts(data)
    }

    async function addReciept()
    {
        var data = 
        
        {"accountantuserid": account.user_id,
        "content": receipttype,
        "amount": amount,
        "term": time}
        // "receipttype": receipttype, 
        // "desc": desc,
        // "name": "",
        // "content": "",
        // "amount": amount,
        // "time" : moment(time).format("DD/MM/YYYY")
        
        var rs = await axios.post("/api/add_balance", data)

        setreceipttype("")
       
        setamount(0)
        settime(0)

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
                    <CModalTitle className="w-100 addcustom ">Thêm số dư</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Năm</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="number" name="number-input" value={time} onChange={(e) => settime(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                        {/* <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Ngày chi</CLabel>
                            </CCol>
                            <CCol >
                                <CInput type="date" value={time} onChange={(e) => settime(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup> */}
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Số lượng</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="text-input" name="text-input" value={amount} onChange={(e) => setamount(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Nội dung</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="text-input" name="text-input" value={receipttype} onChange={(e) => setreceipttype(e.target.value)}/>
                                
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

        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        <CButton color="primary" onClick={()=> setReciept(!add_reciept)} >Thêm số dư đầu kỳ</CButton>
                    </CCardHeader>
                    <CCardBody>
                            <table class="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th scope="col"> # </th>
                                        <th scope="col"> Năm</th>
                                        <th scope="col">Số lượng</th>
                                
                                        <th scope="col">Nội dung</th>
                                        <th scope="col">Nhân viên nhập</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reciept.map((item, idx) => 
                                            <>
                                                <tr>
                                                    <td scope="row">{idx+1}</td>
                                                    
                                                    <td>{item.term}</td>
                                                    <td>{item.amount ? item.amount.toLocaleString('en-US')+" VNĐ" : ""}</td>
                                                    <td>{item.content}</td>
                                                    <td>{item.accountantuserid}</td>
                                                
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
export default ManageBalance