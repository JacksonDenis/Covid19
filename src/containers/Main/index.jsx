import React,  {memo, useState, useCallback, useEffect} from "react";
import Api from '../../api';
import Board from './Components/Board';
import Panel from './Components/Panel';
import { ContainerStyled } from './style'

function Main() {
    const [data,setData] = useState({})
    const [country, setCountry] = useState('brazil') 
    const updateAt = new Date().toLocaleString()

    const getCovitData = useCallback((country) => {
        Api.getCountry(country)
            .then(data=> setData(data))
    },[])

    useEffect (()=> {
        getCovitData(country)
    },[getCovitData, country])

    const handleChange = ({target}) => {
        const country = target.value 
        setCountry(country)
    }

    return(
        <containerStyled>
            <div className="mb-2">
                <Panel
                data={data}
                updataAt={updateAt}
                onChange={handleChange}
                country={country}
                getCovitData={getCovitData}                
                />

            </div>
            <Board data={data} />
        </containerStyled>
    )
}


export default memo(Main)