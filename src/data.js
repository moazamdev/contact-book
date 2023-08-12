export let contactUsers = [
	{
		id: "ABC",
		first_name: "John",
		last_name: "Doe",
		username: "johndoe",
		number: "123-456-7890",
	},
	{
		id: "DEF",
		first_name: "Jane",
		last_name: "Smith",
		username: "janesmith",
		number: "987-654-3210",
	},
	{
		id: "GHI",
		first_name: "Michael",
		last_name: "Johnson",
		username: "mikej",
		number: "555-123-4567",
	},
	{
		id: "JKL",
		first_name: "Emily",
		last_name: "Williams",
		username: "emwill",
		number: "888-555-9999",
	},
	{
		id: "MNO",
		first_name: "David",
		last_name: "Brown",
		username: "davidb",
		number: "333-777-1111",
	},
	{
		id: "PQR",
		first_name: "Sarah",
		last_name: "Jones",
		username: "sarahj",
		number: "666-222-4444",
	},
	{
		id: "STU",
		first_name: "Matthew",
		last_name: "Davis",
		username: "mattd",
		number: "111-888-3333",
	},
	{
		id: "VWX",
		first_name: "Olivia",
		last_name: "Miller",
		username: "oliviam",
		number: "444-111-6666",
	},
	{
		id: "YZA",
		first_name: "Daniel",
		last_name: "Wilson",
		username: "danw",
		number: "222-444-8888",
	},
	{
		id: "BCD",
		first_name: "Sophia",
		last_name: "Moore",
		username: "sophiam",
		number: "777-333-5555",
	},
	{
		id: "EFG",
		first_name: "James",
		last_name: "Taylor",
		username: "jamest",
		number: "555-777-3333",
	},
];

export function updateContactUsers(updatedUsers) {
	// Assuming you are using the exported contactUsers array
	contactUsers = updatedUsers;
}
