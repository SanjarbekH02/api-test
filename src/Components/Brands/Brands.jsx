import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Brands = () => {
    const [dataItem, setDataItem] = useState()
    const [btnId, setBtnId] = useState()

    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("tokenItem")
        navigate("/")
    }

    const getApi = () => {

    }

    const [values, setValues] = useState({
        id: btnId,
        name_en: '',
        name_ru: ''
    })


    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
            .then((res) => {
                return res.json()
            })
            .then((item) => {
                setDataItem(item?.data)
                setValues({ ...values, name_en: item?.data?.name_en, name_ru: item?.data?.name_ru })
            })
            .catch((error) => {


            })
    }, [dataItem])

    const [modal, setModal] = useState(false)
    const modalOpen = () => {
        setModal(true)
    }

    const [title, setTitle] = useState()
    const [picture, setPicture] = useState()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("images", picture)
    const tokenn = localStorage.getItem("tokenItem")
    // Post Api
    const createCategory = (e) => {
        e?.preventDefault()

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
                    setDataItem(dataItem)
                    setModal(false)
                } else {
                    toast.error(element?.message)
                }
            })

    }
    // Delete Api


    const deleteFunc = (id) => {
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${id}`, {
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
                        <label className="form-label"> Title:
                            <input onChange={(e) => setTitle(e?.target?.value)} required type="text" className="add-input" />
                        </label>
                        <label className="form-label"> Chose file:
                            <input accept="image/png, image/jpeg" onChange={(e) => setPicture(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <button type='submit' className="add-btn btn btn-primary w-100">Dawnlaod</button>
                    </form>
                </div>
            }

            {
                edit &&
                <div className="modall">
                    <form onSubmit={editFunc} className="modall-content">
                        <label className="form-label"> Title:
                            <input value={values.name_en} onChange={(e) => setTitle(e?.target?.value)} required type="text" className="add-input" />
                        </label>
                        <label className="form-label"> Chose file:
                            <input accept="image/png, image/jpeg" onChange={(e) => setPicture(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <button type='submit' className="add-btn btn btn-primary w-100">Edit</button>
                    </form>
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
                                        <div onClick={isOpenHandle} className='d-inline'>
                                            <button onClick={() => setBtnId(elem?.id)} className="btn btn-primary ps-3 pe-3">
                                                <FaRegEdit className='icon-size' />
                                            </button>
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


export default Brands;
