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


const ManageDepartment = () => {

    const {account, saveAccount} = useAccount()   // lay thong tin ACCC - phan quyen

    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    const [departselected, setDepartSelected] = useState({})
    const [add_depart, setAddDepart] = useState(false)
    const [edit_depart, setEditDepart] = useState(false)

    const [depart_name, setDepartName] = useState("")
    const [branch_id, setBranchId] = useState(account.branch ? account.branch.branch_id : "")
    const [branchs, setBranchs] = useState([])

    const [departs, setDepartments] = useState(
       [  ]
    )

    useEffect (() =>
    {
        getBranchs()
        getDepartment()
    } , [f5]
    )

    async function getBranchs() {
        var rs = await axios.post("/api/get_branch")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setBranchs(data)
    }

    async function getDepartment ()
    {
        var rs = await axios.post("/api/get_department")
        var rs = rs.data
        var data = rs.data

        console.log(rs)

        setDepartments(data)
    }
    async function deleteDepartment({department_id})
    {
        var data = {
            "department_id" : department_id
        }
        var rs = await axios.post("/api/delete_department", data)
        setF5(!f5)
    }

    async function addDepartment () {
        var data = {
            "department_name": depart_name,
            "branch_id": branch_id

            
        }
        console.log(data)
        var rs = await axios.post("/api/add_department", data)
        setDepartName("")
        setBranchId(branch_id)

        setF5(!f5)
    }

    async function editDepart (item) {
        setDepartSelected(item);
        setBranchId(item.branch.branch_id)
        setDepartName(item.department_name)
        
        
        
    }

    async function editDepartApi () {
        var data = {
            "department_id": departselected.department_id,
            "department_name": depart_name,
            "branch_id": departselected.branch_id
            
            
        }
        var rs = await axios.post("/api/edit_department", data)
        setF5(!f5)
    }

    return(
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
                    <CButton color="warning" onClick={() => {deleteDepartment(departselected); setWarning(!warning)}}>Xóa</CButton>{' '}
                    <CButton color="secondary" onClick={() => setWarning(!warning)}>Hủy</CButton>
                </CModalFooter>

            </CModal>

        {/* Add Department */}
            <CModal 
              show={add_depart} 
              onClose={() => setAddDepart(!add_depart)}
              color="primary"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Thêm phòng ban</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Tên phòng ban</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={depart_name} onChange={(e) => setDepartName(e.target.value)}/>
                            
                        </CCol>
                    </CFormGroup>

                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel> Chi nhánh</CLabel>
                        </CCol>
                        <CCol >
                            {
                                account.type == "Chiefmanager" ? <>
                                    <CSelect value={branch_id} onChange={(e) => setBranchId(e.target.value)}>
                                        <option value="" >Chọn chi nhánh</option>
                                        {
                                            branchs.map((item) => 
                                                <option value={item.branch_id}>{item.branch_location}</option>
                                            )
                                        }
                                    </CSelect>
                                </> : <>
                                    <CInput id="text-input" name="text-input" value={account.branch.branch_location} readOnly/>
                                </>
                            }
                        </CCol>
                    </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center">
                <CButton color="primary" onClick={() => addDepartment()}>
                  Thêm
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setAddDepart(!add_depart)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>

        {/* Edit Department */}
        <CModal 
              show={edit_depart} 
              onClose={() => setEditDepart(!edit_depart)}
              color="primary"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Sửa phòng ban</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Tên phòng ban</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={depart_name} onChange={(e) => setDepartName(e.target.value)}/>
                            
                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel> Chi nhánh</CLabel>
                        </CCol>
                        <CCol >
                            {
                                account.type == "Chiefmanager" ? <>
                                    <CSelect value={branch_id} onChange={(e) => setBranchId(e.target.value)}>
                                        <option value="" >Chọn chi nhánh</option>
                                        {
                                            branchs.map((item) => 
                                                <option value={item.branch_id}>{item.branch_location}</option>
                                            )
                                        }
                                    </CSelect>
                                </> : <>
                                    <CInput id="text-input" name="text-input" value={account.branch.branch_location} readOnly/>
                                </>
                            }
                        </CCol>
                    </CFormGroup>
                    
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center">
                <CButton color="primary" onClick={() => editDepartApi()}>
                  Sửa
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setEditDepart(!edit_depart)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>

        {/* Table */}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary" onClick = {() => setAddDepart(!add_depart)} >Thêm phòng ban</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped text-center">
                                <thead>
                                    <th scope="col">  Mã phòng ban </th>
                                    <th scope="col">  Tên phòng ban </th>
                                    <th scope="col">  Số lượng nhân viên </th>
                                    <th>Chức năng</th>
                                </thead>
                                <tbody>
                                    {
                                        departs.map((item) => 
                                        <>
                                            <tr>
                                                <td scope="row">{item.department_id}</td>
                                                <td>{item.department_name}</td>
                                                <td>{item.department_numofemployees}</td>
                                                <td>
                                                    <CButton color="info" onClick={ () => {editDepart(item); setEditDepart(!edit_depart) }}>Sửa</CButton>
                                                    <CButton color="danger" onClick={ ()=> {setDepartSelected(item); setWarning(!warning)}}>Xóa</CButton>
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

export default ManageDepartment
