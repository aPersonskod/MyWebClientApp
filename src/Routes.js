import {BrowserRouter as Router, Route, Routes, Link, useParams} from 'react-router-dom';
import './App.css';
import {NewPage} from "./pages/NewPage";
import {Posts} from "./pages/Posts";
import {OldPage} from "./pages/OldPage";
import {Test} from "./pages/Test";

export const AppRoutes = () => {
    return (
        <Router>
            <nav style={{margin: 10}}>
                <Link to="/" style={{padding: 5}}>Home</Link>
                <Link to="/new-page" style={{padding: 5}}>NewPage</Link>
                <Link to="/posts" style={{padding: 5}}>Posts</Link>
                <Link to="/test" style={{padding: 5}}>Test</Link>
            </nav>
            <Routes>
                <Route path="/" element={<OldPage/>}/>
                <Route path="/new-page" element={<NewPage/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/posts/:param" element={<Posts/>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </Router>
    );
}

function ErrorPage(){
    return(
        <h1>Error 404. Page not found =(</h1>
    );
}