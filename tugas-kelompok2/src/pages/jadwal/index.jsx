import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import "bootstrap/js/dist/modal";
import "./siswa.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
const Jadwal = () => {
  const [jadwal, setJadwal] = useState([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [kelas, setkelas] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    await axios
      .post("http://localhost:5240/api/jadwal", form)
      .then((response) => {
        if (response.status === 200) {
          alert("Data berhasil Ditambah");
        }
      });
    fetchData();
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    await axios
      .put("http://localhost:5240/api/jadwal/" + form.id_mapel, form)
      .then((response) => {
        if (response.status === 200) {
          alert("Data berhasil diubah");
        }
      })
      .catch((err) => console.log(err));
    fetchData();
  };

  const handleDelete = (e) => {
    const bool = confirm("ap[aasda");
    if (!bool) {
      return false;
    }
    hapus(e);
  };

  const hapus = async (e) => {
    await axios
      .delete("http://localhost:5240/api/jadwal/" + e.target.dataset.id)
      .then((response) => {
        if (response.status === 200) {
          alert("Data berhasil dihapus");
        }
      })
      .catch((err) => alert(err));
    fetchData();
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  //useEffect hook
  useEffect(() => {
    //panggil method "fetchData"
    if (sessionStorage.getItem("akun") === null) {
      return navigate("/login");
    }
    fetchData();
    fetchKelas();
  }, []);
  //function "fetchData"
  const fetchData = async () => {
    //fetching
    const response = await axios.get("http://localhost:5240/api/jadwal");
    //get response data
    const data = await response.data.data;
    //assign response data to state "datamahasiswa"
    setJadwal(data);
  };

  const fetchKelas = async () => {
    //fetching
    const response = await axios.get("http://localhost:5240/api/kelas");
    //get response data
    const data = await response.data.data;
    //assign response data to state "datamahasiswa"
    setkelas(data);
  };

  const modalShow = (e) => {
    const data = jadwal.filter((data) => data.id_mapel == e.target.dataset.id);
    // setDataOne(data);
    setForm(data[0]);
  };

  console.log(kelas);
  const columns = [
    {
      name: "Kelas",
      selector: (row) => row.kelas,
      sortable: true,
    },
    {
      name: "Mata Pelajaran",
      selector: (row) => row.mata_pelajaran,
      sortable: true,
    },

    {
      name: "Pengajar",
      selector: (row) => row.nama_guru,
      sortable: true,
    },

    {
      name: "Hari",
      selector: (row) => row.hari,
      sortable: true,
    },

    {
      name: "Jam Mulai",
      selector: (row) => row.jam_mulai,
      sortable: true,
    },

    {
      name: "Jam Akhir",
      selector: (row) => row.jam_akhir,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="action-buttons">
          <button
            className="edit-button"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
            data-id={row.id_mapel}
            onClick={modalShow}
          >
            Edit
          </button>
          <button
            className="delete-button"
            data-id={row.id_mapel}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      ),
      width: "200px",
    },
  ];

  const kelasList = kelas.map((index, number) => {
    return (
      <option value={index.id_kelas} key={number}>
        {index.kelas}
      </option>
    );
  });
  const kelasListUpdate = kelas.map((index, number) => {
    return (
      <option
        value={index.id_kelas}
        key={number}
        selected={form.kode_kelas === index.id_kelas ? "selected" : ""}
      >
        {index.kelas}
      </option>
    );
  });
  const customStyles = {
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "18px",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="ps-3 col content">
          <div className="card mt-4">
            <div className="container">
              <div className="content p-4">
                <h3>Data Jadwal Pelajaran</h3>
                <button
                  type="button"
                  className=" tambah-button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  + Tambah Pelajaran
                </button>
                <DataTable
                  columns={columns}
                  data={jadwal}
                  pagination
                  customStyles={customStyles}
                  className="mt-3"
                />
              </div>
            </div>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Tambah Pelajaran
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body fs-5">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Mata Pelajaran
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="mata_pelajaran"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Nama Pengajar
                        </label>
                        <input
                          type="text"
                          name="nama_guru"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Jam Pelajaran
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="kode_jam"
                          onChange={handleChange}
                        >
                          <option selected="">Open this select menu</option>
                          <option value={7}>07.00 - 10.00</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Hari
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="kode_hari"
                          onChange={handleChange}
                        >
                          <option selected="">Pilih Hari</option>
                          <option value={1}>Senin</option>
                          <option value={2}>Selasa</option>
                          <option value={3}>Rabu</option>
                          <option value={4}>Kamis</option>
                          <option value={5}>Jumat</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Kelas
                        </label>
                        <select
                          className="form-select"
                          name="kode_kelas"
                          aria-label="Default select example"
                          onChange={handleChange}
                        >
                          <option selected="">Pilih Kelas</option>
                          {/* <option value={5}>XII TKJ</option> */}
                          {kelasList}
                        </select>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Tambah
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="editModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <form onSubmit={handleSubmitUpdate}>
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Edit Jadwal Pelajaran
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body fs-5">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Mata Pelajaran
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="mata_pelajaran"
                          onChange={handleChange}
                          value={form.mata_pelajaran}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Nama Pengajar
                        </label>
                        <input
                          type="text"
                          name="nama_guru"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={handleChange}
                          value={form.nama_guru}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Jam Pelajaran
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="kode_jam"
                          onChange={handleChange}
                        >
                          <option
                            selected={form.kode_jam === 7 ? "selected" : ""}
                            value={7}
                          >
                            07.00 -10.00
                          </option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Hari
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          name="kode_hari"
                          onChange={handleChange}
                        >
                          <option
                            selected={form.kode_hari === 1 ? "selected" : ""}
                            value={1}
                          >
                            senin
                          </option>
                          <option
                            selected={form.kode_hari === 2 ? "selected" : ""}
                            value={2}
                          >
                            selasa
                          </option>
                          <option
                            selected={form.kode_hari === 3 ? "selected" : ""}
                            value={3}
                          >
                            rabu
                          </option>
                          <option
                            selected={form.kode_hari === 4 ? "selected" : ""}
                            value={4}
                          >
                            kamis
                          </option>
                          <option
                            selected={form.kode_hari === 2 ? "selected" : ""}
                            value={5}
                          >
                            jumat
                          </option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Kelas
                        </label>
                        <select
                          className="form-select"
                          name="kode_kelas"
                          aria-label="Default select example"
                          onChange={handleChange}
                        >
                          {/* <option value={5}>XII TKJ</option> */}
                          {kelasListUpdate}
                        </select>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jadwal;
