import { FilterProducts, setFilterValue, setSortingValue, SortedProducts } from '../../redux/reducer/productReducer';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SortingMenu = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("")

    const handleChange = (e) => {
        const value = e.target.value;
        console.log(value)
        dispatch(setSortingValue(value))
        dispatch(SortedProducts())
    }

    useEffect(()=> {
        dispatch(setFilterValue({name: "text", value: keyword}))
        dispatch(FilterProducts())
    },[keyword])

    return (
        <>
            <div className="row g-4">
                <div className="col-xl-3">
                    <div className="input-group w-100 mx-auto d-flex">
                        <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" value={keyword} onChange={(e) => setKeyword(e.target.value) } />
                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                    </div>
                </div>
                <div className="col-5"></div>
                <div className="col-xl-4">
                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                        <label for="fruits">Sort By:</label>
                        <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform" onChange={handleChange}>
                            <option value="select">Select</option>
                            <option value="lowest">Price lowest to highest</option>
                            <option value="highest">Price highest to lowest</option>
                            <option value="a-z">A to Z</option>
                            <option value="z-a">Z to A</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SortingMenu
