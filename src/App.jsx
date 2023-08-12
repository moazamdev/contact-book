import React, { useState, useEffect } from "react";
import localforage from "localforage";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
	NavLink,
	useParams,
	useNavigate,
} from "react-router-dom";
import AppLayout from "./components/app_layout";

function Home() {
	return (
		<>
			<h1>Home</h1>
		</>
	);
}

function About() {
	return <h1>About</h1>;
}

function NotFound() {
	return <h1>Not Found</h1>;
}

function Contact() {
	return (
		<>
			<h1>Contact</h1>
			<Outlet />
		</>
	);
}

function NavigationComponent() {
	return (
		<>
			<nav className="flex gap-6 align-middle items-center">
				<NavLink
					to="/"
					style={({ isActive }) =>
						isActive
							? { backgroundColor: "white", color: "black" }
							: { backgroundColor: "transparent", color: "white" }
					}
					className={`px-4 py-2 text-[.9rem] rounded-full hover:bg-white hover:text-black`}
				>
					Home
				</NavLink>
				<NavLink
					to="/about"
					style={({ isActive }) =>
						isActive
							? { backgroundColor: "white", color: "black" }
							: { backgroundColor: "transparent", color: "white" }
					}
					className={`px-4 py-2 text-[.9rem] rounded-full hover:bg-white hover:text-black`}
				>
					About
				</NavLink>
				<NavLink
					to="/contact"
					style={({ isActive }) =>
						isActive
							? { backgroundColor: "white", color: "black" }
							: { backgroundColor: "transparent", color: "white" }
					}
					className={`px-4 py-2 text-[.9rem] rounded-full hover:bg-white hover:text-black`}
				>
					Contact
				</NavLink>
			</nav>
			<hr className="mt-4 border border-[#333] w-full"/>

			<Outlet />
		</>
	);
}

function ContactDetails() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [contactUsers, setContactUsers] = useState([]);

	useEffect(() => {
		localforage.getItem("contactUsers").then((data) => {
			if (data) {
				setContactUsers(data);
			}
		});
	}, []);

	const currentUser = contactUsers.find((user) => user.id === id);
	return (
		<>
			<h4 className="uppercase">Contact Detail</h4>
			{currentUser && (
				<div className="flex gap-5">
					<div>
						<img
							src={`https://robohash.org/${currentUser.id}.png?set=set5`}
							alt={currentUser.first_name}
							className="w-40 rounded-full bg-[#222]"
						/>
					</div>
					<div className="flex flex-col items-start justify-center">
						<h2 className="text-[1.5rem]">
							{currentUser.first_name} {currentUser.last_name}
						</h2>
						<p>@{currentUser.username}</p>
						<a href={`tel:+1${currentUser.number}`}>
							{currentUser.number}
						</a>
						<div className="flex gap-5 mt-4">
							<NavLink
								to={`/contact/${currentUser.id}/edit`}
								className={"bg-[#444] px-5 py-2 rounded-lg"}
							>
								Edit
							</NavLink>
							<NavLink
								className={"bg-[#444] px-5 py-2 rounded-lg"}
							>
								Delete
							</NavLink>
							<NavLink
								className={"bg-[#444] px-5 py-2 rounded-lg"}
								to={`/contact/`}
							>
								Back
							</NavLink>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

function UsersList() {
	const [contactUsers, setContactUsers] = useState([]);

	useEffect(() => {
		localforage.getItem("contactUsers").then((data) => {
			if (data) {
				setContactUsers(data);
			}
		});
	}, []);

	return (
		<>
			<div className="grid grid-cols-2 gap-6 w-full">
				{contactUsers.map((user) => {
					return (
						<div
							className="user-box flex bg-[#444] p-3 rounded-lg w-full"
							key={user.id}
						>
							<div className="img-box w-[30%]">
								<img
									src={`https://robohash.org/${user.id}.png?set=set5`}
									alt={user.first_name}
									className="w-20 rounded-full bg-[#222]"
								/>
							</div>
							<div className="details w-[70%] flex flex-col items-start">
								<h2>
									{user.first_name} {user.last_name}
								</h2>
								<p className="text-[#bbb]">{user.username}</p>
								<NavLink to={`/contact/${user.id}`}>
									View Details
								</NavLink>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

function EditContactDetails() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [contactUsers, setContactUsers] = useState([]);
	const [data, setData] = React.useState({
		first_name: "",
		last_name: "",
		username: "",
		number: "",
	});

	useEffect(() => {
		localforage.getItem("contactUsers").then((data) => {
			if (data) {
				setContactUsers(data);
				const currentUser = data.find((user) => user.id === id);
				if (currentUser) {
					setData({
						first_name: currentUser.first_name,
						last_name: currentUser.last_name,
						username: currentUser.username,
						number: currentUser.number,
					});
				}
			}
		});
	}, [id]);

	const handleSave = () => {
		const updatedUsers = contactUsers.map((user) =>
			user.id === id
				? {
						...user,
						first_name: data.first_name,
						last_name: data.last_name,
						username: data.username,
						number: data.number,
				  }
				: user
		);

		localforage
			.setItem("contactUsers", updatedUsers)
			.then(() => {
				navigate(`/contact/${id}`);
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error updating data:", error);
			});
	};

	return (
		<>
			<h4 className="uppercase">Edit Contact: {data.first_name}</h4>
			<div className="editable-container flex flex-col w-full">
				<form action="" className="w-full">
					<label className="text-start flex flex-col mt-2" htmlFor="">
						First Name:
						<input
							type="text"
							name="first_name"
							value={data.first_name}
							onChange={(e) =>
								setData({ ...data, first_name: e.target.value })
							}
						/>
					</label>
					<label className="text-start flex flex-col mt-2" htmlFor="">
						Last Name:
						<input
							type="text"
							name="last_name"
							value={data.last_name}
							onChange={(e) =>
								setData({ ...data, last_name: e.target.value })
							}
						/>
					</label>
					<label className="text-start flex flex-col mt-2" htmlFor="">
						Username:
						<input
							type="text"
							name="username"
							value={data.username}
							onChange={(e) =>
								setData({ ...data, username: e.target.value })
							}
						/>
					</label>
					<label className="text-start flex flex-col mt-2" htmlFor="">
						Number:
						<input
							type="tel"
							name="number"
							value={data.number}
							onChange={(e) =>
								setData({ ...data, number: e.target.value })
							}
						/>
					</label>
				</form>
			</div>
			<div className="flex gap-5">
				<button
					className={"bg-[#444] px-5 py-2 rounded-lg"}
					onClick={handleSave}
				>
					Save
				</button>
				<NavLink
					className={"bg-[#444] px-5 py-2 rounded-lg"}
					to={`/contact/${id}`}
				>
					Cancel
				</NavLink>
			</div>
		</>
	);
}

function App() {
	const [contactUsers, setContactUsers] = useState([]);

	useEffect(() => {
		localforage.config({
			name: "myApp",
			version: 1,
			storeName: "contacts",
		});

		localforage.getItem("contactUsers").then((data) => {
			if (data) {
				setContactUsers(data);
			}
		});
	}, []);

	return (
		<Router>
			<Routes>
				<Route element={<AppLayout contactUsers={contactUsers} />}>
					<Route element={<NavigationComponent />}>
						<Route index element={<Home />} />
						<Route path="about" element={<About />} />

						<Route path="contact" element={<Contact />}>
							<Route index element={<UsersList />} />
							<Route path=":id" element={<ContactDetails />} />
							<Route
								path=":id/edit"
								element={<EditContactDetails />}
							/>
						</Route>
					</Route>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
