import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import useAccount from '../../../useAccount'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {account, saveAccount} = useAccount()

  const login = async () => {
    var input = {
      "username": username,
      "password": password
    }
    try {
      var rs = await axios.post("/api/signin", input)
      var rs = rs.data
      var data = rs.data // phai nhu nay ms lay dc data
      console.log(data)
      saveAccount(data)
    } catch (e) {
      console.log("Login loi")
      console.log(e)
    }


  }

  if (account) {
    return <Redirect from="/" to="/dashboard" />
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>Hệ thống thông tin quản lý kế toán - Nhóm 15</h2>
                    <p className="text-muted">Đăng nhập</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" onClick={(e) => login()} className="px-4">Đăng nhập</CButton>
                      </CCol>

                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none backgroud-image-login" style={{ width: '44%', backgroundImage: `url("/image/login.png")` }}>
                {/* <CCardBody className="text-center"> */}
                  {/* <div>
                    <h2></h2>
                    <p></p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div> */}
                {/* </CCardBody> */}
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
