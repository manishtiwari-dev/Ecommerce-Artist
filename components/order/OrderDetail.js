export default function OrderDetail() {
	return (
		<>
			<div className="product-detail-order-wrapper spaceingtop">
				<div className="container-fluid">
					<div className="row">
						<h3>Order #Id</h3>
						<div className="col-md-6">
							<div className="box">
								<div className="table-wrap">
									<table className="table">
										<thead>
											<tr>
												<th>Order Information</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="label-name">Date of Purchase:</td>
												<td className="label-details">2024-04-13</td>
											</tr>
											<tr>
												<td className="label-name">Customer Name:</td>
												<td className="label-details">Abhijeet</td>
											</tr>
											<tr>
												<td className="label-name">Shipping Address:</td>
												<td className="label-details">
													Shipping address to be entered here Shipping address to be
													entered here Shipping address
												</td>
											</tr>
											<tr>
												<td className="label-name">Email Address:</td>
												<td className="label-details">Abhijeet@gmail.com</td>
											</tr>
											<tr>
												<td className="label-name">Phone Number:</td>
												<td className="label-details">+91 9876543210</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="main-box">
								<div className="row">
									<div className="col-8">
										<div className="box">
											<div className="table-wrap">
												<table className="table">
													<thead>
														<tr>
															<th>Product Details</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td className="label-name">Artwork Title:</td>
															<td className="label-details">Artwork Title</td>
														</tr>
														<tr>
															<td className="label-name">Price:</td>
															<td className="label-details">Rs. 49,000</td>
														</tr>
														<tr>
															<td className="label-name">Discount applied:</td>
															<td className="label-details">Rs. 8,000</td>
														</tr>
														<tr>
															<td className="label-name">Total Price</td>
															<td className="label-details">Rs. 41,000</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div className="col-4">
										<div className="image">
											<img src="img/order-img.png" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row align-items-end">
						<div className="col-md-6">
							<div className="box">
								<div className="table-wrap bottom-table">
									<table className="table">
										<thead>
											<tr>
												<th>Payment Details</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Payment Method:</td>
												<td>Bank Account</td>
											</tr>
											<tr>
												<td>Advance (if any):</td>
												<td>Rs. 0.00</td>
											</tr>
											<tr>
												<td>Banking Details (if any):</td>
												<td>************</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="box">
								<div className="table-wrap bottom-table">
									<table className="table">
										<thead>
											<tr>
												<th>Shipping Information</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Pending</td>
												<td>Bank Account</td>
											</tr>
											<tr>
												<td>Expected Delivery Date:</td>
												<td>2024-04-20</td>
											</tr>
											<tr>
												<td>Shipping Carrier:</td>
												<td>Shipping company</td>
											</tr>
											<tr>
												<td>Tracking Information:</td>
												<td>Tracking Link</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div className="button-section mt-4">
						<div className="row">
							<div className="col-md-4 mb-3">
								<button type="button" className="btn btn-link ShippedBtn">
									Mark as Shipped
								</button>
							</div>
							<div className="col-md-4 mb-3">
								<button type="button" className="btn btn-link deliveryBtn">
									Update Expected Delivery Date
								</button>
							</div>
							<div className="col-md-4 mb-3">
								<button type="button" className="btn btn-link informationBtn">
									Add Tracking Information
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}