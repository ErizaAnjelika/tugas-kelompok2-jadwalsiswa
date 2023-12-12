import './sidebar.css';
import 'bootstrap/js/dist/dropdown';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <>
      <div className="samping bg-dark col-auto col-md-4 col-lg-3 min-vh-100  d-flex flex-column justify-content-between">
        <div className="bg-dark p-2">
          <a
            href=""
            className="d-flex text-decoration-none  mt-2 ms-3 align-items-center"
          >
            <span className="fs-4 d-none d-sm-inline text-white fw-bold">Sidebar</span>
          </a>
          <hr className="text-secondary" />
          <ul className="nav navbar-pills flex-column mt-2">
            <li className="nav-item py-2 py-sm-0">
              <Link
                to="/"
                className="nav-link text-white active"
                aria-current="page"
              >
                <i className="fs-4 bi bi-house-door-fill"></i>
                <span className="fs-5 d-none d-sm-inline ms-2">Home</span>
              </Link>
            </li>
            <li className="nav-item py-2 py-sm-0">
              <Link
                to="/siswa"
                className="nav-link text-white active"
                aria-current="page"
              >
                <i className="fs-4 bi bi-person-lines-fill"></i>
                <span className="fs-5 d-none d-sm-inline ms-2">Siswa</span>
              </Link>
            </li>
            <li className="nav-item py-2 py-sm-0">
              <a
                href=""
                className="nav-link text-white active"
                aria-current="page"
              >
                <i className="fs-4 bi bi-journal-bookmark"></i>
                <span className="fs-5 d-none d-sm-inline ms-2">Pelajaran</span>
              </a>
            </li>
            <li className="nav-item py-2 py-sm-0">
              <Link
                to="/jadwal"
                href=""
                className="nav-link text-white active"
                aria-current="page"
              >
                <i className="fs-4 bi bi-calendar-week"></i>
                <span className="fs-5 d-none d-sm-inline ms-2">Jadwal</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown p-3 fixed-bottom">
          <button
            className="btn border-none dropdown-toggle text-white"
            type="button"
            id="triggerId"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fs-4 bi bi-person-fill"></i>
            <span className="ms-2">User</span>
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="triggerId"
          >
            <button
              className="dropdown-item"
              href="#"
            >
              Action
            </button>
            <button
              className="dropdown-item"
              href="#"
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
