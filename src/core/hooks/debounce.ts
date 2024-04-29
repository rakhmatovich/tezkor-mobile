import { useState, useEffect, useRef } from "react"

const debounce = (value: string, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value)
    const timerRef = useRef<string | number | NodeJS.Timeout | undefined>(undefined)

    useEffect(() => {
        timerRef.current = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timerRef.current)
    }, [value, delay])

    return debouncedValue
}

export default debounce
