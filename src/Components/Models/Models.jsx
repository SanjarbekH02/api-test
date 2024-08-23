import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Models = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("tokenItem")
        navigate("/")
    }


    const [dataItem, setDataItem] = useState()
    const [btnId, setBtnId] = useState()

    const getApi = () => {

    }

    const [values, setValues] = useState({
        id: btnId,
        name_en: '',
        name_ru: ''
    })


    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
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

    const [nameModel, setNameModel] = useState({
        name: ''
    })
    const [brandName, setBrandName] = useState()
    const formData = new FormData()
    formData.append("name", nameModel?.name)
    formData.append("brand_id", brandName)
    // formData.append("brand_title", nameModel?.brand_title)
    const tokenn = localStorage.getItem("tokenItem")
    // Post Api
    const createCategory = (e) => {
        e?.preventDefault()

        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
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
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
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


    const editFunc = (e) => {
        e.preventDefault()

        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${btnId}`, {
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
    const [brends, setBrands] = useState()

    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
            .then((res) => {
                return res.json()
            })
            .then((item) => {
                setBrands(item?.data)
            })
            .catch((error) => {


            })
    }, [brends])

    return (
        <div className='d-print-flex admin-page'>
            <div className="nav">
                <h4 className="logo">Admin</h4>
                <button onClick={logout} className='logout'>Logout</button>
            </div>
            <div className="settings">
                <h4 className="settings-title">Models</h4>
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
                        <label className="form-label w-100"> Name:
                            <input onChange={(e) => setNameModel({ ...nameModel, name: e?.target?.value })} required type="text" className="form-control w-100 outline-none" />
                        </label>
                        <select onChange={(e) => setBrandName(e?.target?.value)} className="form-select w-100" aria-label="Default select example">
                            <option selected>Select Brand</option>
                            {
                                brends?.map((item, id) => (
                                    // console.log(item)
                                    <option key={id} value={item?.id}>{item?.title}</option>

                                ))
                            }
                        </select>
                        <button type='submit' className="add-btn btn btn-primary w-100">Uplaod</button>
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
                        <label className="form-label w-100 "> Name:
                            <input value={nameModel?.name} onChange={(e) => setNameModel({ ...nameModel, name: e?.target?.value })} required type="text" className="form-control w-100" />
                        </label>
                        <select onChange={(e) => setNameModel({ ...nameModel, brand_id: e?.target?.value })} className="form-select " aria-label="Default select example">
                            <option selected>Select Brand</option>
                            {
                                brends?.map((item, id) => (
                                    <option key={id} value={item?.id}>{item?.title}</option>
                                ))
                            }
                        </select>
                        <button type='submit' className="add-btn btn btn-primary w-100">Update</button>
                    </form>
                </div>
            }

            <div className="admin">
                <table class="table table-striped table-cars ps-5">
                    <thead className='table-item p-5'>
                        <tr className='p-3'>
                            <th scope="col">Name</th>
                            <th scope="col">Brand Title</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataItem?.map((elem, i) => (
                                // console.log(elem)

                                <tr key={i}>
                                    <th className='pt-4'>{elem?.name}</th>
                                    <td className='pt-4'>{elem?.brand_title}</td>
                                    <td className='pt-4 rename'>
                                        <div onClick={() => setNameModel(elem)} className="d-inline">
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

export default Models;
