import 'bootstrap/js/dist/modal';
import Sidebar from '../../components/sidebar';
import './siswa.css';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
function Siswa() {
  //define state
  const [siswa, setSiswa] = useState([]);

  //state memunculkan form update
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  //state update data
  const [updateData, setUpdateData] = useState({
    nama_siswa: '',
    kode_kelas: '',
  });

  //state form tambah data
  const [isCreateForm, setIsCreateForm] = useState(false);

  // state tambah data
  const [createData, setCreateData] = useState({
    nama_siswa: '',
    kode_kelas: '',
  });

  //useEffect hook
  useEffect(() => {
    //panggil method "fetchData"
    fetchData();
  }, []);

  //function "fetchData"
  const fetchData = async () => {
    //fetching
    const response = await axios.get('http://localhost:5240/api/Siswa');
    //get response data
    const data = await response.data.data;
    //assign response data to state "datamahasiswa"
    setSiswa(data);
    console.log('Data Siswa dari Server:', data);
  };

  // Handle row click -> untuk update data
  const handleRowClick = (row) => {
    setUpdateData({
      id_siswa: row.id_siswa,
      nama_siswa: row.nama_siswa,
      kode_kelas: row.kode_kelas,
    });
    setIsEditFormVisible(true);
  };

  // Handle update -> fetch update data
  const handleUpdate = async () => {
    try {
      console.log('Update Data:', updateData);
      // edit data berdasarkan id
      await axios.put(`http://localhost:5240/api/Siswa/${updateData.id_siswa}`, updateData);
      fetchData();
      setIsEditFormVisible(false);

      alert('Update data Berhasil');
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Update Data Gagal');
    }
  };
  const handleDelete = async (row) => {
    const deleteData = window.confirm('Apakah anda yakin ingin menghapus Data ini?');
    if (deleteData) {
      try {
        await axios.delete(`http://localhost:5240/api/Siswa/${row.id_siswa}`);
        fetchData();
        alert('Delete Data Berhasil');
      } catch (error) {
        console.error('Error delete data', error);
        alert('Delete Data Gagal');
      }
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(`http://localhost:5240/api/Siswa/`, createData);
      fetchData();
      setIsCreateForm(false);
      setCreateData({
        nama: '',
        email: '',
        password: '',
        nohp: '',
        status: '',
      });
      alert('Tambah Data Berhasil');
    } catch (error) {
      console.log('error tambah data', error);
      alert('Tambah Data Gagal');
    }
  };
  const handleCancel = () => {
    setIsEditFormVisible(false);
    setIsCreateForm(false);
    setUpdateData({
      id_siswa: '',
      nama_siswa: '',
      kode_kelas: '',
    });
  };
  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: false,
      grow: 0,
    },
    {
      name: 'Nama',
      selector: (row) => row.nama_siswa,
      sortable: true,
    },
    {
      name: 'Kelas',
      selector: (row) => row.kelas,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-buttons">
          <button
            className="edit-button"
            onClick={() => handleRowClick(row)}
          >
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => handleDelete(row)}
          >
            Delete
          </button>
        </div>
      ),
      width: '200px',
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        fontSize: '18px',
      },
    },
    cells: {
      style: {
        fontSize: '15px',
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
              <div className="content">
                <div className="title d-flex justify-content-between">
                  Data Siswa
                  <button
                    className="tambah-button"
                    onClick={() => setIsCreateForm(true)}
                  >
                    Tambah
                  </button>
                </div>

                {/* form edit siswa */}
                {isEditFormVisible && (
                  <div className="update-form">
                    <label>Nama:</label>
                    <input
                      type="text"
                      value={updateData.nama_siswa}
                      onChange={(e) => setUpdateData({ ...updateData, nama_siswa: e.target.value })}
                    />
                    <br />
                    <label>Kelas:</label>
                    <select
                      value={updateData.kode_kelas}
                      onChange={(e) => setUpdateData({ ...updateData, kode_kelas: e.target.value })}
                    >
                      <option value="">Pilih Kelas</option>
                      <option value="1">10 TKJ</option>
                      <option value="2">11 TKJ</option>
                      <option value="3">12 TKJ</option>
                      {/* Tambahkan opsi untuk kelas lainnya jika diperlukan */}
                    </select>
                    {/* <input
                type="text"
                value={updateData.kode_kelas}
                onChange={(e) => setUpdateData({ ...updateData, kode_kelas: e.target.value })}
              /> */}

                    <button
                      className="button-batal"
                      onClick={handleCancel}
                    >
                      Batal
                    </button>
                    <button onClick={handleUpdate}>Simpan</button>
                  </div>
                )}

                {/* untuk create data */}
                {isCreateForm && (
                  <div className="update-form">
                    <label>Nama:</label>
                    <input
                      type="text"
                      value={createData.nama_siswa}
                      onChange={(e) => setCreateData({ ...createData, nama_siswa: e.target.value })}
                    />
                    <br />
                    <label>Kelas:</label>
                    <select
                      value={createData.kode_kelas}
                      onChange={(e) => setCreateData({ ...createData, kode_kelas: e.target.value })}
                    >
                      <option value="">Pilih Kelas</option>
                      <option value="1">10 TKJ</option>
                      <option value="2">11 TKJ</option>
                      <option value="3">12 TKJ</option>
                      {/* Tambahkan opsi untuk kelas lainnya jika diperlukan */}
                    </select>
                    <button
                      className="button-batal"
                      onClick={handleCancel}
                    >
                      Batal
                    </button>
                    <button onClick={handleCreate}>Simpan</button>
                  </div>
                )}

                <DataTable
                  className="mt-3"
                  columns={columns}
                  data={siswa}
                  pagination
                  customStyles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Siswa;
