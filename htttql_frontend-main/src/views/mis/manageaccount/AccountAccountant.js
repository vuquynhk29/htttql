
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
    CBadge,
    CFormGroup,
    CLabel,
    CInput,
    CFormText,
    CTextarea,
    CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios'
  
const AccountAccountant = () => {
    const [f5, setF5] = useState(false)
    const [warning, setWarning] = useState(false)
    const [accountselected, setAccountSelected] = useState({})
    const [add_account, setAddAccount] = useState(false)
    const [edit_account, setEditAccount] = useState(false)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [type, setType] = useState("Accountant")
    const [sex, setSex] = useState("")
    const [address, setAddress] = useState("")
    const [branch_id, setBranchId] = useState("")

    const [accounts, setAccounts] = useState(
        []
    )

    const [branchs, setBranchs] = useState(
        []
    )

    useEffect(() => {
        getBranchs()
        getAccounts()
    }, [f5])

    async function getBranchs() {
        var rs = await axios.post("/api/get_branch")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        setBranchs(data)
    }

    async function getAccounts() {
        var rs = await axios.post("/api/getusers")
        var rs = rs.data
        var data = rs.data
        console.log(data)
        var filter = []
        for(var i=0; i<data.length; i++) {
            if (data[i].type == type) {
                filter.push(data[i])
            }
        }
        setAccounts(filter)
    }

    async function deleteAccount( {user_id} ) {
        var data = {
            "user_id": user_id
        }
        var rs = await axios.post("/api/delete_acc", data)
        setF5(!f5)
    }

    async function addAccount () {
        var data = {
            username: username,
            password: password,
            email: email,
            address: address,
            sex: sex,
            phone: "",
            role: type,
            branch_id: branch_id
        }
        console.log(data)
        var rs = await axios.post("/api/create_acc", data)

        setUsername("")
        setEmail("")
        setAddress("")
        setSex("")
        setBranchId("")
        setPassword("")

        setF5(!f5)
    }

    async function editAccount (item) {
        setAccountSelected(item);
        setUsername(item.username)
        setEmail(item.email)
        setAddress(item.address)
        setSex(item.sex)
    }

    async function editAccountApi () {
        var data = {
            id: accountselected.user_id,
            username: username,
            password: password,
            email: email,
            address: address,
            sex: sex,
            phone: ""
        }
        var rs = await axios.post("/api/edit_info", data)
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
                <CButton color="warning" onClick={() => {deleteAccount(accountselected); setWarning(!warning)}}>Xóa</CButton>{' '}
                <CButton color="secondary" onClick={() => setWarning(!warning)}>Hủy</CButton>
              </CModalFooter>
            </CModal>

           
            <CModal 
              show={add_account} 
              onClose={() => setAddAccount(!add_account)}
              color="primary"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Thêm tài khoản</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Chi nhánh</CLabel>
                        </CCol>
                        <CCol >
                            <CSelect value={branch_id} onChange={(e) => setBranchId(e.target.value)}>
                                <option value={""}>Chọn chi nhánh</option>
                                {
                                    branchs.map((item) => 
                                        <>
                                        <option value={item.branch_id}>{item.branch_location}</option>
                                        </>
                                    )
                                }
                            </CSelect>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Tên tài khoản</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Mật khẩu</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Email</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Giới tính</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={sex} onChange={(e) => setSex(e.target.value)}/>
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
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </CCol>
                    </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center">
                <CButton color="primary" onClick={() => addAccount()}>
                  Thêm
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setAddAccount(!add_account)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>
           

            
            <CModal 
              show={edit_account} 
              onClose={() => setEditAccount(!edit_account)}
              color="info"
              size="lg"
              centered
            >
              <CModalHeader closeButton className="text-center">
                <CModalTitle className="w-100 addcustom ">Sửa tài khoản</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm className="form-horizontal">
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Tên tài khoản</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Mật khẩu</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Email</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup  row>
                        <CCol xs="2">
                            <CLabel>Giới tính</CLabel>
                        </CCol>
                        <CCol >
                            <CInput id="text-input" name="text-input" value={sex} onChange={(e) => setSex(e.target.value)}/>
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
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </CCol>
                    </CFormGroup>
                </CForm>
              </CModalBody>
              <CModalFooter className="justify-content-center" >
                <CButton color="info" onClick={() => editAccountApi()}>
                  Sửa
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setEditAccount(!edit_account)}>
                  Hủy
                </CButton>
              </CModalFooter>
            </CModal>

            <CRow>
                <CCol>
                    <CCard> 
                        <CCardHeader>
                            <CButton color="primary" onClick={() => setAddAccount(!add_account)}>Thêm tài khoản</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <table class="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Mã tài khoản</th>
                                        <th scope="col">Tên tài khoản</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">Giới tính</th>
                                        <th scope="col">Loại tài khoản</th>
                                        <th scope="col">Chi nhánh</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        accounts.map((item) => (<>
                                            <tr>
                                                <th scope="row">{item.user_id}</th>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.address}</td>
                                                <td>{item.sex}</td>
                                                <td><CBadge color="success">{item.type}</CBadge></td>
                                                <td>{item.branch.branch_location}</td>
                                                <td>
                                                    <CButtonGroup>
                                                        <CButton color="info" onClick={() => {editAccount(item); setEditAccount(!edit_account);}}>Sửa</CButton>
                                                        <CButton color="danger" onClick={() => {setAccountSelected(item); setWarning(!warning);}}>Xóa</CButton>
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



export default AccountAccountant