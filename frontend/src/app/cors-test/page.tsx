"use client"

import {useEffect, useState} from "react";

export default function CorsTest() {
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/projects", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => setError(err.message));
    }, []);

    return <pre>{error ?? JSON.stringify(data, null, 2)}</pre>

}