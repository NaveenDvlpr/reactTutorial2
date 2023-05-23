import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';

import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';


function App() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "First Post is the best Post,"
    },
    {
      id: 2,
      title: "My Second Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Second Post ............."
    },
    {
      id: 3,
      title: "My Third Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Third Post is Sweet."
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Ahhh.... Here we go again."
    }
  ])
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const history = useHistory();

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id+1 : 1;
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, dateTime, body: postBody};
    const allPosts =[...posts, newPost ];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    history.push('/');
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    history.push('/');
  }

  return (
    <div className="App">
      <Header 
        title="React JS Blog"      
      />
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Switch>
        <Route exact path="/">
        <Home posts={searchResults}/>
        </Route>
        <Route exact path="/post">
        <NewPost 
          handleSubmit={handleSubmit}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
        />
        </Route>
        <Route path="/post/:id">
        <PostPage posts={posts} handleDelete={handleDelete}/>
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing}/>
      </Switch>
      <Footer />
    </div>
  );
}


export default App;
