
import React, { useEffect, useState } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CButtonGroup,
    CButton,
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

const ManageBranch = () => {
    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    const [branchSelected, setBranchSelected] = useState({})
    const [add_branch, setAddBranch] = useState(false)
    const [edit_branch, setEditBranch] = useState(false)

    const [branch_phone, setBranchPhone] = useState("")
    const [branch_location, setBranchLocation] = useState("")

    const [branchs, setBranchs] = useState(
        []
    )

    useEffect(() => {
        getBranchs()
    }, [f5])

    async function getBranchs() {
        var rs = await axios.post("/api/get_branch")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setBranchs(data)
    }

    async function deleteBranch( {branch_id} ) {
        var data = {
            "branch_id": branch_id
        }
        var rs = await axios.post("/api/delete_branch", data)
        setF5(!f5)
    }

    async function addBranch () {
        var data = {
            "branch_phone": branch_phone,
            "branch_location": branch_location
        }
        var rs = await axios.post("/api/add_branch", data)
        setBranchPhone("")
        setBranchLocation("")
        setF5(!f5)
    }

    async function editBranch (item) {
        setBranchSelected(item);
        setBranchPhone(item.branch_phone)
        setBranchLocation(item.branch_location)
    }

    async function editBranchApi () {
        var data = {
            "branch_id": branchSelected.branch_id,
            "branch_phone": branch_phone,
            "branch_location": branch_location
        }
        var rs = await axios.post("/api/edit_branch", data)
        setF5(!f5)
    }

    return (
        <>
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
                <CButton color="warning" onClick={() => {deleteBranch(branchSelected); setWarning(!warning)}}>Xóa</CButton>{' '}
                <CButton color="secondary" onClick={() => setWarning(!warning)}>Hủy</CButton>
              </CModalFooter>
            </CModal>


            <CModal
              show={add_branch}
              onClose={() => setAddBranch(!add_branch)}
              color="primary"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Thêm chi nhánh</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel> Số điện thoại </CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={branch_phone} onChange={(e) => setBranchPhone(e.target.value)}/>

                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel >Địa chỉ</CLabel>
                        </CCol>
                        <CCol >
                            <CTextarea
                                name="textarea-input"
                                id="textarea-input"
                                rows="2"
                                value={branch_location}
                                onChange={(e) => setBranchLocation(e.target.value)}
                            />
                        </CCol>
                    </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center">
                <CButton color="primary" onClick={() => addBranch()}>
                  Thêm
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setAddBranch(!add_branch)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>



            <CModal
              show={edit_branch}
              onClose={() => setEditBranch(!edit_branch)}
              color="info"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Sửa chi nhánh</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel> Số điện thoại </CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={branch_phone} onChange={(e) => setBranchPhone(e.target.value)}/>

                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel >Địa chỉ chi nhánh</CLabel>
                        </CCol>
                        <CCol >
                            <CTextarea
                                name="textarea-input"
                                id="textarea-input"
                                rows="2"
                                value={branch_location}
                                onChange={(e) => setBranchLocation(e.target.value)}
                            />
                        </CCol>
                    </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center" >
                <CButton color="info" onClick={() => editBranchApi()}>
                  Sửa
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setEditBranch(!edit_branch)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CButton color="primary" onClick={() => setAddBranch(!add_branch)}>Thêm chi nhánh</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table class="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th scope="col"> Mã chi nhánh </th>
                                        <th scope="col"> Số điện thoại </th>
                                        <th scope="col">Địa chỉ chi nhánh</th>
                                        <th scope="col">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        branchs.map((item) => (<>
                                            <tr>
                                                <th scope="row">{item.branch_id}</th>
                                                <td>{item.branch_phone}</td>
                                                <td>{item.branch_location}</td>
                                                <td>
                                                    <CButtonGroup>
                                                        <CButton color="info" onClick={() => {editBranch(item); setEditBranch(!edit_branch);}}>Sửa</CButton>
                                                        <CButton color="danger" onClick={() => {setBranchSelected(item); setWarning(!warning);}}>Xóa</CButton>
                                                    </CButtonGroup>
                                                </td>
                                            </tr>
                                        </>))
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



export default ManageBranch
