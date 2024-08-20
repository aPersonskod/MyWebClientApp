import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {ModalButton} from "./ModalBtn";

const URL = 'https://localhost:7243/api/users';

export const Posts = () => {
    const [allPosts, setPosts] = useState([]);
    
    const getPosts = async () => {
        const options = {
            method: 'GET',
            headers: new Headers()
        }
        const result = await fetch(URL, options);
        if(result.ok){
            const posts = await result.json();
            setPosts(posts)
            return posts;
        }
        return [];
    }
    const addPost = async () => {
        let header = document.querySelector('#header');
        let blog = document.querySelector('#blog');
        
        const newPost = {
            header: header.value,
            blog: blog.value
        }
        
        let headers = new Headers();
        headers.set('Content-Type', 'application/json')
        
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newPost)
        }
        const res = await fetch(URL, options);
        if(res.ok){
            let post = await res.json();
            allPosts.push(post)
            setPosts(allPosts.slice());
            header.value = '';
            blog.value = '';
        }
    }
    const updatePost = async (oldPost) => {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        const options = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(oldPost)
        }
        let res = await fetch(URL, options);
        if(res.ok){
            let post = await res.json();
            let updatedPost = allPosts.findIndex(x => x.id === oldPost.id);
            allPosts[updatedPost] = post;
            setPosts(allPosts.slice());
        }
    }
    const deletePost = async (id) => {
        const options = {
            method: 'DELETE',
            headers: new Headers()
        }
        let res = await fetch(URL + `/${id}`, options);
        if(res.ok){
            setPosts(allPosts.filter(x => x.id !== id));
        }
    }
    
    useEffect( () => {getPosts()}, []);
    
    return (
        <div>
            <h1>Создание постов</h1>
            <div>
                <div style={{margin: '10px'}}>
                    <input id="header" type={"text"}/>
                </div>
                <div style={{margin: '10px'}}>
                    <textarea id="blog"/>
                </div>
                <div style={{margin: '10px'}}>
                    <button onClick={() => addPost()}>Добавить пост</button>
                </div>
            </div>
            <div>
                {allPosts.map(x => <PostItem key={x.id} post={x} deleteAction={deletePost} updateAction={updatePost}/> )}
            </div>
        </div>
    );
}

const PostItem = ({post, deleteAction, updateAction}) => {
    return(
      <div>
          <h2>{post.header}</h2>
          <p>{post.blog}</p>
          <div style={{display: 'flex'}}>
              <button onClick={() => deleteAction(post.id)}>Удалить</button>
              <ModalButton btnName={'Обновить'} title={'Обновление поста'} modalContent={
                  <div>
                      <div style={{margin: '10px'}}>
                          <input id="header" type={"text"} defaultValue={post.header} onChange={e => post.header = e.target.value}/>
                      </div>
                      <div style={{margin: '10px'}}>
                          <textarea id="blog" defaultValue={post.blog} onChange={e => post.blog = e.target.value}/>
                      </div>
                      <div style={{margin: '10px'}}>
                          <button onClick={() => updateAction(post)}>Обновить пост</button>
                      </div>
                  </div>
              }/>
          </div>
      </div>  
    );
}