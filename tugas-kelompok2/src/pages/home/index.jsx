import Sidebar from '../../components/sidebar';

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="ps-3 col content">
          <h1>ini home</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
