import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {CountryType} from "./types";
import Country from "./components/Country";
import Loading from "./components/Loading";

function App() {
    const [ countries, setCountries ] = useState<CountryType[]>([])
    const [ loading, setLoading ] = useState<boolean>(false)

    const getCountries = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get<CountryType[]>('http://api.countrylayer.com/v2/all?access_key=e7ea5787c3d9ee5a7578afcb00d9102f')
            setCountries(data)
        }
        catch {
            console.log('An Error Occured While Fetching Data')
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCountries()
    },[])

    return (
        <Loading loading={loading}>
            {countries.map(country => {
                return (
                    <Country key={country.name} country={country} />
                )
            })}
        </Loading>
    );
}

export default App;