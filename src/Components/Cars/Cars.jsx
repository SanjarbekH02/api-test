import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Laoding from '../../img/SVKl.gif'
import Laod from '../../img/loading-waiting.gif'

const Cars = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("tokenItem")
        navigate("/")
    }

    const [dataItem, setDataItem] = useState()
    const [btnId, setBtnId] = useState()
    const [category, setCategory] = useState()
    const [brandEl, setBrandEl] = useState()
    const [model, setModel] = useState()
    const [location, setLocation] = useState()
    const [city, setCity] = useState()
    const [laoding, setLaoding] = useState(true)
    const [laod, setLaod] = useState(false)

    // console.log(category);


    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
            .then((res) => {
                return res.json()
            })
            .then((item) => {
                setCategory(item?.data)
            })
            .catch((error) => {


            })
    })

    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
            .then((res) => {
                return res.json()
            })
            .then((item) => {
                setBrandEl(item?.data)
            })
            .catch((error) => {


            })
    }, [])

    // console.log(brandEl);    
    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
            .then((res) => {
                return res.json()
            })
            .then((item) => {
                setModel(item?.data)
            })
            .catch((error) => {


            })
    }, [])

    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
            .then((res) => {
                return res.json()
            })
            .then((item) => {
                setLocation(item?.data)
            })
            .catch((error) => {


            })
    }, [])

    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
            .then((res) => {
                return res.json()
            })
            .then((item) => {
                setCity(item?.data)
            })
            .catch((error) => {


            })
    }, [])

    useEffect(() => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
            .then((res) => {
                return res.json()
            })
            .then((item) => {
                setDataItem(item?.data)
                setLaoding(false)
            })
            .catch((error) => {
                toast.error(error.message)
                setLaoding(false)
            })
    }, [])

    const [modal, setModal] = useState(false)
    const modalOpen = () => {
        setModal(true)
    }

    const [categoryId, setCategoryId] = useState()
    const [brandId, setBrandId] = useState()
    const [modelId, setModelId] = useState()
    const [locationId, setLocationId] = useState()
    const [cityId, setCityId] = useState()
    const [color, setColor] = useState()
    const [year, setYear] = useState()
    const [seconds, setSeconds] = useState()
    const [speed, setSpeed] = useState()
    const [people, setPeople] = useState()
    const [motor, setMotor] = useState()
    const [transmission, setTransmission] = useState()
    const [drive, setDrive] = useState()
    const [oil, setOil] = useState()
    const [limit, setLimit] = useState()
    const [deposit, setDeposit] = useState()
    const [premium, setPremium] = useState()
    const [priceA, setPriceA] = useState()
    const [priceU, setPriceU] = useState()
    const [priceUO, setPriceUO] = useState()
    const [priceAO, setpriceAO] = useState()
    const [inclusive, setInclusive] = useState(true)
    const [carImg, setCarImg] = useState()
    const [mainImg, setMainImg] = useState()
    const [coverImg, setcoverImg] = useState()

    // const [picture, setPicture] = useState()
    const formData = new FormData()
    formData.append('category_id', categoryId)
    formData.append('brand_id', brandId)
    formData.append('model_id', modelId)
    formData.append('location_id', locationId)
    formData.append('city_id', cityId)
    formData.append('color', color)
    formData.append('year', year)
    formData.append('seconds', seconds)
    formData.append('max_speed', speed)
    formData.append('max_people', people)
    formData.append('motor', motor)
    formData.append('premium_protection', premium)
    formData.append('transmission', transmission)
    formData.append('drive_side', drive)
    formData.append('petrol', oil)
    formData.append('limitperday', limit)
    formData.append('deposit', deposit)
    formData.append('price_in_aed', priceA)
    formData.append('price_in_usd', priceU)
    formData.append('price_in_aed_sale', priceAO)
    formData.append('price_in_usd_sale', priceUO)
    formData.append('inclusive', inclusive)
    formData.append('images', carImg)
    formData.append('images', mainImg)
    formData.append('cover', coverImg)
    const tokenn = localStorage.getItem("tokenItem")
    // Post Api
    const createCategory = (e) => {
        e?.preventDefault()
        setLaod(true)
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars", {
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
                    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
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


    const deleteFunc = (id) => {
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`, {
            method: "Delete",
            headers: {
                "authorization": `Bearer ${tokenn}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.success) {
                    toast.success(data?.message)
                    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
                        .then((res) => res.json())
                        .then((item) => setDataItem(item?.data))
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
        setLaod(true)
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${btnId}`, {
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
                    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
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
                <h4 className="settings-title">Settings</h4>
                <button onClick={modalOpen} type='click' className="btn btn-primary  add">Add categories</button>
            </div>
            {
                modal &&
                <div className="modall">
                    <form onSubmit={createCategory} className="modal-content">
                        <div onClick={closeModal} className="toggle-block">
                            <div className="toggle"></div>
                            <div className="toggle-line"></div>
                        </div>
                        <label className='form-label w-100'>Category
                            <select onChange={(e) => setCategoryId(e?.target?.value)} className='form-select outline-none w-100 mt-2'>
                                <option disabled selected>Select Category</option>
                                {
                                    category.map((itemEl, i) => (
                                        <option key={i} value={itemEl?.id}>{itemEl?.name_en}</option>
                                    ))
                                }
                            </select>
                        </label>

                        <label className='form-label w-100'>Brand
                            <select onChange={(e) => setBrandId(e?.target?.value)} className='form-select outline-none w-100 mt-2'>
                                <option disabled selected>Select Brand</option>
                                {
                                    brandEl?.map((itemEl, i) => (
                                        <option value={itemEl?.id} key={i} >{itemEl?.title}</option>
                                    ))
                                }
                            </select>
                        </label>

                        <label className='form-label w-100'>Modal
                            <select onChange={(e) => setModelId(e?.target?.value)} className='form-select outline-none w-100 mt-2'>
                                <option disabled selected>Select Model</option>
                                {
                                    model?.map((item, i) => (
                                        <option value={item?.id} key={i}>{item?.name}</option>
                                    ))
                                }
                            </select>
                        </label>

                        <label className='form-label w-100'>Location
                            <select onChange={(e) => setLocationId(e?.target?.value)} className='form-select outline-none w-100 mt-2'>
                                <option disabled selected>Select Location</option>
                                {
                                    location?.map((item, i) => (
                                        <option value={item?.id} key={i}>{item?.name}</option>
                                    ))
                                }
                            </select>
                        </label>

                        <label className='form-label w-100'>City
                            <select onChange={(e) => setCityId(e?.target?.value)} className='form-select outline-none w-100 mt-2'>
                                <option disabled selected>Select City</option>
                                {
                                    city?.map((item, i) => (
                                        <option key={i} value={item?.id}>{item?.name}</option>
                                    ))
                                }
                            </select>
                        </label>

                        <label className="form-label w-100">Color
                            <input onChange={(e) => setColor(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Year
                            <input onChange={(e) => setYear(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Seconds
                            <input onChange={(e) => setSeconds(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Speed
                            <input onChange={(e) => setSpeed(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Max People
                            <input onChange={(e) => setPeople(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Motor
                            <input onChange={(e) => setMotor(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Transmission
                            <input onChange={(e) => setTransmission(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Drive Side
                            <input onChange={(e) => setDrive(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Fuel
                            <input onChange={(e) => setOil(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Limit Per Day
                            <input onChange={(e) => setLimit(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Deposit
                            <input onChange={(e) => setDeposit(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Premium Protection Price
                            <input onChange={(e) => setPremium(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Price in AED
                            <input onChange={(e) => setPriceA(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Price in USD(Otd)
                            <input onChange={(e) => setPriceUO(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Price in AED (Otd)
                            <input onChange={(e) => setpriceAO(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Price in USD
                            <input onChange={(e) => setPriceU(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <div class="form-check form-switch div-switch">Inclusive
                            <input class="form-check-input input-switch" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        </div>
                        <label className="mt-3 form-label">Upload car images
                            <input accept="image/png, image/jpeg" onChange={(e) => setCarImg(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <label className="mt-3 form-label">Upload the main image
                            <input accept="image/png, image/jpeg" onChange={(e) => setMainImg(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <label className="mt-3 form-label">Upload the cover image
                            <input accept="image/png, image/jpeg" onChange={(e) => setcoverImg(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <button type='submit' className="add-btn btn btn-primary m-0 mt-5 w-50 m-auto">Send
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
                    <form onSubmit={editFunc} className="modal-content">
                        <div onClick={closeModal} className="toggle-block">
                            <div className="toggle"></div>
                            <div className="toggle-line"></div>
                        </div>
                        <label className='form-label w-100'>Category
                            <select onChange={(e) => setCategoryId(e?.target?.value)} className='form-select outline-none w-100 mt-2'>
                                <option disabled selected>Select Category</option>
                                {
                                    category.map((itemEl, i) => (
                                        <option key={i} value={itemEl?.id}>{itemEl?.name_en}</option>
                                    ))
                                }
                            </select>
                        </label>

                        <label className='form-label w-100'>Brand
                            <select onChange={(e) => setBrandId(e?.target?.value)} className='form-select outline-none w-100 mt-2'>
                                <option disabled selected>Select Brand</option>
                                {
                                    brandEl?.map((itemEl, i) => (
                                        <option value={itemEl?.id} key={i} >{itemEl?.title}</option>
                                    ))
                                }
                            </select>
                        </label>

                        <label className='form-label w-100'>Modal
                            <select onChange={(e) => setModelId(e?.target?.value)} className='form-select outline-none w-100 mt-2'>
                                <option disabled selected>Select Model</option>
                                {
                                    model?.map((item, i) => (
                                        <option value={item?.id} key={i}>{item?.name}</option>
                                    ))
                                }
                            </select>
                        </label>

                        <label className='form-label w-100'>Location
                            <select onChange={(e) => setLocationId(e?.target?.value)} className='form-select outline-none w-100 mt-2'>
                                <option disabled selected>Select Location</option>
                                {
                                    location?.map((item, i) => (
                                        <option value={item?.id} key={i}>{item?.name}</option>
                                    ))
                                }
                            </select>
                        </label>

                        <label className='form-label w-100'>City
                            <select onChange={(e) => setCityId(e?.target?.value)} className='form-select outline-none w-100 mt-2'>
                                <option disabled selected>Select City</option>
                                {
                                    city?.map((item, i) => (
                                        <option key={i} value={item?.id}>{item?.name}</option>
                                    ))
                                }
                            </select>
                        </label>

                        <label className="form-label w-100">Color
                            <input onChange={(e) => setColor(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Year
                            <input onChange={(e) => setYear(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Seconds
                            <input onChange={(e) => setSeconds(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Speed
                            <input onChange={(e) => setSpeed(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Max People
                            <input onChange={(e) => setPeople(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Motor
                            <input onChange={(e) => setMotor(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Transmission
                            <input onChange={(e) => setTransmission(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Drive Side
                            <input onChange={(e) => setDrive(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Fuel
                            <input onChange={(e) => setOil(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Limit Per Day
                            <input onChange={(e) => setLimit(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Deposit
                            <input onChange={(e) => setDeposit(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Premium Protection Price
                            <input onChange={(e) => setPremium(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Price in AED
                            <input onChange={(e) => setPriceA(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Price in USD(Otd)
                            <input onChange={(e) => setPriceUO(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Price in AED (Otd)
                            <input onChange={(e) => setpriceAO(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <label className="form-label w-100">Price in USD
                            <input onChange={(e) => setPriceU(e?.target?.value)} type="text" className="form-control w-100" />
                        </label>
                        <div class="form-check form-switch div-switch">Inclusive
                            <input class="form-check-input input-switch" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        </div>
                        <label className="mt-3 form-label">Upload car images
                            <input accept="image/png, image/jpeg" onChange={(e) => setCarImg(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <label className="mt-3 form-label">Upload the main image
                            <input accept="image/png, image/jpeg" onChange={(e) => setMainImg(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <label className="mt-3 form-label">Upload the cover image
                            <input accept="image/png, image/jpeg" onChange={(e) => setcoverImg(e?.target?.files[0])} required type="file" className="add-file" />
                        </label>
                        <button type='submit' className="add-btn btn btn-primary m-0 mt-5 w-50 m-auto">Send
                            {
                                laod &&
                                <img src={Laod} alt="Laoding..." className="laod" />
                            }
                        </button>

                    </form>
                </div>
            }

            <div className="admin">
                <table class="table table-striped table-cars ps-5">
                    <thead className='table-item p-5'>
                        <tr className='p-3'>
                            <th scope="col">Brand</th>
                            <th scope="col">Model</th>
                            <th scope="col">Color</th>
                            <th scope="col">City</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataItem?.map((elem, i) => (
                                <tr key={i}>
                                    <th className='pt-4'>{elem?.brand?.title}</th>
                                    <td className='pt-4'>{elem?.model?.name}</td>
                                    <td className='pt-4'>{elem?.color}</td>
                                    <td className='pt-4'>{elem?.city?.name}</td>

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

export default Cars;
