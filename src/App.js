
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Posts from './components/Posts/Posts';
import './App.css';
import PostDetails from './components/Posts/Post/PostDetails';
import PostEdit from './components/Posts/Post/PostEdit';
import PostsProvider from './contexts/PostsProvider';

function App() {
  return (
    <PostsProvider>
    <Router>
      <Switch>
      
        <Route exact path="/">
          <Redirect to="/posts"/>
        </Route>
        <Route path="/posts/:id([0-9]+)/edit" component={PostEdit}/>
        <Route path="/posts/:id([0-9]+)" exact component={PostDetails} />
        <Route path="/posts/new" component={PostEdit}/>
        <Route path="/posts" component={Posts} />
      
      </Switch>
    </Router>
    </PostsProvider>
  );
}

export default App;
