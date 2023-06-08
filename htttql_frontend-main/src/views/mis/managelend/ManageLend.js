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


const ManageLend = () => {
    const {account, saveAccount} = useAccount()

    const [partners, setPartners] = useState([])
    
    const [lendselected, setLendSelected] = useState(false)
    const [interest_amount, setInterest_amount] = useState(0)
    const [payingamount, setpayingamount] = useState(0)
    const [time, setTime] = useState("")
    const [amount, setamount] = useState(0)
    const [add_product, setAddProduct] = useState(false)
    const [expired, setexpired] = useState("")
    const [partner_id, setPartnerId] = useState([])
    const [interest_rate, setinterest_rate] = useState(0)
    const [lend, setLend] = useState([

    ])
    const [lendpaying, setLendpaying] = useState([

    ])
    const [add_lendpaying, setLendPaying] = useState(false)
    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    const [viewLend, setViewLend] = useState([])
    useEffect (() =>
    {
        getPartners()
        getLend()
       
    } , [f5])
    async function getPartners() {
        var rs = await axios.post("/api/getpartners")
         var rs = rs.data
         var data = rs.data

         setPartners(data)
         console.log(data)
    }

    async function getLend() {
        var rs = await axios.post("/api/getlend")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setLend(data)
    }
  
    async function addLendPaying()
    {
        var data = 
        {"lendrecid":lendselected.id,
        "interest_amount" : parseFloat(interest_amount),
        "payingamount" : parseFloat(payingamount),
        "payment" : "",
        "time": moment(time).format("DD/MM/YYYY")}
        console.log(data)
        var rs = await axios.post("/api/addlendpaying", data)
        setInterest_amount(0)
        setpayingamount(0)
        setF5(!f5)

    }
    async function addProduct()
    {
        var data = 
        {"userid":account.user_id,
        "partnerid": partner_id,
        "interest_rate" : parseFloat(interest_amount),
        "amount" : parseFloat(amount),
        "desc" : "",
        "expired": moment(expired).format("DD/MM/YYYY"),
        "time": moment(time).format("DD/MM/YYYY")
    }
        console.log(data)

        var rs = await axios.post("/api/addlend", data)
        setPartnerId("")
        setamount(0)
        setinterest_rate(0)
        setexpired("")
        setTime("")
      
        setF5(!f5)

    }
    return(
        <>
        {/* View Lend */}
        {/* Add Product */}
        <CModal 
                show={add_product} 
                onClose={() => setAddProduct(!add_product)}
                color="primary"
                size="lg"
                centered
                >
                <CModalHeader closeButton className="text-center">
                    <CModalTitle className="w-100 addcustom ">Thêm khoản vay</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        

                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Đối tác </CLabel>
                            </CCol>
                            <CCol >
                                <CSelect value={partner_id} onChange={(e) => setPartnerId(e.target.value)}>
                                    <option value="">Chon partner</option>
                                    {
                                        partners.map((item) => 
                                            <option value={item.partner_id} >{item.partnername}</option>
                                        )
                                    }
                                </CSelect>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Ngày vay</CLabel>
                            </CCol>
                            <CCol >
                                <CInput type="date" value={time} onChange={(e) => setTime(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Hạn trả</CLabel>
                            </CCol>
                            <CCol >
                                <CInput type="date" value={expired} onChange={(e) => setexpired(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Số lượng</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="number" name="number-input" value={amount} onChange={(e) => setamount(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Lãi suất (%)</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="number" name="number-input" value={interest_amount} onChange={(e) => setInterest_amount(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                    
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={(e) => addProduct()} >
                    Thêm
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => setAddProduct(!add_product)}>
                    Hủy
                    </CButton>
                </CModalFooter>
            </CModal>
        {/* Add Product */}
        <CModal 
                show={add_lendpaying} 
                onClose={() => setLendPaying(!add_lendpaying)}
                color="primary"
                size="lg"
                centered
                >
                <CModalHeader closeButton className="text-center">
                    <CModalTitle className="w-100 addcustom ">Cập nhật theo tháng</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                          <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Tháng</CLabel>
                            </CCol>
                            <CCol >
                                <CInput type="date" value={time} onChange={(e) => setTime(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Lãi phải trả</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="number" name="number-input" value={interest_amount} onChange={(e) => setInterest_amount(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Đã trả</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="number" name="number-input" value={payingamount} onChange={(e) => setpayingamount(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                        
                        
                    
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={(e) => addLendPaying()} >
                    Thêm
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => setLendPaying(!add_lendpaying)}>
                    Hủy
                    </CButton>
                </CModalFooter>
            </CModal> 

        
         {/* Table */}
         <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary"onClick={() => setAddProduct(!add_product)}>Thêm khoản vay</CButton>
                        </CCardHeader>
                        <CCardBody>
                                <table class="table table-striped text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col"> Mã </th>
                                            <th scope="col"> Bên vay </th>
                                            <th scope="col">Ngày vay</th>
                                            <th scope="col">Hạn trả</th>
                                            <th scope="col">Lãi suất</th>
                                            <th scope="col">Số lượng vay</th>
                                            <th scope="col">Đã trả</th>
                                            <th scope="col">Còn lại</th>
                                           
                                            
                                            <th scope="col">Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            lend.map((item) => 
                                                <>
                                                    <tr>
                                                        <td scope="row">{item.id}</td>
                                                        <td>{item.partnerid.partnername} <br/>
                                                        MST: {item.partnerid.taxid}
                                                        </td>
                                                        <td>{item.time}</td>
                                                        <td>{item.expired}</td>
                                                        <td>{item.interest_rate}</td>
                                                        <td>{item.amount ? item.amount.toLocaleString('en-US')+"VNĐ" : ""} </td>
                                                       
                                                        <td>{(item.amount - item.remaining).toLocaleString('en-US')+"VNĐ" }</td>
                                                        <td>{item.remaining ? item.remaining.toLocaleString('en-US')+"VNĐ" : ""} </td>
                                                        <td>
                                                            
                                                            <CButton color="success"onClick={() => {setLendSelected(item); setLendPaying(!add_lendpaying)}}>Cập nhật</CButton>
                                                            
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

export default ManageLend