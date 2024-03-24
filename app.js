const client = supabase.createClient(
	"https://amfifubujyvqxfjljkaq.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZmlmdWJ1anl2cXhmamxqa2FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMDAxNzUsImV4cCI6MjAyNjc3NjE3NX0.Lb_ZhxquAbNseh1R2WylCjeT_KPC9D99Vqbf_Uz6LkI"
);

const peopleSearchForm = document.getElementById("people-search-form");
peopleSearchForm.addEventListener("submit", submitPeopleSearch);

/**
 * Handle the submission of the "Search people" form,
 * and use the inputted name in a request to supabase,
 * then add the HTML template into the page
 */
async function submitPeopleSearch(e) {
	e.preventDefault();
	const peopleSearchInput = document.getElementById("name-search").value;
	const peopleResults = document.getElementById("people-results");

	peopleResults.innerHTML = "<p>Loading...</p>";
	const { data, error } = await client
		.from("People")
		.select()
		.ilike("Name", `%${peopleSearchInput}%`);
	console.log("Search Result: ", data);

	if (!data.length) {
		return (peopleResults.innerHTML = "<p>Person not found</p>");
	}

	peopleResults.innerHTML = data
		.map((person) => {
			return renderPersonCard(person);
		})
		.join("");
}

function renderPersonCard(person) {
	return `<div class="person-card">
						<h3 class="person-card-title">${person.Name}</h3>
						<div class="person-attributes">
							<div class="attribute-group">
								<p><span class="attribute-name">Address: </span>${person.Address}</p>
								<p><span class="attribute-name">DOB: </span>${person.DOB}</p>
							</div>
							<div class="attribute-group">
								<p><span class="attribute-name">License: </span>${person.LicenseNumber}</p>
								<p><span class="attribute-name">Expires: </span>${person.ExpiryDate}</p>
							</div>
						</div>
					</div>`;
}
