import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import localforage from "localforage";

export default function AppLayout({ contactUsers }) {
	const [searchInput, setSearchInput] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);

	useEffect(() => {
		localforage.getItem("contactUsers").then((data) => {
			if (data) {
				contactUsers = data;
				setFilteredUsers(data); // Initialize filteredUsers with the loaded data
			}
		});
	}, [contactUsers]);

	useEffect(() => {
		handleSearch();
	}, [searchInput]);

	const handleSearch = () => {
		if (searchInput.trim() === "" || searchInput === " ") {
			setFilteredUsers(contactUsers);
			return;
		}
		const searchTerm = searchInput.toLowerCase();
		const filtered = contactUsers.filter((user) => {
			const fullName =
				`${user.first_name} ${user.last_name}`.toLowerCase();
			return fullName.includes(searchTerm);
		});
		setFilteredUsers(filtered);
	};
	return (
		<div className="sidebar w-full">
			<div className="sidebar-header w-full flex rounded-lg">
				<div className="col-one bg-[#333] w-[35%] p-10 flex flex-col items-start gap-4 rounded-lg">
					<div className="input-box w-full flex">
						<input
							type="text"
							placeholder={"Search by name..."}
							className="p-4 w-full rounded-lg bg-[#222]"
							value={searchInput}
							onChange={
								(e) => setSearchInput(e.target.value)
								// handleSearch();
							}
						/>
						{/* <button
							className="bg-[#444] px-5 py-2 rounded-lg mb-1"
							onClick={handleSearch}
						>
							Search
						</button> */}
					</div>
					<div>
						<ul className="w-full">
							{filteredUsers.map((user) => (
								<li
									key={user.id}
									className="flex gap-6 mt-4 w-full"
								>
									<div className="user-img">
										<img
											src={`https://robohash.org/${user.id}.png?set=set5`}
											alt={user.first_name}
											className="w-14 rounded-full bg-[#222]"
										/>
									</div>
									<div className="user-info flex flex-col align-start items-start">
										<h3>
											{user.first_name} {user.last_name}
										</h3>
										<NavLink to={`/contact/${user.id}`}>
											View Details
										</NavLink>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="second-col bg-[#212121] w-[65%] p-10 flex flex-col items-start gap-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
