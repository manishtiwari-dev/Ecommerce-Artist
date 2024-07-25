"use client"
import { clearFilters, FilterProducts, setFilterValue } from '../../redux/reducer/productReducer';
// import { setFilterValue } from '@/redux/reducer/productReducer';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Range } from 'react-range';
import { useDispatch, useSelector } from 'react-redux';

const FilterMenu = () => {
    const [priceRange, setPriceRange] = useState([0, 500000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedOrientations, setSelectedOrientations] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const { test } = useSelector((state) => state.Product);


    const dispatch = useDispatch();

    const handleCategoriesCheckbox = (event) => {
        const { name, value, checked } = event.target;
        let updatedCategories = [...selectedCategories];
        if (checked) {
            updatedCategories.push(value);
        } else {
            updatedCategories = updatedCategories.filter((item) => item !== value);
        }
        setSelectedCategories(updatedCategories);
        console.log({
            name,
            selectedCategories: updatedCategories
        });
        dispatch(setFilterValue({ name, value: updatedCategories }))
        dispatch(FilterProducts());
        console.log(test)
    };

    const handleArtistsCheckbox = (event) => {
        const { name, value, checked } = event.target;
        let updatedArtists = [...selectedArtists];
        if (checked) {
            updatedArtists.push(value);
        } else {
            updatedArtists = updatedArtists.filter((item) => item !== value);
        }
        setSelectedArtists(updatedArtists);
        console.log({
            name,
            selectedArtists: updatedArtists
        });
        dispatch(setFilterValue({ name, value: updatedArtists }));
        dispatch(FilterProducts());
    };

    const handleSizesCheckbox = (event) => {
        const { name, value, checked } = event.target;
        let updatedSizes = [...selectedSizes];
        if (checked) {
            updatedSizes.push(value);
        } else {
            updatedSizes = updatedSizes.filter((item) => item !== value);
        }
        setSelectedSizes(updatedSizes);
        console.log({
            name,
            selectedSizes: updatedSizes
        });
        dispatch(setFilterValue({ name, value: updatedSizes }));
        dispatch(FilterProducts());
    };

    const handleOrientationsCheckbox = (event) => {
        const { name, value, checked } = event.target;
        let updatedOrientations = [...selectedOrientations];
        if (checked) {
            updatedOrientations.push(value);
        } else {
            updatedOrientations = updatedOrientations.filter((item) => item !== value);
        }
        setSelectedOrientations(updatedOrientations);
        console.log({
            name,
            selectedOrientations: updatedOrientations
        });
        dispatch(setFilterValue({ name, value: updatedOrientations }));
        dispatch(FilterProducts());
    };

    const handleColorsCheckbox = (event) => {
        const { name, value, checked } = event.target;
        let updatedColors = [...selectedColors];
        if (checked) {
            updatedColors.push(value);
        } else {
            updatedColors = updatedColors.filter((item) => item !== value);
        }
        setSelectedColors(updatedColors);
        console.log({
            name,
            selectedColors: updatedColors
        });
        dispatch(setFilterValue({ name, value: updatedColors }));
        dispatch(FilterProducts());
    };

    useEffect(() => {
        dispatch(setFilterValue({ name: 'priceRange', value: priceRange }))
        dispatch(FilterProducts());
    }, [priceRange])
    return (
        <>
            <div className="col-lg-3">
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <h4>Categories</h4>
                            <ul className="list-unstyled fruite-categories">
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='category-name'>
                                            <input onChange={(event) => handleCategoriesCheckbox(event, setSelectedCategories)} style={{ margin: '5px !important' }} type="checkbox" id="Fruits" name="category" value="Fruits" />
                                            <label for="Fruits"> Fruits</label>
                                        </div>
                                        <span>(3)</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='category-name'>
                                            <input onChange={(event) => handleCategoriesCheckbox(event, setSelectedCategories)} style={{ margin: '5px !important' }} type="checkbox" id="Vegetables" name="category" value="Vegetables" />
                                            <label for="Vegetables"> Vegetables</label>
                                        </div>
                                        <span>(3)</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='category-name'>
                                            <input onChange={(event) => handleCategoriesCheckbox(event, setSelectedCategories)} style={{ margin: '5px !important' }} type="checkbox" id="DryFruits" name="category" value="DryFruits" />
                                            <label for="DryFruits"> Dry Fruits</label>
                                        </div>
                                        <span>(3)</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <h4>Artists</h4>
                            <ul className="list-unstyled fruite-categories">
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleArtistsCheckbox(event, setSelectedArtists)} style={{ margin: '5px !important' }} type="checkbox" id="Artist1" name="artist" value="Artist1" />
                                            <label for="Artist1"> Artist1</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleArtistsCheckbox(event, setSelectedArtists)} style={{ margin: '5px !important' }} type="checkbox" id="Artist2" name="artist" value="Artist2" />
                                            <label for="Artist2"> Artist2</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleArtistsCheckbox(event, setSelectedArtists)} style={{ margin: '5px !important' }} type="checkbox" id="Artist3" name="artist" value="Artist3" />
                                            <label for="Artist3"> Artist3</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleArtistsCheckbox(event, setSelectedArtists)} style={{ margin: '5px !important' }} type="checkbox" id="Artist4" name="artist" value="Artist4" />
                                            <label for="Artist4"> Artist4</label>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <h4>Size</h4>
                            <ul className="list-unstyled fruite-categories">
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleSizesCheckbox(event, setSelectedSizes)} style={{ margin: '5px !important' }} type="checkbox" id="S" name="size" value="S" />
                                            <label for="S"> Small</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='size'>
                                            <input onChange={(event) => handleSizesCheckbox(event, setSelectedSizes)} style={{ margin: '5px !important' }} type="checkbox" id="M" name="size" value="M" />
                                            <label for="M"> Medium </label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleSizesCheckbox(event, setSelectedSizes)} style={{ margin: '5px !important' }} type="checkbox" id="L" name="size" value="L" />
                                            <label for="L"> Large </label>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <h4>Orientation</h4>
                            <ul className="list-unstyled fruite-categories">
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleOrientationsCheckbox(event, setSelectedOrientations)} style={{ margin: '5px !important' }} type="checkbox" id="Square" name="orientation" value="Square" />
                                            <label for="Square"> Square</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleOrientationsCheckbox(event, setSelectedOrientations)} style={{ margin: '5px !important' }} type="checkbox" id="Portrait" name="orientation" value="Portrait" />
                                            <label for="Portrait"> Portrait</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleOrientationsCheckbox(event, setSelectedOrientations)} style={{ margin: '5px !important' }} type="checkbox" id="Landscape" name="orientation" value="Landscape" />
                                            <label for="Landscape"> Landscape</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleOrientationsCheckbox(event, setSelectedOrientations)} style={{ margin: '5px !important' }} type="checkbox" id="Round" name="orientation" value="Round" />
                                            <label for="Round"> Round</label>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <h4>Color</h4>
                            <ul className="list-unstyled fruite-categories">
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleColorsCheckbox(event, setSelectedColors)} style={{ margin: '5px !important' }} type="checkbox" id="Red" name="color" value="Red" />
                                            <label for="Red"> Red</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleColorsCheckbox(event, setSelectedColors)} style={{ margin: '5px !important' }} type="checkbox" id="Green" name="color" value="Green" />
                                            <label for="Green"> Green</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleColorsCheckbox(event, setSelectedColors)} style={{ margin: '5px !important' }} type="checkbox" id="Orange" name="color" value="Orange" />
                                            <label for="Orange"> Orange</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleColorsCheckbox(event, setSelectedColors)} style={{ margin: '5px !important' }} type="checkbox" id="Brown" name="color" value="Brown" />
                                            <label for="Brown"> Brown</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleColorsCheckbox(event, setSelectedColors)} style={{ margin: '5px !important' }} type="checkbox" id="Yellow" name="color" value="Yellow" />
                                            <label for="Yellow"> Yellow</label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-between fruite-name">
                                        <div className='artist-name'>
                                            <input onChange={(event) => handleColorsCheckbox(event, setSelectedColors)} style={{ margin: '5px !important' }} type="checkbox" id="Blue" name="color" value="Blue" />
                                            <label for="Blue"> Blue</label>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <h4 className="mb-2">Price</h4>
                            <Range
                                step={1}
                                min={0}
                                max={500000}
                                values={priceRange}
                                onChange={(newValues) => {
                                    setPriceRange(newValues);
                                }}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '6px',
                                            width: '100%',
                                            backgroundColor: '#ccc',
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '20px',
                                            width: '20px',
                                            backgroundColor: '#007bff',
                                            borderRadius: '50%',
                                        }}
                                    />
                                )}
                            />
                            <output id="amount" name="amount" htmlFor="rangeInput">
                                {priceRange[0]} - {priceRange[1]}
                            </output>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="position-relative">
                            <Image src="/img/banner-fruits.jpg" width={500} height={500} className="img-fluid w-100 rounded" alt="" />
                            <div className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                <h3 className="text-secondary fw-bold">Fresh <br /> Fruits</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 text-center">
                        <div onClick={() => dispatch(clearFilters())} class="btn border border-secondary rounded-pill px-3 text-primary">Clear Filters </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterMenu
