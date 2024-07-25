export default function AddArtworkDashboard() {

	return (
		<>
			<div className="profile-wrapper artist-profile addartwwork spaceingtop">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-6">
							<h3>ADD ARTWORK</h3>
						</div>
						<div className="col-md-6">
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col-md-12 mb-3">
									<label className="form-label">Art Title</label>
									<input
										type="text"
										className="form-control"
										id="text1"
										placeholder="First Name"
										name="name"
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 mb-3">
									<label className="form-label">Orientation</label>
									<select
										className="select__input form-control"
										name="country-selector"
										id="Orientation"
									>
										<option value={0}>Orientation</option>
										<option value="IT">Orientation</option>
										<option value="UK">Orientation</option>
									</select>
								</div>
							</div>
						</div>
						<div className="col-md-6 mb-3">
							<label className="form-label">Artwork Description</label> <br />
							<textarea
								id="text6"
								name="message"
								className="w-100 form-control"
								placeholder="Description"
								rows={4}
								cols={50}
								defaultValue={""}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4 ">
							<div className="row">
								<label className="form-label">Size</label>
								<div className="col-md-6 mb-3">
									<select name="Cm" id="Cm">
										<option value="volvo">Cm</option>
										<option value="saab">Cm</option>
										<option value="mercedes">Cm</option>
										<option value="audi">Cm</option>
									</select>
								</div>
								<div className="col-md-6 mb-3">
									<select name="Cm" id="Cm">
										<option value="volvo">Cm</option>
										<option value="saab">Cm</option>
										<option value="mercedes">Cm</option>
										<option value="audi">Cm</option>
									</select>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-3">
							<label className="form-label">Medium</label>
							<select name="Medium" id="Medium">
								<option value="volvo">Medium</option>
								<option value="saab">Medium</option>
								<option value="mercedes">Medium</option>
								<option value="audi">Medium</option>
							</select>
						</div>
						<div className="col-md-4 mb-3">
							<label className="form-label">Style</label>
							<select name="Style" id="Style">
								<option value="volvo">Style</option>
								<option value="saab">Style</option>
								<option value="mercedes">Style</option>
								<option value="audi">Style</option>
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4 mb-3">
							<label className="form-label">Color</label>
							<select name="Select" id="Select">
								<option value="volvo">Select</option>
								<option value="saab">Select</option>
								<option value="mercedes">Select</option>
								<option value="audi">Select</option>
							</select>
						</div>
						<div className="col-md-4 mb-3">
							<label className="form-label">Color</label>
							<select name="Rs" id="Rs">
								<option value="volvo">Rs</option>
								<option value="saab">Rs</option>
								<option value="mercedes">Rs</option>
								<option value="audi">Rs</option>
							</select>
						</div>
						<div className="col-md-4 mb-3">
							<label className="form-label">Discount (If Any)</label>
							<select name="Rs" id="Rs">
								<option value="volvo">Rs</option>
								<option value="saab">Rs</option>
								<option value="mercedes">Rs</option>
								<option value="audi">Rs</option>
							</select>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3 mb-3">
							<h5>Add Artwork Image</h5>
							<div className="image-box">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={34}
									height={34}
									viewBox="0 0 34 34"
									fill="none"
								>
									<path
										d="M26.9208 18.5468H18.5474V26.9202H15.7562V18.5468H7.38281V15.7556H15.7562V7.3822H18.5474V15.7556H26.9208V18.5468Z"
										fill="black"
									/>
								</svg>
							</div>
						</div>
						<div className="col-md-4 mb-3">
							<h5>Multi Shots</h5>
							<div className="main-box">
								<div className="image-box">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={34}
										height={34}
										viewBox="0 0 34 34"
										fill="none"
									>
										<path
											d="M26.9208 18.5468H18.5474V26.9202H15.7562V18.5468H7.38281V15.7556H15.7562V7.3822H18.5474V15.7556H26.9208V18.5468Z"
											fill="black"
										/>
									</svg>
								</div>
								<div className="image-box">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={34}
										height={34}
										viewBox="0 0 34 34"
										fill="none"
									>
										<path
											d="M26.9208 18.5468H18.5474V26.9202H15.7562V18.5468H7.38281V15.7556H15.7562V7.3822H18.5474V15.7556H26.9208V18.5468Z"
											fill="black"
										/>
									</svg>
								</div>
								<div className="image-box">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={34}
										height={34}
										viewBox="0 0 34 34"
										fill="none"
									>
										<path
											d="M26.9208 18.5468H18.5474V26.9202H15.7562V18.5468H7.38281V15.7556H15.7562V7.3822H18.5474V15.7556H26.9208V18.5468Z"
											fill="black"
										/>
									</svg>
								</div>
								<div className="image-box">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={34}
										height={34}
										viewBox="0 0 34 34"
										fill="none"
									>
										<path
											d="M26.9208 18.5468H18.5474V26.9202H15.7562V18.5468H7.38281V15.7556H15.7562V7.3822H18.5474V15.7556H26.9208V18.5468Z"
											fill="black"
										/>
									</svg>
								</div>
							</div>
						</div>
						<div className="col-md-5"></div>
					</div>
					<div className="row mb-3">
						<div className="col-md-8">
							<span className="img-size">
								File size should be minimum 2MB and Maximum 5MB
							</span>
							<input
								type="checkbox"
								id="vehicle1"
								name="vehicle1"
								defaultValue="Bike"
							/>
							<label className="checkbox-label">
								I am the Artist and I own the copyright of this work.
							</label>
							<br />
						</div>
						<div className="col-md-4">
							<div className="btn-wrap">
								<button
									type="submit"
									className="btn btn-primary Savebtn"
									data-bs-toggle="modal"
									data-bs-target="#myModal"
								>
									Save Artwork
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}