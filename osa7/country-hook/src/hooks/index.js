import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState('')

    useEffect(() => {
        if (name !== '') {
            axios
                .get('https://restcountries.eu/rest/v2/name/' + name)
                .then(response => {
                    setCountry(response.data)
                })
                .catch(e => {
                    setCountry('')
                })
        }
    }, [name])
    const onChange = (event) => {
        setCountry(event.target.value)
    }
    const reset = () => {
        setCountry('')
    }
    return {
        country,
    }
}