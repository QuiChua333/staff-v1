
import './App.css';
import { AiOutlineClose } from "react-icons/ai";
import Modal from './Modal';
import { useEffect, useState } from 'react';
import axios from './customize-axios'




function App() {
  const [showModal, setShowModal] = useState(false);
  const [listStaffs, setListStaffs] = useState([]);
  const [staff, setStaff] = useState({});
  const [action,setAction] = useState('');

  useEffect(() => {
    getStaffs();
  }, [])

  const getStaffs = async () => {
    const res = await axios.get('/api/v1/staff');
    console.log(res)
    if (res) {
      setListStaffs(res)
    }
  }

  const handleClickAdd = () => {
    setAction('add');
    setShowModal(true)
  }
  const handleClickUpdate = (item) => {
    setAction('update');
    setStaff(item);
    setShowModal(true)
  }

  const handleClickDelete = (id) => {


    axios.delete(`/api/v1/staff/${id}`)
    .then(res =>{
      console.log(res)
      getStaffs();
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="App">
      <div className="wrapper">

        <div className="toolbox">
          <span className="text-search">Tìm kiếm</span>
          <input className="input-search" type='text' />
          <span onClick={handleClickAdd} className="add">Add</span>
        </div>

        <div className="list-staff">
          {
            listStaffs.map((item, index) => {
              return (
                <div key={index} className="staff">
                  <div className="info-wrapper">
                    <img className="img" src={item.avatar} />
                    <div className="info">
                      <span>{item.name}</span>
                      <span>{item.type}</span>
                      <span>{item.salary}</span>
                    </div>
                  </div>

                  <div className="action">
                    <span onClick={() => handleClickUpdate(item)} className="update">
                      Sửa
                    </span>
                    <span onClick={() => handleClickDelete(item.id)} className="delete">
                      <AiOutlineClose style={{ color: '#fff' }} />
                    </span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      {
        showModal && <Modal showModal={showModal} setShowModal={setShowModal} action={action} getStaffs={getStaffs} staff={staff}/>
      }
    </div>
  );
}

export default App;
