const userTable = document.querySelector("#userTable tbody");

fetch("https://jsonplaceholder.typicode.com/users")
	.then(response => response.json())
	.then(users => {
		users.forEach(user => {
			const row = document.createElement("tr");
			row.innerHTML = `
				<td>${user.id}</td>
				<td>${user.name}</td>
				<td>${user.username}</td>
				<td>${user.email}</td>
			`;
			userTable.appendChild(row);
		});
	})
	.catch(error => console.log(error));
