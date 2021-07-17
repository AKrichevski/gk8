import './App.css';
import React from 'react';
import Table from "./components/Table";
import {useState, useEffect} from 'react';
import Loader from "react-loader-spinner";

const API_KEY = 'AKS59YRSIEMFMCARFDSNEQSESX4ESQVEYU';

function App() {
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [isValidAddress, setIsValidAddress] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [data, setData] = useState({});
    const regex = new RegExp('^0x', 'g');
    const instructions = "Please enter your address:";
    const notValidAddressText = "You entered not valid address. \nPlease check that your address starts with 0x \nand the length of the address is 42 characters";

    const getData = async () => {
        fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }

    useEffect(() => {
        loading && isValidAddress && getData();
    }, [loading]);

    const validateAddress = (testAddress) => {
        const isValid = testAddress && regex.test(testAddress) && testAddress.length === 42;
        return isValid;
    }

    const handleSubmit = (event) => {
        const isAddress = validateAddress(address);
        !isAddress && setData({});
        setLoading(isAddress);
        setShowErrorMessage(!isAddress);
        setIsValidAddress(isAddress);
        event.preventDefault();
    }

    return (
        <div className="App">
            <header className="App-header">
                WELCOME
            </header>
            <form onSubmit={handleSubmit} className="Form">
                <div className="InputContainer">
                    <label style={{fontSize: '18px'}}>
                        {instructions}
                        <input className="Input" type="text" name="name" value={address}
                               onChange={e => setAddress(e.target.value)}
                               required/>
                    </label>
                    <input className="Padding" type="submit" value="Submit"/>
                </div>
                {showErrorMessage ? <div className="NotValidAddressText">
                    <label>{notValidAddressText}</label>
                </div> : null}
            </form>
            {loading &&
            <div className="Padding">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>}
            {data.result ? <Table data={data.result}/> : null}
        </div>
    );
}

export default App;
