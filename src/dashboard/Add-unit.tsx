import React, { useState, FormEvent, ChangeEvent } from "react";
import axiosInstance from "../request/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

import {
	Container,
	InputContainer,
	FormContainer,
	LastInput,
	Lastpara,
	Div,
	Label1,
	Input,
	DropZone,
	Txt,
	Button,
	SELECT,
	Img1,
	BtnTxt,
	ImagePreview,
} from "./style";
import BeatLoader from "react-spinners/BeatLoader";

// interface UnitData {
//   name: string;
//   number: string;
//   type: string;
//   location: string;
//   status: string;
//   numberOfBedrooms: string;
//   price: string;
//   description: string;
//   pictures: File[];
// }

const AddUnits = () => {
	const [name, setUnitName] = useState("");
	const [number, setUnitNumber] = useState("");
	const [type, setUnitType] = useState("");
	const [location, setLocation] = useState("");
	const [status, setStatus] = useState("status");
	const [numberOfBedrooms, setNumberOfBedrooms] = useState("");
	const [price, setPrice] = useState("");
	const [description, setUnitDescription] = useState("");
	const [pictures, setPictures] = useState<File[]>([]);
	const [loading, setLoading] = useState(false);

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const newPictures = Array.from(e.target.files || []) as File[];
		setPictures((prevPictures) => [...prevPictures, ...newPictures]);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const newPictures = Array.from(e.dataTransfer.files) as File[];
		setPictures((prevPictures) => [...prevPictures, ...newPictures]);
	};

	const handleClick = () => {
		const fileInput = document.getElementById("fileInput") as HTMLInputElement;
		fileInput.click();
	};
	console.log(pictures[0]);

	const handleAddUnit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setLoading(true);

			// Image upload logic
			const formData = new FormData();
			pictures.forEach((pic: File) => formData.append("pictures", pic));
			const config = {
				headers: {
					"content-type": "multipart/form-data",
				},
			};

			// Form submission logic

			formData.append("name", name);
			formData.append("number", number);
			formData.append("status", status);
			formData.append("numberOfBedrooms", numberOfBedrooms);
			formData.append("price", price.replace(/,/g, ""));
			formData.append("type", type);
			formData.append("location", location);
			formData.append("description", description);
			// formData.append("", imageUrls)

			console.log("Data to be sent to the server", formData);
			const Response = await axiosInstance.post("/api/create-unit", formData, config);

			if (Response.status === 201) {
				setLoading(false);
				// toast.success("Unit added successfully!");
				// Optionally navigate or perform other actions after successful form submission
				toast.success("Unit added successfully!", {
					autoClose: 3000,
				});
			} else {
				setLoading(false);
				console.error("Error adding unit:", Response);
				toast.error("Failed to add unit. Please try again.");
			}
		} catch (error) {
			console.error("An error occurred:", error);
			setLoading(false);
			toast.error("An error occurred. Please try again.");
		}
	};

	return (
		<>
			<Container>
				<ToastContainer />
				<FormContainer>
					{/* <Content> */}
					<Txt>Add Unit</Txt>
					<p
						style={{
							textAlign: "center",
							color: "var(--Grey-700, #344054)",
							fontFamily: "Inter",
							fontSize: "16px",
							fontStyle: "normal",
							fontWeight: "400",
							lineHeight: "22.4px",
							letterSpacing: "0.15px",
							marginBottom: "28px",
						}}>
						Add Available Unit to the list
					</p>
					{/* </Content> */}
					{/* <ToastContainer /> */}
					<form>
						<InputContainer>
							<Div>
								<Label1 htmlFor="name">Name of Unit</Label1>
								{/* <div style={{ position: "relative", display: "flex" }}> */}
								<Input
									type="text"
									name="name"
									id="name"
									placeholder="Sunny side Shortlet"
									value={name}
									onChange={(e) => setUnitName(e.target.value)}
									style={{
										width: "100%",
										height: "35px",
										fontSize : "14px"
									}}
								/>
							</Div>

							<Div>
								<Label1 htmlFor="unit-Number">Unit Number</Label1>
								<Input
									type="text"
									name="units"
									id="units"
									placeholder="17A"
									value={number}
									onChange={(e) => setUnitNumber(e.target.value)}
									style={{
										width: "100%",
										height: "35px",
										fontSize : "14px"
									}}
								/>
							</Div>
							{/* </div> */}
						</InputContainer>

						<InputContainer>
							<Div>
								<Label1 htmlFor="unit type">Type of Units</Label1>
								<Input
									type="text"
									id=""
									name=""
									placeholder="Duplex"
									value={type}
									onChange={(e) => setUnitType(e.target.value)}
									style={{
										width: "100%",
										height: "35px",
										fontSize : "14px"
									}}
								/>
							</Div>

							<Div>
								<Label1 htmlFor="location">Location</Label1>
								<Input
									type="text"
									id="location"
									name="location"
									placeholder="Lagos"
									value={location}
									onChange={(e) => setLocation(e.target.value)}
									style={{
										width: "100%",
										height: "35px",
										fontSize : "14px"
									}}
								/>
							</Div>
						</InputContainer>

						<Div>
							<Label1 htmlFor="d2">Availability Status</Label1>
							<SELECT defaultValue={"default"} onChange={(e) => setStatus(e.target.value)} 	style={{
										width: "100%",
										height: "35px",
										fontSize : "14px"
									}}>
					
									<option value="default" disabled>
										Select Availability
									</option>
					
								<option value="available">Available</option>
								<option value="occupied">Occupied</option>
							</SELECT>
						</Div>

						<InputContainer>
							<Div>
								<Label1 htmlFor="no of beds"> Number Of Bedrooms </Label1>
								<Input
									type="text"
									id="no of beds"
									name="no of beds"
									placeholder="2"
									value={numberOfBedrooms}
									onChange={(e) => setNumberOfBedrooms(e.target.value)}
									style={{
										width: "100%",
										height: "35px",
										fontSize : "14px"
									}}
								/>
							</Div>

							<Div>
								<Label1 htmlFor="priceOfUnits">Price Of Unit</Label1>
								<Input
									type="text"
									id="priceOfUnits"
									name="priceOfUnits"
									placeholder="70,000"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									style={{
										width: "100%",
										height: "35px",
										fontSize : "14px"
									}}
								/>
							</Div>
						</InputContainer>

						<Label1>Picture Upload</Label1>
						<DropZone onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClick}>
							<svg xmlns="http://www.w3.org/2000/svg" width="44" height="30" viewBox="0 0 44 30" fill="none">
								<path
									d="M12.6229 0C10.8434 0 9.37699 1.38607 9.37699 3.06818V4.77273C9.37699 5.15045 9.6987 5.45455 10.0983 5.45455H10.8196C11.2192 5.45455 11.5409 5.15045 11.5409 4.77273V3.06818C11.5409 2.48393 12.0048 2.04545 12.6229 2.04545H14.4261C14.8257 2.04545 15.1475 1.74136 15.1475 1.36364V0.681818C15.1475 0.304091 14.8257 0 14.4261 0H12.6229ZM1.44261 16.3636C0.643406 16.3636 0 16.9718 0 17.7273V22.5C0 23.2555 0.643406 23.8636 1.44261 23.8636H19.4753C20.2745 23.8636 20.9179 23.2555 20.9179 22.5V17.7273C20.9179 16.9718 20.2745 16.3636 19.4753 16.3636H1.44261ZM16.5464 18.1281C16.8697 18.1281 17.1799 18.1995 17.51 18.3358C17.5927 18.1927 17.6684 18.1348 17.82 18.1348C18.0335 18.1348 18.1299 18.2195 18.1299 18.493L18.1371 19.3186C18.1371 19.592 18.0686 19.6902 17.7863 19.6902C17.5797 19.6902 17.4976 19.5924 17.4356 19.3905C17.3254 19.0194 17.1257 18.8246 16.6298 18.8246C15.9479 18.8246 15.5618 19.2673 15.5618 20.1136C15.5618 20.96 15.9749 21.4227 16.6636 21.4227C16.8358 21.4227 17.0497 21.3824 17.3045 21.3108V20.8168H16.9255C16.6431 20.8168 16.5057 20.7321 16.5057 20.4652C16.5057 20.1983 16.6431 20.1136 16.9255 20.1136H18.1371C18.4194 20.1136 18.564 20.1851 18.564 20.4585C18.564 20.6864 18.4331 20.8101 18.192 20.8101H18.1373V21.5652V21.6038C18.1373 21.7209 18.1301 21.7594 18.0204 21.8248C17.8344 21.929 17.2636 22.0991 16.568 22.0991C15.3834 22.0991 14.5913 21.2855 14.5913 20.1136C14.5913 19.0003 15.3962 18.1281 16.5464 18.1281ZM6.93131 18.232H8.3218C9.43074 18.232 9.98841 18.6423 9.98841 19.4105C9.98841 20.2243 9.43074 20.6543 8.3218 20.6543H7.75123V21.3042H8.08794C8.36341 21.3042 8.50072 21.3887 8.50072 21.6491C8.50072 21.9095 8.36341 22.0006 8.08794 22.0006H6.93131C6.65577 22.0006 6.51712 21.9095 6.51712 21.6491C6.51712 21.4277 6.64908 21.3042 6.87637 21.3042H6.93122V18.9351H6.88218C6.64797 18.9351 6.5173 18.8114 6.5173 18.5835C6.5173 18.3296 6.65577 18.232 6.93131 18.232ZM10.9281 18.232H13.6823C13.965 18.232 14.0331 18.2967 14.0331 18.5249V19.2347C14.0331 19.5082 13.9439 19.6382 13.6753 19.6382C13.3997 19.6382 13.3105 19.5017 13.3105 19.2347V18.9018H11.7466V19.7155H12.3327V19.6769C12.3327 19.436 12.4492 19.3186 12.6765 19.3186C12.9313 19.3186 13.0272 19.4499 13.0272 19.7168V20.3733C13.0272 20.6403 12.9383 20.7715 12.6835 20.7715C12.4562 20.7715 12.3383 20.6598 12.3383 20.4319V20.3734H11.7466V21.3242H13.3105V20.946C13.3105 20.6726 13.4066 20.5492 13.6753 20.5492C13.9507 20.5492 14.0331 20.6791 14.0331 20.946V21.7144C14.0331 21.9422 13.9645 22.0007 13.6823 22.0007H10.9268C10.6513 22.0007 10.5139 21.9096 10.5139 21.6491C10.5139 21.4278 10.6444 21.3042 10.8717 21.3042H10.9266V18.9351H10.879C10.6447 18.9351 10.5127 18.8115 10.5127 18.5836C10.5127 18.3297 10.6514 18.232 10.9269 18.232L10.9281 18.232ZM3.84181 18.2388H5.55632C5.83871 18.2388 5.98319 18.3102 5.98319 18.5837C5.98319 18.8506 5.83871 18.9286 5.55632 18.9286H5.27315V20.6931V20.7516C5.27315 21.1358 5.26593 21.4408 5.01816 21.7078C4.78402 21.9617 4.35102 22.0993 3.75869 22.0993C3.33167 22.0993 2.95193 22.0278 2.60065 21.8716C2.42126 21.7934 2.35411 21.7017 2.35411 21.3762V20.7183C2.35411 20.3798 2.44254 20.2309 2.73871 20.2309C3.07621 20.2309 3.0422 20.4783 3.07683 20.7583C3.12515 21.188 3.23552 21.3962 3.71079 21.3962C4.26865 21.3962 4.39828 21.1159 4.39828 20.5039V18.9352H3.84181C3.55941 18.9352 3.41353 18.8506 3.41353 18.5837C3.41353 18.3167 3.55941 18.2388 3.84181 18.2388ZM7.74983 18.9606V19.938H8.226C8.75631 19.938 9.02479 19.7616 9.02479 19.4426C9.02479 19.1236 8.75631 18.9606 8.226 18.9606H7.74983Z"
									fill="#3538CD"
								/>
								<path
									d="M28.8523 0.000332919C28.4527 0.000332919 28.131 0.304424 28.131 0.682151V1.36397C28.131 1.7417 28.4527 2.04579 28.8523 2.04579H36.0682L36.0797 6.46695C36.0797 7.02966 36.5636 7.48545 37.1589 7.48702L41.8361 7.49867V26.9318C41.8361 27.5161 41.3722 27.9545 40.7541 27.9545H24.1641C23.5459 27.9545 23.0821 27.5161 23.0821 26.9318V25.9091C23.0821 25.5314 22.7604 25.2273 22.3608 25.2273H21.6395C21.2399 25.2273 20.9182 25.5314 20.9182 25.9091V26.9318C20.9182 28.6139 22.3845 30 24.1641 30H40.7541C42.5336 30 44 28.6139 44 26.9318V6.14569C43.9999 5.87446 43.8859 5.61438 43.683 5.42259L38.2634 0.299627C38.0605 0.107763 37.7853 6.81818e-05 37.4984 0L28.8523 0.000332919ZM20.9179 14.3185C20.9179 14.6962 21.2396 15.0003 21.6392 15.0003H22.3605C22.7601 15.0003 23.0818 14.6962 23.0818 14.3185V7.50033C23.0818 7.12261 22.7601 6.81851 22.3605 6.81851H21.6392C21.2396 6.81851 20.9179 7.12261 20.9179 7.50033V14.3185Z"
									fill="#242730"
								/>
							</svg>
							{pictures.length > 0
								? pictures.map((pic, index) => <ImagePreview key={index} src={URL.createObjectURL(pic)} alt={`Uploaded ${index + 1}`} />)
								: "Drop your files here or click to choose file"}
							<Input
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								id="fileInput"
								style={{ display: "none" }}
								multiple // Allow multiple file selection
							/>
						</DropZone>

						<Lastpara>
							<Label1>Unit Description</Label1>
							<LastInput
								// type="text"
								id="unitDescription"
								name="unitDescription"
								placeholder="Lorem ipsum dolor sit amet consectetur. Vel sed facilisi nisl lectus eget auctor. Leo elit ultrices phasellus tristique. Orci et egestas tristique nulla quam faucibus varius mattis ipsum. Magnis id congue enim volutpat sem feugiat mauris. Mauris parturient imperdiet etiam lectus lacinia mattis. Donec faucibus dui quam sit eget."
								value={description}
								onChange={(e) => setUnitDescription(e.target.value)}
									style={{
										width: "100%",
										height: "100px",
										fontSize : "14px"
									}}
							/>
						</Lastpara>

						<Button type="submit" onClick={handleAddUnit} disabled={loading}>
								<BeatLoader
									color="#fff"
									loading={loading}
									// cssOverride={override}
									size={10}
									aria-label="Loading Spinner"
									data-testid="loader"
								/>
							<Img1
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8040fadb29d4b459ef9ff18035a8680a4aa05a87d22a6fbaf2aa912ba2d9d72?apiKey=d8e1bcd09e8e4aa5ae696156759d859f&"
								/>
							 {loading ? "Adding..." : (<BtnTxt>Add Unit</BtnTxt>)}
							
						</Button>
					</form>
				</FormContainer>
			</Container>
		</>
	);
};

export default AddUnits;
