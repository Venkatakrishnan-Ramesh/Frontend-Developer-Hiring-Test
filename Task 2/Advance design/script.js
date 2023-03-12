const searchInput = document.getElementById('searchInput');
const userData = document.getElementById('userData').tBodies[0].rows;

fetch('https://jsonplaceholder.typicode.com/users')
	.then(response => response.json())
	.then(data => {
		data.forEach(user => {
			const row = document.createElement('tr');
			const id = document.createElement('td');
			const name = document.createElement('td');
			const username = document.createElement('td');
			const email = document.createElement('td');
			
			id.textContent = user.id;
			name.textContent = user.name;
			username.textContent = user.username;
			email.textContent = user.email;
			
			row.appendChild(id);
			row.appendChild(name);
			row.appendChild(username);
			row.appendChild(email);
			
			document.getElementById('userData').appendChild(row);
		});
	})
	.catch(error => console.error(error));

searchInput.addEventListener('keyup', function() {
	const searchTerm = searchInput.value.toLowerCase();
	
	for (let i = 0; i < userData.length; i++) {
		let found = false;
		const cells = userData[i].cells;
		
		for (let j = 0; j < cells.length; j++) {
			const cellValue = cells[j].textContent.toLowerCase();
			
			if (cellValue.includes(searchTerm)) {
				found = true;
				break;
			}
		}
		
		if (found) {
			userData[i].style.display = '';
		} else {
			userData[i].style.display = 'none';
		}
	}
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'F11') {
    event.preventDefault();
    toggleFullScreen();
  }
});
