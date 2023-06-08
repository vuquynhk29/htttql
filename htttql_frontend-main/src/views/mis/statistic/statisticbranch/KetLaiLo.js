import React, { useEffect, useState } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CSelect,
    CLabel,
} from '@coreui/react'
import Plot from 'react-plotly.js';
import useAccount from 'src/useAccount';
import axios from 'axios'


const KetLaiLo = () => {
    const {account, saveAccount} = useAccount()

    const [inoutchart, setInOutChart] = React.useState([{
        x: [],
        y: [],
        name: "InOut",
        type: 'lines+markers'
    }])

    useEffect(() => {
        getInOutByBranch()
    }, [])

    async function getInOutByBranch () {
        // var rq = {
        //     branchid: branch_id,
        //     userid: account.user_id
        // }
        var rs = await axios.post("/api/StatisticInOutcome")
        var rs = rs.data
        var data = rs.data
        var tmp = [...inoutchart]
        tmp[0].x = []
        tmp[0].y = []
        for(var i=0; i<data.statistic.length; i++){
            tmp[0].x.push(data.statistic[i].date)
            tmp[0].y.push(data.statistic[i].value.interest)
        }
        setInOutChart(tmp)
    }

    return (
    <>
        <CRow>
            <CCol xs="12">
                <CCard>
                    <CCardHeader>
                        Thống kê lãi/lỗ
                    </CCardHeader>
                    <CCardBody>
                        <Plot
                            divId={"inoutchart"}
                            data={inoutchart}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </>
    )
}

export default KetLaiLo