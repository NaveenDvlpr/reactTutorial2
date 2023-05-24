import Feed from "./Feed";

const Home = ({posts, fetchError, isLoading}) => {
    return (
      <main className="Home">
        {isLoading && <p className="statuMsg">Loading Posts...</p>}
        {!isLoading && fetchError && <p className="statusMsg" style={{color: "red"}}>{fetchError}</p>}
        {!isLoading && !fetchError && (posts.length ? <Feed posts = {posts} /> : <p className="statuMsg">No posts to display</p>)}
      </main>
    );
  }
  
  export default Home;
  