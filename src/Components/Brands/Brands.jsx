import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Laoding from '../../img/SVKl.gif'
import Laod from '../../img/loading-waiting.gif'

const Brands = () => {
    const [dataItem, setDataItem] = useState()
    const [btnId, setBtnId] = useState()

    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("tokenItem")
        navigate("/")
    }

    const [laoding, setLaoding] = useState(true)
    const [laod, setLaod] = useState(false)

    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
            .then((res) => {
                return res.json()
            })
            .then((item) => {
                setDataItem(item?.data)
                setLaoding(false)
            })
            .catch((error) => {
                toast.error(error)
                setLaoding(false)
            })
    }, [])

    const [modal, setModal] = useState(false)
    const modalOpen = () => {
        setModal(true)
    }

    const [title, setTitle] = useState({
        title: '',
    })
    const [picture, setPicture] = useState()
    const formData = new FormData()
    formData.append("title", title?.title)
    formData.append("images", picture)
    const tokenn = localStorage.getItem("tokenItem")
    // Post Api
    const createCategory = (e) => {
        e?.preventDefault()
        setLaod(true)
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands", {
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
                    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
                        .then((res) => res.json())
                        .then((item) => setDataItem(item?.data))
                    setEdit(false)
                    setModal(false)
                } else {
                    toast.error(element?.message)
                }
            })

            .finally(() => {
                setLaod(false)
            })

    }
    // Delete Api


    const deleteFunc = () => {
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${btnId}`, {
            method: "Delete",
            headers: {
                "authorization": `Bearer ${tokenn}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.success) {
                    toast.success(data?.message)
                    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
                        .then((res) => res.json())
                        .then((item) => setDataItem(item?.data))
                    setDelModal(false)
                } else {
                    toast.error(data?.message)
                    setDelModal(false)
                }
            }
            )
    }

    // Edit api
    const [edit, setEdit] = useState(false)


    const isOpenHandle = () => {
        setEdit(true)
    }

    const editFunc = (e) => {
        e.preventDefault()
        setLaod(true)
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${btnId}`, {
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
                    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
                        .then((res) => res.json())
                        .then((item) => setDataItem(item?.data))
                    setEdit(false)
                } else {
                    toast.error(dataEl?.message)
                }
            })
            .catch(error => {
            })
            .finally(() => {
                setLaod(false)
            });
    }

    const closeModal = (elem) => {
        setModal(false)
        setEdit(false)
    }
    const [delModal, setDelModal] = useState(false)

    const deleteMod = () => {
        setDelModal(x => !x)
    }

    return (
        <div className='d-print-flex admin-page position-relative'>
            {
                laoding &&
                <div className="laoding">
                    <img src={Laoding} alt="" className="laoding-img" />
                </div>
            }
            <div className="nav">
                <h4 className="logo">Admin</h4>
                <button onClick={logout} className='logout'>Logout</button>
            </div>
            <div className="settings">
                <h4 className="settings-title">Brands</h4>
                <button onClick={modalOpen} type='click' className="btn btn-primary  add">Add categories</button>
            </div>
            {
                modal &&
                <div className="modall">
                    <form onSubmit={createCategory} className="modall-content h-50">
                        <div onClick={closeModal} className="toggle-block">
                            <div className="toggle"></div>
                            <div className="toggle-line"></div>
                        </div>
                        <label className="form-label"> Title:
                            <input onChange={(e) => setTitle({ ...title, title: e?.target?.value })} required type="text" className="add-input" />
                        </label>
                        <label className="form-label"> Chose file:
                            <input accept="image/png, image/jpeg" onChange={(e) => setPicture(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <button type='submit' className="add-btn btn btn-primary w-100">Uplaod
                            {
                                laod &&
                                <img src={Laod} alt="Laoding..." className="laod" />
                            }
                        </button>
                    </form>
                </div>
            }

            {
                edit &&
                <div className="modall">
                    <form onSubmit={editFunc} className="modall-content h-50">
                        <div onClick={closeModal} className="toggle-block">
                            <div className="toggle"></div>
                            <div className="toggle-line"></div>
                        </div>
                        <label className="form-label"> Title:
                            <input value={title?.title} onChange={(e) => setTitle({ ...title, title: e?.target?.value })} required type="text" className="add-input" />
                        </label>
                        <label className="form-label"> Chose file:
                            <input accept="image/png, image/jpeg" onChange={(e) => setPicture(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <button type='submit' className="add-btn btn btn-primary w-100">Update
                            {
                                laod &&
                                <img src={Laod} alt="Laoding..." className="laod" />
                            }
                        </button>
                    </form>
                </div>
            }

            {
                delModal &&
                <div className="modall">
                    <div className="modall-content h-25">
                        <h5 className="text-center">Are you sure you want to delete?</h5>
                        <div className="modal-btn">
                            <button onClick={deleteMod} className="btn btn-danger">Close</button>
                            <div>
                                <button onClick={deleteFunc} className="btn btn-primary">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div className="admin">
                <table class="table table-striped table-cars ps-5">
                    <thead className='table-item p-5'>
                        <tr className='p-3'>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataItem?.map((elem, i) => (

                                <tr key={i}>

                                    <th className='pt-4'>{elem?.title}</th>
                                    <td>
                                        <img className="table-img" src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.image_src}`} alt={elem?.name_en} />
                                    </td>
                                    <td className='pt-4 rename'>
                                        <div onClick={() => setTitle(elem)} className='d-inline'>
                                            <div onClick={isOpenHandle} className='d-inline'>
                                                <button onClick={() => setBtnId(elem?.id)} className="btn btn-primary ps-3 pe-3">
                                                    <FaRegEdit className='icon-size' />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='d-inline' onClick={deleteMod}>
                                            <button onClick={() => setBtnId(elem?.id)} className="btn btn-danger ms-3 ps-3 pe-3">
                                                <MdDeleteForever className='icon-size' />
                                            </button>
                                        </div>
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



export default Brands;
