import React, { useEffect, useState } from 'react';
import Edit from '../../img/edit.png'
import { toast } from 'react-toastify';
import './AdminPage.css'
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdDeleteForever } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';

const AdminPage = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("tokenItem")
        navigate("/")
    }

    const [nameEn, setNameEn] = useState({
        name_en: '',
        name_ru: ''
    })
    // const [nameRu, setNameRu] = useState()
    const [picture, setPicture] = useState()
    const formData = new FormData()
    formData.append("name_en", nameEn.name_en)
    formData.append("name_ru", nameEn.name_ru)
    formData.append("images", picture)


    const [dataItem, setDataItem] = useState()
    const [btnId, setBtnId] = useState()

    const getApi = () => {

    }





    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
            .then((res) => {
                return res.json()
            })
            .then((item) => {
                setDataItem(item?.data)
            })
            .catch((error) => {


            })
    }, [dataItem])

    const [modal, setModal] = useState(false)
    const modalOpen = () => {
        setModal(true)
    }
    const tokenn = localStorage.getItem("tokenItem")
    // Post Api
    const createCategory = (e) => {
        e?.preventDefault()

        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
            method: "Post",
            body: formData,
            headers: {
                "Authorization": `Bearer ${tokenn}`
                // "content-type" : "multipart/form/data"
            }
        })
            .then((resp) => resp.json())
            .then((element) => {
                if (element?.success) {
                    toast.success(element?.message)
                    setDataItem(dataItem)
                    setModal(false)
                } else {
                    toast.error(element?.message)
                }
            })

    }
    // Delete Api


    const deleteFunc = (id) => {
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
            method: "Delete",
            headers: {
                "authorization": `Bearer ${tokenn}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.success) {
                    toast.success(data?.message)
                    // setDataItem(dataItem)
                    setModal(false)
                } else {
                    toast.error(data?.message)
                }
            }
            )
    }

    // Edit api
    const [edit, setEdit] = useState(false)


    const isOpenHandle = () => {
        setEdit(true)
    }

    const [imageSrc, setImageSrc] = useState('/path/to/image.jpg');

    const updateImage = () => {
        const timestamp = new Date().getTime();
        setImageSrc(`/path/to/image.jpg?timestamp=${timestamp}`);
    };

    useEffect(() => {
        updateImage();
    }, [dataItem]);

    const editFunc = (e) => {
        e.preventDefault()

        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${btnId}`, {
            method: "Put",
            body: formData,
            headers: {
                "authorization": `Bearer ${tokenn}`,
            },
        })

            .then(response => {
                return response.json();
            })
            .then(dataEl => {
                if (dataEl?.success) {
                    toast.success(dataEl?.message)
                    getApi()
                    setEdit(false)
                } else {
                    toast.error(dataEl?.message)
                }
            })
            .catch(error => {
            })
            .finally(() => {
            });



    }

    const closeModal = (elem) => {
        setModal(false)
        setEdit(false)
    }



    return (
        <div className='d-print-flex admin-page'>
            <div className="nav">
                <h4 className="logo">Admin</h4>
                <button onClick={logout} className='logout'>Logout</button>
            </div>
            <div className="settings">
                <h4 className="settings-title">Settings</h4>
                <button onClick={modalOpen} type='click' className="btn btn-primary  add">Add categories</button>
            </div>
            {
                modal &&
                <div className="modall">
                    <form onSubmit={createCategory} className="modall-content">
                        <div onClick={closeModal} className="toggle-block">
                            <div className="toggle"></div>
                            <div className="toggle-line"></div>
                        </div>
                        <label className="form-label"> Name en:
                            <input onChange={(e) => setNameEn({ ...nameEn, name_en: e?.target?.value })} required type="text" className="add-input" />
                        </label>
                        <label className="form-label"> Name en:
                            <input onChange={(e) => setNameEn({ ...nameEn, name_ru: e?.target?.value })} required type="text" className="add-input" />
                        </label>
                        <label className="form-label"> Chose file:
                            <input accept="image/png, image/jpeg" onChange={(e) => setPicture(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <button type='submit' className="add-btn btn btn-primary w-100">Uplaod</button>
                    </form>
                </div>
            }

            {
                edit &&
                <div className="modall">
                    <form onSubmit={editFunc} className="modall-content">
                        <div onClick={closeModal} className="toggle-block">
                            <div className="toggle"></div>
                            <div className="toggle-line"></div>
                        </div>
                        <label className="form-label"> Name en:
                            <input value={nameEn?.name_en} onChange={(e) => setNameEn({ ...nameEn, name_en: e?.target?.value })} required type="text" className="add-input" />
                        </label>
                        <label className="form-label"> Name ru:
                            <input value={nameEn?.name_ru} onChange={(e) => setNameEn({ ...nameEn, name_ru: e?.target?.value })} required type="text" className="add-input" />
                        </label>
                        <label className="form-label"> Chose file:
                            <input accept="image/png, image/jpeg" onChange={(e) => setPicture(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <button type='submit' className="add-btn btn btn-primary w-100">Update</button>
                    </form>
                </div>
            }


            <div className="admin">
                <table class="table table-striped table-cars ps-5">
                    <thead className='table-item p-5'>
                        <tr className='p-3'>
                            <th scope="col">Name_en</th>
                            <th scope="col">Name_ru</th>
                            <th scope="col">Image</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataItem?.map((elem, i) => (
                                <tr key={i}>
                                    <th className='pt-4'>{elem?.name_en}</th>
                                    <td className='pt-4'>{elem?.name_ru}</td>
                                    <td>
                                        <img className="table-img" src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.image_src}`} alt={elem?.name_en} />
                                    </td>
                                    <td className='pt-4 rename'>
                                        <div onClick={() => setNameEn(elem)} className='d-inline'>
                                            <div onClick={isOpenHandle} className='d-inline'>
                                                <button onClick={() => setBtnId(elem?.id)} className="btn btn-primary ps-3 pe-3">
                                                    <FaRegEdit className='icon-size' />
                                                </button>
                                            </div>
                                        </div>
                                        <button onClick={() => deleteFunc(elem?.id)} className="btn btn-danger ms-3 ps-3 pe-3">
                                            <MdDeleteForever className='icon-size' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPage;
