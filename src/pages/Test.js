import React from "react";
import {useState} from "react";
import {useEffect} from "react";

export const Test = () => {
    const [records, setRecords] = useState([]);

    const getPosts = async () => {
        const options = {
            method: 'GET'
        }
        const result = await fetch('https://api.github.com/users/xiaotian/repos', options);
        if(result.ok){
            const posts = await result.json();
            setRecords(posts)
            return posts;
        }
        return [];
    }
    
    useEffect(() => {
        getPosts()
    }, []);

    return (
        <div>
            <h1>Test page</h1>
            <div>
                {records.map(x => {
                    const postView = (
                        <div>
                            <h2>{x.id}</h2>
                            <p>{x.full_name}</p>
                        </div>
                    );
                    return postView;
                })}
            </div>
        </div>
    );
}