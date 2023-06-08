import React from 'react'

export default function useAccount() {
    

    const getAccount = () => {
        const accountString = localStorage.getItem("account")
        if (accountString && accountString !== ""){
            return JSON.parse(accountString)
        } else {
            return null
        }
    };

    const [account, setAccount] = React.useState(getAccount())

    const saveAccount = (acc) => {
        if (!acc) {
            localStorage.removeItem("account")
        } else {
            localStorage.setItem("account", JSON.stringify(acc))
        }
        setAccount(acc)
    };

    return {
        account,
        saveAccount,
    }
}