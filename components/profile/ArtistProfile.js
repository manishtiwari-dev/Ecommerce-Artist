import { act, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import POST from "../../axios/post";
import { ArtistDashboardUrl, ArtistProfileUrl, UpdateArtistProfileUrl, } from "../../config";
import { toast } from "react-toastify";
import Link from "next/link";
import DonutComponent from './components/DonutComponent'
import { Oval } from "react-loader-spinner";
import { useForm } from "react-hook-form";


const ArtistProfile = () => {
	const { user } = useSelector((state) => state.User);
	console.log('user', user);

	const [activeTab, setActiveTab] = useState('tab1');
	const [tab1Loading, setTab1Loading] = useState(true);
	const [tab3Loading, setTab3Loading] = useState(true);
	const [artistData, setArtistData] = useState(null);
	const [artist, setArtist] = useState(null);
	const [seller, setSeller] = useState(null);
	const [countryData, setCountryData] = useState([]);
	const [stateData, setstateData] = useState([]);
	const [cityData, setcityData] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	// console.log("artst profile user state", user);
	// console.log("artistData", artistData);
	console.log("artist", artist);
	console.log("seller", seller);
	console.log("countryData", countryData);

	const getData = async () => {
		if (!user) return;
		setTab1Loading(true);
		const filterData = {
			user_id: user.user_id,
		};

		POST(ArtistDashboardUrl, filterData)
			.then((response) => {
				if (response.status === 200) {
					setArtistData(response.data);
				} else toast.error("Error Fectch Failed Data");
			})
			.catch((error) => {
				console.error("There was an error!", error);
				if (
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					toast.error("Error: " + error.response.data.message); // Display the error message from the response
				}
			})
			.finally(() => {
				setTab1Loading(false);
			});
	};

	const setActiveTabFunc = async (tab) => {
		setActiveTab(tab)
		try {
			if (tab === 'tab3') {
				if (!user) return;
				setTab3Loading(true);
				const filterData = {
					user_id: user.user_id,
				};

				POST(ArtistProfileUrl, filterData)
					.then((response) => {
						if (response.status === 200) {
							setArtist(response.data.user)
							setSeller(response.data.seller)
							setCountryData(response.data.countries);
							setstateData(response.data.states);
							setcityData(response.data.cities);
						} else toast.error("Error Fectch Failed Data");
					})
					.catch((error) => {
						console.error("There was an error!", error);
						if (
							error.response &&
							error.response.data &&
							error.response.data.message
						) {
							toast.error("Error: " + error.response.data.message); // Display the error message from the response
						}
					})
					.finally(() => {
						setTab3Loading(false);
					});
			}
		} catch (error) {
			console.log(error);
		}
	}

	// form
	const { register, handleSubmit, formState: { errors }, } = useForm();
	const [formloadingStatus, SetformloadingStatus] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);

	const onSubmit = async (formData) => {
		// setLoading(true)
		SetformloadingStatus(true);
		const saveFormData = { ...formData, user_id: user.user_id };
		console.log('saveFormData', saveFormData);

		const formDataToSend = new FormData();
		Object.keys(saveFormData).forEach((key) => {
			formDataToSend.append(key, saveFormData[key]);
		});
		if (selectedFile) {
			formDataToSend.append("profile_image", selectedFile);
		}

		try {
			const response = await POST(UpdateArtistProfileUrl, formDataToSend, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			// setLoading(false);
			SetformloadingStatus(false);
			if (response.status === 200) {
				toast.success(response.data.notification);
			} else {
				toast.error("Form submission failed");
			}
		} catch (error) {
			SetformloadingStatus(false);
			// setLoading(false);

			if (
				error.response &&
				error.response.data &&
				error.response.data.notification
			) {
				toast.error("Error: " + error.response.data.notification);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setArtist((prevDetails) => ({ ...prevDetails, [name]: value }));
	};

	const handleChangeSeller = (e) => {
		const { name, value } = e.target;
		setSeller((prevDetails) => ({ ...prevDetails, [name]: value }));
	};

	const handleProfilePicChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
			setPreviewUrl(URL.createObjectURL(file));
		}
	};


	return (
		<div className="main-wrapper" >
			<div className="profile-wrapper artist-profile spaceingtop">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<h3>Hello {artistData?.user?.name}</h3>
						</div>
						<div className="col-md-6">
							<div className="list">
								<ul>
									<li className="Pending">({artistData?.totalPendingOrder || 0}) Pending Approval</li>
									<li className="Order">({artistData?.todayTotalOrder || 0}) Recent Orders</li>
									<li>
										<Link href="/dashboard/add-artwork">
											<button
												type="submit"
												className="btn btn-primary"
												data-bs-toggle="modal"
												data-bs-target="#myModal"
											>
												Add Artwork
											</button>
										</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="tabber-wrapper">
							<div className="tabber">
								<ul className="tabber-list">
									<li>
										<a onClick={() => setActiveTabFunc('tab1')}>Dashboard</a>
									</li>
									<li>
										<a onClick={() => setActiveTabFunc('tab2')}>Artwork</a>
									</li>
									<li>
										<a onClick={() => setActiveTabFunc('tab3')}>Profile Setting</a>
									</li>
								</ul>
							</div>
							<div className="tabber-content-wrapper">
								{activeTab === 'tab1' && (
									<div className="tabber-content" id="tab1">
										<div className="Dashboard-wrap">
											{tab1Loading ? (
												<Oval
													visible={true}
													height="80"
													width="80"
													color="#4fa94d"
													ariaLabel="oval-loading"
													wrapperStyle={{}}
													wrapperClass=""
												/>
											) : (
												<div className="row">
													<div className="col-md-9">
														<div className="row">
															<div className="col-md-4 mt-4">
																<div className="box">
																	<div className="row">
																		<div className="col-4">
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width={66}
																				height={67}
																				viewBox="0 0 66 67"
																				fill="none"
																			>
																				<rect
																					y="0.704102"
																					width={66}
																					height={66}
																					rx={3}
																					fill="#4432B4"
																					fillOpacity="0.15"
																				/>
																				<path
																					d="M43.6866 38.4426C44.7488 38.4426 45.7676 38.0207 46.5188 37.2695C47.2699 36.5184 47.6919 35.4996 47.6919 34.4374C47.6919 33.3751 47.2699 32.3563 46.5188 31.6052C45.7676 30.854 44.7488 30.4321 43.6866 30.4321C42.6243 30.4321 41.6055 30.854 40.8544 31.6052C40.1033 32.3563 39.6813 33.3751 39.6813 34.4374C39.6813 35.4996 40.1033 36.5184 40.8544 37.2695C41.6055 38.0207 42.6243 38.4426 43.6866 38.4426ZM43.6866 37.1075C42.9784 37.1075 42.2992 36.8262 41.7985 36.3255C41.2977 35.8247 41.0164 35.1455 41.0164 34.4374C41.0164 33.7292 41.2977 33.05 41.7985 32.5492C42.2992 32.0485 42.9784 31.7672 43.6866 31.7672C44.3948 31.7672 45.0739 32.0485 45.5747 32.5492C46.0755 33.05 46.3568 33.7292 46.3568 34.4374C46.3568 35.1455 46.0755 35.8247 45.5747 36.3255C45.0739 36.8262 44.3948 37.1075 43.6866 37.1075ZM33.6733 24.7579C33.6733 25.5546 33.3568 26.3187 32.7935 26.882C32.2301 27.4454 31.4661 27.7619 30.6694 27.7619C29.8727 27.7619 29.1086 27.4454 28.5452 26.882C27.9819 26.3187 27.6654 25.5546 27.6654 24.7579C27.6654 23.9612 27.9819 23.1971 28.5452 22.6338C29.1086 22.0704 29.8727 21.7539 30.6694 21.7539C31.4661 21.7539 32.2301 22.0704 32.7935 22.6338C33.3568 23.1971 33.6733 23.9612 33.6733 24.7579ZM25.6627 30.0983C25.6627 30.4928 25.585 30.8834 25.4341 31.2478C25.2831 31.6123 25.0618 31.9435 24.7829 32.2224C24.5039 32.5014 24.1728 32.7226 23.8083 32.8736C23.4439 33.0246 23.0532 33.1023 22.6588 33.1023C22.2643 33.1023 21.8736 33.0246 21.5092 32.8736C21.1447 32.7226 20.8136 32.5014 20.5346 32.2224C20.2557 31.9435 20.0344 31.6123 19.8834 31.2478C19.7325 30.8834 19.6548 30.4928 19.6548 30.0983C19.6548 29.3016 19.9713 28.5375 20.5346 27.9741C21.098 27.4108 21.8621 27.0943 22.6588 27.0943C23.4555 27.0943 24.2195 27.4108 24.7829 27.9741C25.3462 28.5375 25.6627 29.3016 25.6627 30.0983ZM22.6588 42.4479C23.0532 42.4479 23.4439 42.3702 23.8083 42.2193C24.1728 42.0683 24.5039 41.847 24.7829 41.5681C25.0618 41.2892 25.2831 40.958 25.4341 40.5935C25.585 40.2291 25.6627 39.8385 25.6627 39.444C25.6627 39.0495 25.585 38.6589 25.4341 38.2944C25.2831 37.9299 25.0618 37.5988 24.7829 37.3198C24.5039 37.0409 24.1728 36.8196 23.8083 36.6687C23.4439 36.5177 23.0532 36.44 22.6588 36.44C21.8621 36.44 21.098 36.7565 20.5346 37.3198C19.9713 37.8832 19.6548 38.6473 19.6548 39.444C19.6548 40.2407 19.9713 41.0047 20.5346 41.5681C21.098 42.1315 21.8621 42.4479 22.6588 42.4479ZM33.0058 45.4519C33.0058 46.2486 32.6893 47.0127 32.1259 47.5761C31.5626 48.1394 30.7985 48.4559 30.0018 48.4559C29.2051 48.4559 28.441 48.1394 27.8777 47.5761C27.3143 47.0127 26.9978 46.2486 26.9978 45.4519C26.9978 44.6552 27.3143 43.8911 27.8777 43.3278C28.441 42.7644 29.2051 42.4479 30.0018 42.4479C30.7985 42.4479 31.5626 42.7644 32.1259 43.3278C32.6893 43.8911 33.0058 44.6552 33.0058 45.4519Z"
																					fill="#4432B4"
																				/>
																				<path
																					d="M33.2724 54.4639C29.5453 54.1917 25.9462 52.9881 22.8053 50.9633C18.2147 48.274 14.8786 43.8734 13.529 38.7271C12.9473 36.4866 12.8186 34.1525 13.1503 31.8616C13.482 29.5706 14.2676 27.369 15.4609 25.3854C20.4768 17.1078 31.7211 14.6606 41.6128 19.7033C47.5126 22.7139 51.9251 27.9689 52.8517 33.0943C53.1596 34.5085 53.1249 35.9759 52.7505 37.374C52.3762 38.7721 51.6729 40.0605 50.6995 41.1316C47.8184 44.2771 44.1001 44.233 41.3979 44.2023H41.3885C39.5928 44.1703 38.4713 44.2023 38.203 44.7364C38.2964 45.1476 38.4593 45.5428 38.6836 45.9019C39.3579 46.8502 39.6965 47.9963 39.646 49.1587C39.5955 50.3212 39.1586 51.4336 38.4046 52.3197C37.7715 53.0476 36.9791 53.6196 36.089 53.9915C35.199 54.3634 34.2351 54.525 33.2724 54.4639ZM31.0415 19.7513C28.4066 19.6618 25.7939 20.2613 23.4616 21.4906C21.1292 22.7198 19.158 24.5363 17.7426 26.7606C16.7326 28.4432 16.0686 30.3104 15.7894 32.2529C15.5101 34.1953 15.6213 36.174 16.1164 38.0729C17.2904 42.531 20.186 46.3409 24.1671 48.6656C28.641 51.3197 34.3592 53.0714 36.3312 50.6322C37.3819 49.3398 37.0481 48.5427 36.3151 47.1315C35.9371 46.6204 35.6935 46.0224 35.6067 45.3926C35.5199 44.7627 35.5927 44.1211 35.8185 43.5268C36.8612 41.4707 39.1803 41.4934 41.4259 41.5241C43.8758 41.5575 46.6555 41.5909 48.7316 39.3225C49.4176 38.5486 49.9107 37.6233 50.1706 36.6222C50.4304 35.6212 50.4497 34.5729 50.2269 33.5629C49.4552 29.2906 45.506 24.6805 40.4032 22.0811C37.5103 20.5797 34.3034 19.7836 31.0442 19.758L31.0415 19.7513Z"
																					fill="#4432B4"
																				/>
																			</svg>
																		</div>
																		<div className="col-8">
																			<div className="content">
																				<h6>No. of artworks</h6>
																				<span>{artistData?.noOfArtWork}</span>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="col-md-4 mt-4">
																<div className="box">
																	<div className="row">
																		<div className="col-4">
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width={67}
																				height={67}
																				viewBox="0 0 67 67"
																				fill="none"
																			>
																				<rect
																					x="0.5"
																					y="0.704102"
																					width={66}
																					height={66}
																					rx={3}
																					fill="#46A01B"
																					fillOpacity="0.15"
																				/>
																				<path
																					d="M49.6951 32.6928L34.4953 17.493C33.8584 16.8561 32.9805 16.4946 32.0682 16.4946H19.726C17.8324 16.4946 16.2832 18.0439 16.2832 19.9374V32.2796C16.2832 33.192 16.6447 34.0699 17.2988 34.7068L32.4985 49.9065C33.8412 51.2492 36.0274 51.2492 37.37 49.9065L49.7123 37.5642C51.055 36.2216 51.055 34.0526 49.6951 32.6928ZM34.9257 47.4794L19.726 32.2796V19.9374H32.0682L47.2679 35.1371L34.9257 47.4794Z"
																					fill="#46A01B"
																				/>
																				<path
																					d="M24.0293 26.8228C25.4554 26.8228 26.6114 25.6668 26.6114 24.2408C26.6114 22.8147 25.4554 21.6587 24.0293 21.6587C22.6033 21.6587 21.4473 22.8147 21.4473 24.2408C21.4473 25.6668 22.6033 26.8228 24.0293 26.8228Z"
																					fill="#46A01B"
																				/>
																			</svg>
																		</div>
																		<div className="col-8">
																			<div className="content">
																				<h6>Art Sold</h6>
																				<span>{artistData?.totalArtSale}</span>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="col-md-4 mt-4">
																<div className="box">
																	<div className="row">
																		<div className="col-4">
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width={66}
																				height={67}
																				viewBox="0 0 66 67"
																				fill="none"
																			>
																				<rect
																					y="0.704102"
																					width={66}
																					height={66}
																					rx={3}
																					fill="#CF7D30"
																					fillOpacity="0.15"
																				/>
																				<path
																					d="M47.6778 41.6396C46.7782 36.2701 44.2073 31.3214 40.3313 27.4982C39.4828 26.6726 39.0593 26.2606 38.1221 25.8799C37.185 25.4974 36.3791 25.4974 34.769 25.4974H31.2303C29.6202 25.4974 28.8144 25.4974 27.8772 25.8799C26.9416 26.2606 26.5149 26.6726 25.668 27.4982C21.792 31.3214 19.2211 36.2701 18.3216 41.6396C17.5222 46.4617 21.9702 50.1169 26.94 50.1169H39.0593C44.0308 50.1169 48.4804 46.4617 47.6761 41.6396"
																					stroke="#CF7D30"
																					strokeWidth="1.5"
																					strokeLinecap="round"
																					strokeLinejoin="round"
																				/>
																				<path
																					d="M35.6701 35.2123C35.3156 33.9009 33.5086 32.7192 31.3404 33.6039C29.1722 34.4885 28.8292 37.3329 32.1069 37.6365C33.5906 37.7728 34.5557 37.4773 35.4404 38.3127C36.3267 39.1465 36.4908 41.469 34.2274 42.0943C31.9674 42.7196 29.727 41.743 29.4841 40.3545M32.7404 32.0496V33.2986M32.7404 42.2863V43.5403M25.2151 21.3007C24.8753 20.8083 24.3846 20.1387 25.3989 19.9877C26.4411 19.8301 27.5227 20.5424 28.583 20.5293C29.5399 20.5145 30.0274 20.0894 30.5526 19.4821C31.1041 18.8437 31.9575 17.291 32.9997 17.291C34.042 17.291 34.8954 18.8437 35.4469 19.4821C35.9721 20.0894 36.4596 20.5162 37.4165 20.5277C38.4768 20.5441 39.5584 19.8301 40.6006 19.986C41.6149 20.1387 41.1242 20.8067 40.7844 21.2991L39.2547 23.5296C38.5982 24.4815 38.2716 24.9575 37.5855 25.2283C36.8995 25.4991 36.0148 25.4975 34.2439 25.4975H31.7556C29.983 25.4975 29.0984 25.4975 28.414 25.2283C27.7295 24.9592 27.4013 24.4799 26.7448 23.5279L25.2151 21.3007Z"
																					stroke="#CF7D30"
																					strokeWidth="1.5"
																					strokeLinecap="round"
																					strokeLinejoin="round"
																				/>
																			</svg>
																		</div>
																		<div className="col-8">
																			<div className="content">
																				<h6>Total Earning</h6>
																				<span>₹{artistData?.totalEarning}</span>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="row ">
															<div className="col-md-8 mt-4">
																<div className="box-artworkStatus">
																	<div className="row align-items-center mb-4">
																		<div className="col-md-8">
																			<h6>Artwork Stats</h6>
																		</div>
																		<div className="col-md-4">
																			<select>
																				<option value="">This Month</option>
																				<option value={1}>Month</option>
																				<option value={2}>Month</option>
																				<option value={3}>Month</option>
																			</select>
																		</div>
																	</div>
																	<div className="col-md-12">
																		<div className="row">
																			<div className="col-md-7">
																				{/* <div className="chat-image">
																							<div className="content">
																								<h6>Total Artwork:</h6>
																								<strong>24</strong>
																							</div>
																						</div> */}
																				{/* <Doughnut style={{ height: "174px !important" }} data={chartData1} options={options1} /> */}
																				<DonutComponent />
																			</div>
																			<div className="col-md-5">
																				<div className="Dashboard-list">
																					<ul>
																						<li>
																							<span>
																								<h6>Artwork Approved</h6>
																								<strong>{artistData?.totalApprovedOrderDetails?.length}</strong>
																							</span>
																						</li>
																						<li>
																							<span>
																								<h6>Artwork Approval Pending</h6>
																								<strong>{artistData?.totalPendingOrder || 0}</strong>
																							</span>
																						</li>
																						<li>
																							<span>
																								<h6>Artwork Disapproved</h6>
																								<strong>{artistData?.totalDeclinedOrder || 0}</strong>
																							</span>
																						</li>
																					</ul>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="col-md-4 mt-4">
																<div className="order-process">
																	<h6>Orders in process</h6>
																	<div className="order-list">
																		<div className="orderlist-inner">
																			<div className="row align-items-center">
																				<div className="col-9">
																					<h5>Customer</h5>
																				</div>
																				<div className="col-3">
																					<span>Art</span>
																				</div>
																			</div>
																		</div>
																		{artistData?.totalPendingOrderDetails?.length !== 0 ? (
																			<p>No Records...</p>
																		) : artistData?.totalPendingOrderDetails?.map(order => (
																			<div className="orderlist-inner">
																				<div className="row align-items-center">
																					<div className="col-9">
																						<h6>Customer Name</h6>
																					</div>
																					<div className="col-3">
																						<div className="image">
																							<img src="img/arist-listing1.png" />
																						</div>
																					</div>
																				</div>
																			</div>
																		))}
																		{/* <div className="orderlist-inner">
																			<div className="row align-items-center">
																				<div className="col-9">
																					<h6>Customer Name</h6>
																				</div>
																				<div className="col-3">
																					<div className="image">
																						<img src="img/arist-listing1.png" />
																					</div>
																				</div>
																			</div>
																		</div>
																		<div className="orderlist-inner">
																			<div className="row align-items-center">
																				<div className="col-9">
																					<h6>Customer Name</h6>
																				</div>
																				<div className="col-3">
																					<div className="image">
																						<img src="img/arist-listing1.png" />
																					</div>
																				</div>
																			</div>
																		</div>
																		<div className="orderlist-inner">
																			<div className="row align-items-center">
																				<div className="col-9">
																					<h6>Customer Name</h6>
																				</div>
																				<div className="col-3">
																					<div className="image">
																						<img src="img/arist-listing1.png" />
																					</div>
																				</div>
																			</div>
																		</div>
																		<div className="orderlist-inner">
																			<div className="row align-items-center">
																				<div className="col-9">
																					<h6>Customer Name</h6>
																				</div>
																				<div className="col-3">
																					<div className="image">
																						<img src="img/arist-listing1.png" />
																					</div>
																				</div>
																			</div>
																		</div> */}
																		<div className="row">
																			<div className="btn-group">
																				{artistData?.totalPendingOrderDetails?.length !== 0 && (
																					<button type="button" className="btn btn-link vieworderBtn">
																						View All Orders
																					</button>
																				)}
																				<Link href='/dashboard/add-artwork' >
																					<button
																						type="button"
																						className="btn btn-link addarkworkBtn"
																					>
																						Add Artwork
																					</button>
																				</Link>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="row mt-4 mb-5 mx-0">
															<div className="tabel-wrapper orders-tabel">
																<h6>Latest Orders Inquirys</h6>
																<table className="table table-striped">
																	<thead className="thead-wrap">
																		<tr>
																			<th>Customer</th>
																			<th>Art Title</th>
																			<th>Art</th>
																			<th>Price</th>
																			<th />
																		</tr>
																	</thead>
																	<tbody>
																		{artistData?.todayOrders?.length === 0 ? (
																			<p>No Records...</p>
																		) : artistData?.todayOrders?.map(order => (
																			<tr>
																				<td>Customer Name</td>
																				<td>Title of Artwork Here</td>
																				<td>
																					<img src="img/AJMoujan.png" />
																				</td>
																				<td>Rs. 49,000/-</td>
																				<td>View Order</td>
																			</tr>
																		))}
																		{/* <tr>
																			<td>Customer Name</td>
																			<td>Title of Artwork Here</td>
																			<td>
																				<img src="img/AJMoujan.png" />
																			</td>
																			<td>Rs. 49,000/-</td>
																			<td>View Order</td>
																		</tr>
																		<tr>
																			<td>Customer Name</td>
																			<td>Title of Artwork Here</td>
																			<td>
																				<img src="img/AJMoujan.png" />
																			</td>
																			<td>Rs. 49,000/-</td>
																			<td>View Order</td>
																		</tr>
																		<tr>
																			<td>Customer Name</td>
																			<td>Title of Artwork Here</td>
																			<td>
																				<img src="img/AJMoujan.png" />
																			</td>
																			<td>Rs. 49,000/-</td>
																			<td>View Order</td>
																		</tr> */}
																	</tbody>
																</table>
															</div>
														</div>
													</div>
													<div className="col-md-3">
														<div className="order-process artworkList mb-4">
															<div className="order-list">
																<div className="orderlist-inner">
																	<div className="row align-items-center">
																		<div className="col-9">
																			<h5>Approved Artworks</h5>
																		</div>
																		<div className="col-3">
																			<span className="num">({artistData?.totalApprovedOrderDetails?.length})</span>
																		</div>
																	</div>
																</div>
																{artistData?.totalApprovedOrderDetails?.length === 0 ? (
																	<p>No Records...</p>
																) : artistData?.totalApprovedOrderDetails?.map(order => (
																	<div className="orderlist-inner">
																		<div className="row align-items-center">
																			<div className="col-9">
																				<h6>Title of Artwork Here</h6>
																				<span>Rs. 49,000/-</span>
																			</div>
																			<div className="col-3">
																				<div className="image">
																					<img src="img/arist-listing1.png" />
																				</div>
																			</div>
																		</div>
																	</div>
																))}
																{/* <div className="orderlist-inner">
																	<div className="row align-items-center">
																		<div className="col-9">
																			<h6>Title of Artwork Here</h6>
																			<span>Rs. 49,000/-</span>
																		</div>
																		<div className="col-3">
																			<div className="image">
																				<img src="img/arist-listing1.png" />
																			</div>
																		</div>
																	</div>
																</div>
																<div className="orderlist-inner">
																	<div className="row align-items-center">
																		<div className="col-9">
																			<h6>Title of Artwork Here</h6>
																			<span>Rs. 49,000/-</span>
																		</div>
																		<div className="col-3">
																			<div className="image">
																				<img src="img/arist-listing1.png" />
																			</div>
																		</div>
																	</div>
																</div>
																<div className="orderlist-inner">
																	<div className="row align-items-center">
																		<div className="col-9">
																			<h6>Title of Artwork Here</h6>
																			<span>Rs. 49,000/-</span>
																		</div>
																		<div className="col-3">
																			<div className="image">
																				<img src="img/arist-listing1.png" />
																			</div>
																		</div>
																	</div>
																</div>
																<div className="orderlist-inner">
																	<div className="row align-items-center">
																		<div className="col-9">
																			<h6>Title of Artwork Here</h6>
																			<span>Rs. 49,000/-</span>
																		</div>
																		<div className="col-3">
																			<div className="image">
																				<img src="img/arist-listing1.png" />
																			</div>
																		</div>
																	</div>
																</div> */}
															</div>
														</div>
														<div className="order-process artworkList mb-4">
															<div className="order-list">
																<div className="orderlist-inner">
																	<div className="row align-items-center">
																		<div className="col-9">
																			<h5>Pending Artworks</h5>
																		</div>
																		<div className="col-3">
																			<span className="num">({artistData?.totalPendingOrder})</span>
																		</div>
																	</div>
																</div>
																{artistData?.totalPendingOrderDetails?.length === 0 ? (
																	<p>No Records...</p>
																) : artistData?.totalPendingOrderDetails?.map(order => (
																	<div className="orderlist-inner">
																		<div className="row align-items-center">
																			<div className="col-9">
																				<h6>Title of Artwork Here</h6>
																				<span>Rs. 49,000/-</span>
																			</div>
																			<div className="col-3">
																				<div className="image">
																					<img src="img/arist-listing1.png" />
																				</div>
																			</div>
																		</div>
																	</div>
																))}
																{/* <div className="orderlist-inner">
																	<div className="row align-items-center">
																		<div className="col-9">
																			<h6>Title of Artwork Here</h6>
																			<span>Rs. 49,000/-</span>
																		</div>
																		<div className="col-3">
																			<div className="image">
																				<img src="img/arist-listing1.png" />
																			</div>
																		</div>
																	</div>
																</div>
																<div className="orderlist-inner">
																	<div className="row align-items-center">
																		<div className="col-9">
																			<h6>Title of Artwork Here</h6>
																			<span>Rs. 49,000/-</span>
																		</div>
																		<div className="col-3">
																			<div className="image">
																				<img src="img/arist-listing1.png" />
																			</div>
																		</div>
																	</div>
																</div>
																<div className="orderlist-inner">
																	<div className="row align-items-center">
																		<div className="col-9">
																			<h6>Title of Artwork Here</h6>
																			<span>Rs. 49,000/-</span>
																		</div>
																		<div className="col-3">
																			<div className="image">
																				<img src="img/arist-listing1.png" />
																			</div>
																		</div>
																	</div>
																</div> */}
															</div>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								)}

								{activeTab === 'tab2' && (
									<div className="tabber-content" id="tab2">
										<div className="tabel-wrapper">
											<table className="table table-striped">
												<thead className="thead-wrap">
													<tr>
														<th>Title</th>
														<th>Art</th>
														<th>Size</th>
														<th>Orientation</th>
														<th>Status</th>
														<th>Price</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody>
													{artistData?.totalOrders?.length === 0 ? (
														<p>No Records...</p>
													) : artistData.totalOrders.map(order => (
														<tr>
															<td>Title of Artwork Here</td>
															<td>
																<img src="img/AJMoujan.png" />
															</td>
															<td>310 X 310</td>
															<td>Portrait</td>
															<td>Approved</td>
															<td>Rs. 49,000/-</td>
															<td>
																<div className="btn-group">
																	<button type="button" className="btn btn-link editBtn">
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width={30}
																			height={30}
																			viewBox="0 0 30 30"
																			fill="none"
																		>
																			<rect
																				x="0.395752"
																				y="0.729126"
																				width={29}
																				height={29}
																				rx={1}
																				fill="#1D9BF0"
																				fillOpacity="0.2"
																			/>
																			<path
																				d="M18.9032 9.4096L20.7156 11.222M20.0683 7.81298L15.1655 12.7158C14.9121 12.9688 14.7394 13.2911 14.6689 13.6421L14.2161 15.9091L16.483 15.4554C16.834 15.3852 17.1559 15.2131 17.4093 14.9597L22.3122 10.0568C22.4595 9.90948 22.5764 9.73457 22.6561 9.54207C22.7358 9.34957 22.7769 9.14325 22.7769 8.93489C22.7769 8.72654 22.7358 8.52022 22.6561 8.32772C22.5764 8.13522 22.4595 7.96031 22.3122 7.81298C22.1648 7.66565 21.9899 7.54878 21.7974 7.46904C21.6049 7.38931 21.3986 7.34827 21.1903 7.34827C20.9819 7.34827 20.7756 7.38931 20.5831 7.46904C20.3906 7.54878 20.2157 7.66565 20.0683 7.81298Z"
																				stroke="#1D9BF0"
																				strokeLinecap="round"
																				strokeLinejoin="round"
																			/>
																			<path
																				d="M21.0648 17.6213V20.1896C21.0648 20.6437 20.8845 21.0792 20.5634 21.4003C20.2423 21.7214 19.8068 21.9018 19.3526 21.9018H9.93558C9.48148 21.9018 9.04598 21.7214 8.72488 21.4003C8.40378 21.0792 8.22339 20.6437 8.22339 20.1896V10.7725C8.22339 10.3184 8.40378 9.88289 8.72488 9.56179C9.04598 9.24069 9.48148 9.0603 9.93558 9.0603H12.5039"
																				stroke="#1D9BF0"
																				strokeLinecap="round"
																				strokeLinejoin="round"
																			/>
																		</svg>
																	</button>
																	<button
																		type="button"
																		className="btn btn-link deleteBtn"
																	>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width={30}
																			height={30}
																			viewBox="0 0 30 30"
																			fill="none"
																		>
																			<rect
																				x="0.195557"
																				y="0.729126"
																				width={29}
																				height={29}
																				rx={1}
																				fill="#DE2020"
																				fillOpacity="0.15"
																			/>
																			<path
																				d="M19.6088 11.5981C19.6954 11.5145 19.7644 11.4145 19.812 11.304C19.8595 11.1935 19.8846 11.0746 19.8857 10.9542C19.8868 10.8339 19.8639 10.7145 19.8184 10.6031C19.7729 10.4918 19.7056 10.3905 19.6206 10.3054C19.5355 10.2203 19.4344 10.1529 19.323 10.1073C19.2117 10.0617 19.0924 10.0387 18.972 10.0397C18.8517 10.0407 18.7328 10.0656 18.6222 10.1131C18.5116 10.1605 18.4116 10.2295 18.3279 10.316L14.6957 13.9471L11.0646 10.316C10.9817 10.227 10.8816 10.1556 10.7705 10.106C10.6593 10.0565 10.5393 10.0299 10.4176 10.0277C10.2959 10.0256 10.175 10.048 10.0622 10.0935C9.94936 10.1391 9.84685 10.207 9.7608 10.293C9.67474 10.3791 9.6069 10.4816 9.56132 10.5944C9.51574 10.7073 9.49336 10.8281 9.4955 10.9498C9.49765 11.0715 9.52428 11.1915 9.57382 11.3027C9.62335 11.4138 9.69476 11.5139 9.7838 11.5969L13.4124 15.2291L9.78138 18.8602C9.6213 19.0319 9.53416 19.2592 9.5383 19.494C9.54244 19.7287 9.63755 19.9527 9.80359 20.1188C9.96963 20.2848 10.1936 20.3799 10.4284 20.3841C10.6632 20.3882 10.8904 20.3011 11.0622 20.141L14.6957 16.5099L18.3267 20.1422C18.4985 20.3023 18.7257 20.3894 18.9605 20.3853C19.1953 20.3811 19.4193 20.286 19.5853 20.12C19.7514 19.9539 19.8465 19.7299 19.8506 19.4952C19.8548 19.2604 19.7676 19.0332 19.6076 18.8614L15.9789 15.2291L19.6088 11.5981Z"
																				fill="#DE2020"
																			/>
																		</svg>
																	</button>
																</div>
															</td>
														</tr>
													))}
												</tbody>
												{/* <tbody>
													<tr>
														<td>Title of Artwork Here</td>
														<td>
															<img src="img/AJMoujan.png" />
														</td>
														<td>310 X 310</td>
														<td>Portrait</td>
														<td>Approved</td>
														<td>Rs. 49,000/-</td>
														<td>
															<div className="btn-group">
																<button type="button" className="btn btn-link editBtn">
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width={30}
																		height={30}
																		viewBox="0 0 30 30"
																		fill="none"
																	>
																		<rect
																			x="0.395752"
																			y="0.729126"
																			width={29}
																			height={29}
																			rx={1}
																			fill="#1D9BF0"
																			fillOpacity="0.2"
																		/>
																		<path
																			d="M18.9032 9.4096L20.7156 11.222M20.0683 7.81298L15.1655 12.7158C14.9121 12.9688 14.7394 13.2911 14.6689 13.6421L14.2161 15.9091L16.483 15.4554C16.834 15.3852 17.1559 15.2131 17.4093 14.9597L22.3122 10.0568C22.4595 9.90948 22.5764 9.73457 22.6561 9.54207C22.7358 9.34957 22.7769 9.14325 22.7769 8.93489C22.7769 8.72654 22.7358 8.52022 22.6561 8.32772C22.5764 8.13522 22.4595 7.96031 22.3122 7.81298C22.1648 7.66565 21.9899 7.54878 21.7974 7.46904C21.6049 7.38931 21.3986 7.34827 21.1903 7.34827C20.9819 7.34827 20.7756 7.38931 20.5831 7.46904C20.3906 7.54878 20.2157 7.66565 20.0683 7.81298Z"
																			stroke="#1D9BF0"
																			strokeLinecap="round"
																			strokeLinejoin="round"
																		/>
																		<path
																			d="M21.0648 17.6213V20.1896C21.0648 20.6437 20.8845 21.0792 20.5634 21.4003C20.2423 21.7214 19.8068 21.9018 19.3526 21.9018H9.93558C9.48148 21.9018 9.04598 21.7214 8.72488 21.4003C8.40378 21.0792 8.22339 20.6437 8.22339 20.1896V10.7725C8.22339 10.3184 8.40378 9.88289 8.72488 9.56179C9.04598 9.24069 9.48148 9.0603 9.93558 9.0603H12.5039"
																			stroke="#1D9BF0"
																			strokeLinecap="round"
																			strokeLinejoin="round"
																		/>
																	</svg>
																</button>
																<button
																	type="button"
																	className="btn btn-link deleteBtn"
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width={30}
																		height={30}
																		viewBox="0 0 30 30"
																		fill="none"
																	>
																		<rect
																			x="0.195557"
																			y="0.729126"
																			width={29}
																			height={29}
																			rx={1}
																			fill="#DE2020"
																			fillOpacity="0.15"
																		/>
																		<path
																			d="M19.6088 11.5981C19.6954 11.5145 19.7644 11.4145 19.812 11.304C19.8595 11.1935 19.8846 11.0746 19.8857 10.9542C19.8868 10.8339 19.8639 10.7145 19.8184 10.6031C19.7729 10.4918 19.7056 10.3905 19.6206 10.3054C19.5355 10.2203 19.4344 10.1529 19.323 10.1073C19.2117 10.0617 19.0924 10.0387 18.972 10.0397C18.8517 10.0407 18.7328 10.0656 18.6222 10.1131C18.5116 10.1605 18.4116 10.2295 18.3279 10.316L14.6957 13.9471L11.0646 10.316C10.9817 10.227 10.8816 10.1556 10.7705 10.106C10.6593 10.0565 10.5393 10.0299 10.4176 10.0277C10.2959 10.0256 10.175 10.048 10.0622 10.0935C9.94936 10.1391 9.84685 10.207 9.7608 10.293C9.67474 10.3791 9.6069 10.4816 9.56132 10.5944C9.51574 10.7073 9.49336 10.8281 9.4955 10.9498C9.49765 11.0715 9.52428 11.1915 9.57382 11.3027C9.62335 11.4138 9.69476 11.5139 9.7838 11.5969L13.4124 15.2291L9.78138 18.8602C9.6213 19.0319 9.53416 19.2592 9.5383 19.494C9.54244 19.7287 9.63755 19.9527 9.80359 20.1188C9.96963 20.2848 10.1936 20.3799 10.4284 20.3841C10.6632 20.3882 10.8904 20.3011 11.0622 20.141L14.6957 16.5099L18.3267 20.1422C18.4985 20.3023 18.7257 20.3894 18.9605 20.3853C19.1953 20.3811 19.4193 20.286 19.5853 20.12C19.7514 19.9539 19.8465 19.7299 19.8506 19.4952C19.8548 19.2604 19.7676 19.0332 19.6076 18.8614L15.9789 15.2291L19.6088 11.5981Z"
																			fill="#DE2020"
																		/>
																	</svg>
																</button>
															</div>
														</td>
													</tr>
												</tbody> */}
											</table>
										</div>
									</div>
								)}

								{activeTab === 'tab3' && (
									<div className="tabber-content" id="tab3">
										{tab3Loading ? (
											<Oval
												visible={true}
												height="80"
												width="80"
												color="#4fa94d"
												ariaLabel="oval-loading"
												wrapperStyle={{}}
												wrapperClass=""
											/>
										) : (
											<form onSubmit={handleSubmit(onSubmit)}>
												<div className="row">
													<div className="col-md-4">
														<div className="profile-wrap">
															<img src="img/user.png" alt="" />
															<h5>User Name</h5>
															<span>Change Profile Picture</span>
														</div>
													</div>
													<div className="col-md-8">
														<div className="form-wrap">
															<div className="row ">
																<div className="col-md-12">
																	<div className="row">
																		<div className="col-md-6 mb-4">
																			<label className="form-label">First Name</label>
																			<input
																				type="text"
																				className="form-control"
																				placeholder="First Name"
																				name='name'
																				value={artist?.name}
																				{...register("name")}
																				onChange={handleChange}
																			/>
																		</div>
																		<div className="col-md-6 mb-4">
																			<label className="form-label">Last Name</label>
																			<input
																				type="text"
																				className="form-control"
																				placeholder="Last Name"
																				name="lastname"
																				{...register("lastname")}
																				value={artist?.lastname}
																				onChange={handleChange}
																			/>
																		</div>
																	</div>
																</div>
															</div>
															<div className="row">
																<div className="col-md-12">
																	<div className="row">
																		<div className="col-md-6 mb-4">
																			<label className="form-label">Email Address</label>
																			<input
																				type="email"
																				className="form-control"
																				placeholder="emailaddress@gmail.com"
																				name="email"
																				{...register("email")}
																				value={artist?.email}
																			// onChange={handleChange}
																			/>
																		</div>
																		<div className="col-md-6 mb-4">
																			<label className="form-label">Phone Number</label>
																			<input
																				type="number"
																				className="form-control"
																				placeholder={9876543210}
																				name="phone"
																				{...register("phone")}
																				value={artist?.phone}
																				onChange={handleChange}
																			/>
																		</div>
																	</div>
																</div>
															</div>
															<div className="row">
																<div className="col-md-12">
																	<div className="row">
																		<div className="col-md-6 mb-4">
																			<label className="form-label">D.O.B</label>
																			<input
																				type="date"
																				className="form-control"
																				name="date"
																				{...register("date")}
																				value={artist?.dob}
																				onChange={handleChange}
																			/>
																		</div>
																		<div className="col-md-6 mb-4">
																			<label className="form-label">Country</label>
																			<br />
																			<select
																				name="country_id"
																				// defaultValue={artist && artist.country_id}
																				{...register("country_id")}
																				value={artist?.country_id}
																				onChange={handleChange}
																			>
																				{countryData && countryData.map((item) => (
																					<option key={item.id} value={item.id}>
																						{item.name}
																					</option>
																				))}
																			</select>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="d-flex mb-4">
														<div className="col-12">
															<label className="form-label">Address</label> <br />
															<textarea
																name="address"
																className="w-100 form-control"
																placeholder="Address Here"
																rows={4}
																cols={50}
																// defaultValue={""}
																value={artist?.address}
																{...register("address")}
																onChange={handleChange}
															/>
														</div>
													</div>
													<div className="d-flex">
														<div className="col-12">
															<div className="row ">
																<div className="col-md-12">
																	<div className="row">
																		{/* <div className="col-md-4 mb-4">
																			<label className="form-label">State</label>
																			<input
																				type="text"
																				className="form-control"
																				placeholder="State"
																				name="name"
																			/>
																		</div> */}
																		<div className="col-md-4 mb-4">
																			<label className="form-label">State</label>
																			<br />
																			<select
																				name="state_id"
																				// defaultValue={artist && artist.country_id}
																				{...register("state_id")}
																				value={artist?.state_id}
																				onChange={handleChange}
																			>
																				{stateData && stateData.map((item) => (
																					<option key={item.id} value={item.id}>
																						{item.name}
																					</option>
																				))}
																			</select>
																		</div>
																		{/* <div className="col-md-4 mb-4">
																			<label className="form-label">City</label>
																			<input
																				type="text"
																				className="form-control"
																				placeholder="City"
																				name="name"
																			/>
																		</div> */}
																		<div className="col-md-4 mb-4">
																			<label className="form-label">City</label>
																			<br />
																			<select
																				name="city_id"
																				// defaultValue={artist && artist.country_id}
																				{...register("city_id")}
																				value={artist?.city_id}
																				onChange={handleChange}
																			>
																				{cityData && cityData.map((item) => (
																					<option key={item.id} value={item.id}>
																						{item.name}
																					</option>
																				))}
																			</select>
																		</div>
																		<div className="col-md-4 mb-4">
																			<label className="form-label">Pincode/ZIP Code</label>
																			<input
																				type="text"
																				className="form-control"
																				placeholder="Pincode"
																				name="zip_code"
																				{...register("zip_code")}
																				value={artist?.zip_code}
																				onChange={handleChange}
																			/>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="d-flex mb-4">
														<div className="col-12">
															<label className="form-label">Add Your Bio</label> <br />
															<textarea
																name="message"
																className="w-100 form-control"
																placeholder="Your Bio"
																rows={4}
																cols={50}
																// defaultValue={""}
																{...register("bio")}
																value={seller?.bio}
																onChange={handleChangeSeller}
															/>
														</div>
													</div>
													<div className="d-flex mb-4">
														<div className="col-12">
															<div className="row mb-4">
																<div className="col-md-12">
																	<div className="row">
																		<div className="col-md-8">
																			<label className="form-label">Add Achievements</label>
																			<textarea
																				className="w-100 form-control"
																				placeholder="Achievements"
																				rows={4}
																				cols={50}
																				name="achievment"
																				// defaultValue={""}
																				{...register("achievment")}
																				value={seller?.achievment}
																				onChange={handleChangeSeller}
																			/>
																		</div>
																		<div className="col-md-4">
																			<label className="form-label">
																				Certification (if any)
																			</label>
																			<label className="input-file">
																				<svg
																					xmlns="http://www.w3.org/2000/svg"
																					width={34}
																					height={34}
																					viewBox="0 0 34 34"
																					fill="none"
																				>
																					<path
																						d="M26.769 18.2345H18.3955V26.6079H15.6044V18.2345H7.23096V15.4434H15.6044V7.06995H18.3955V15.4434H26.769V18.2345Z"
																						fill="black"
																					/>
																				</svg>
																				<span>Browse File</span>
																				<input
																					type="file"
																					className="form-control"
																					placeholder="City"
																					name="name"
																					onChange={handleProfilePicChange}
																				/>
																			</label>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="d-flex mb-4">
														<button type="submit" className="btn btn-primary savechangesBtn"												>
															Save Changes
														</button>
													</div>
												</div>
											</form>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default ArtistProfile;