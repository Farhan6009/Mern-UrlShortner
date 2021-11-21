import React, { useEffect, useState } from 'react'
import axios from "axios";


const List = () => {

    const [list, setlist] = useState([]);
    const [url, seturl] = useState("");
    const [state, setstate] = useState(false);

    const urlLists = async () => {
        const res = await axios.get("http://localhost:5000");
        setlist(res.data);
    }
    const visitUrl = async (shortUrl) => {
        const res = await axios.get(`http://localhost:5000/${shortUrl}`);
        setstate(!state);
        seturl(res.data);
    }
    useEffect(() => {
        urlLists();
    }, [state])
    return (
        <>
            <h2>Short Url Lists</h2>
            <table className="table table-stripped table-success table-hover table-bordered border-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Full Url</th>
                        <th scope="col">Short Url</th>
                        <th scope="col">Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((currElem, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{currElem.full}</td>
                                <td><a href={url} target="_blank" rel="noreferrer" onClick={() => {
                                    visitUrl(currElem.short);
                                }}>{currElem.short}</a></td>
                                <td>{currElem.clicks}</td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>

        </>
    )
}

export default List
