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


const ManageTax = () => {


    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    const [taxselected, setTaxSelected] = useState({})
    const [add_tax, setAddtax] = useState(false)
    const [edit_tax, setEditTax] = useState(false)

    const [taxtype, setTaxType] = useState("")
    const [percentage, setTaxper] = useState("")
    const [tax_id, setTaxId] = useState("")

    const [taxs, setTaxs] = useState(
        [
            {
                tax_id: "10000000",
                taxtype: "TNDN",
                percentage: 60.9

            },
            {
                tax_id: "10000000",
                taxtype: "TNDN",
                percentage: 60.9

            }
        ]
    )
    useEffect (() =>
    {
        getTax()
    } , [f5]
    )

    async function getTax ()
    {
        var rs = await axios.post("/api/get_tax")
        var rs = rs.data
        var data = rs.data

        console.log(rs)

        setTaxs(data)
    }
    async function deleteTax({tax_id})
    {
        var data = {
            "tax_id" : tax_id
        }
        var rs = await axios.post("/api/delete_tax", data)
        setF5(!f5)
    }
    async function addTax () {
        var data = {
            "taxtype": taxtype,
            "percentage": percentage

            
        }
        console.log(data)
        var rs = await axios.post("/api/add_tax", data)
        setTaxType("")
        setTaxper(0)

        setF5(!f5)
    }
    async function editTax (item) {
        setTaxSelected(item);
        
        setTaxType(item.taxtype)
        setTaxper(item.percentage)
        
        
        
    }

    async function editTaxApi () {
        var data = {
            "tax_id" : taxselected.tax_id,
            "percentage": percentage

            
            
        }
        var rs = await axios.post("/api/edit_tax", data)
        setF5(!f5)
    }


    return (
        <>
            {/* Confirm Delete */}
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
                    <CButton color="warning" onClick={() => {deleteTax(taxselected); setWarning(!warning)}}>Xóa</CButton>{' '}
                    <CButton color="secondary" onClick={() => setWarning(!warning)}>Hủy</CButton>
                </CModalFooter>

            </CModal>
        {/* Add Tax */}
             <CModal 
              show={add_tax} 
              onClose={() => setAddtax(!add_tax)}
              color="primary"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Thêm danh mục thuế</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Loại thuế</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={taxtype} onChange={(e) => setTaxType(e.target.value)}/>
                            
                        </CCol>
                    </CFormGroup>

                    <CFormGroup  row>
                    <CCol xs="2">
                            <CLabel>Phầm trăm</CLabel>
                        </CCol>
                        <CCol >
                            <CInput type="number" step="0.1" name="number-input" value={percentage} onChange={(e) => setTaxper(e.target.value)}/>
                            
                        </CCol>
                    </CFormGroup>
                   
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center">
                <CButton color="primary" onClick={() => addTax()}>
                  Thêm
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setAddtax(!add_tax)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>

            {/* Edit Department */}
            <CModal 
                show={edit_tax} 
                onClose={() => setEditTax(!edit_tax)}
                color="primary"
                size="lg"
                centered
                >
                <CModalHeader closeButton className="text-center">
                    <CModalTitle className="w-100 addcustom ">Sửa loai thue</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="form-horizontal">
                        <CFormGroup  row>
                            <CCol xs="2">
                                <CLabel>Loại thuế</CLabel>
                            </CCol>
                            <CCol >
                                <CInput id="text-input" name="text-input" value={taxtype} onChange={(e) => setTaxType(e.target.value)} readOnly/>
                                
                            </CCol>
                        </CFormGroup>

                        <CFormGroup  row>
                        <CCol xs="2">
                                <CLabel>Phầm trăm</CLabel>
                            </CCol>
                            <CCol >
                                <CInput type="number" step="0.1" name="number-input" value={percentage} onChange={(e) => setTaxper(e.target.value)}/>
                                
                            </CCol>
                        </CFormGroup>
                   
                    </CForm>
                </CModalBody>
                <CModalFooter className="justify-content-center">
                    <CButton color="primary" onClick={() => editTaxApi()}>
                    Sửa
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => setEditTax(!edit_tax)}>
                    Hủy
                    </CButton>
                </CModalFooter>
                </CModal>



            {/* Table */}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary" onClick={()=> {setAddtax(!add_tax)}}>Thêm danh mục thuế</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped text-center">
                                <thead>
                                    <th scope="col">  Mã </th>
                                    <th scope="col">   Loại thuế</th>
                                    <th scope="col">  Phần trăm </th>
                                    <th>Chức năng</th>
                                </thead>
                                <tbody>
                                    {
                                        taxs.map((item) => 
                                        <>
                                            <tr>
                                                <td scope="row">{item.tax_id}</td>
                                                <td>{item.taxtype}</td>
                                                <td>{item.percentage} % </td>
                                                <td>
                                                    <CButton color="info" onClick={ () => {editTax(item); setEditTax(!edit_tax) }}>Sửa</CButton>
                                                    <CButton color="danger" onClick={ ()=> {setTaxSelected(item); setWarning(!warning)}} >Xóa</CButton>
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

export default ManageTax