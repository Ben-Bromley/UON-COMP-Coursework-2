// initialise supabase
const client = supabase.createClient(
	"https://amfifubujyvqxfjljkaq.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZmlmdWJ1anl2cXhmamxqa2FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMDAxNzUsImV4cCI6MjAyNjc3NjE3NX0.Lb_ZhxquAbNseh1R2WylCjeT_KPC9D99Vqbf_Uz6LkI"
);

// --- PEOPLE SEARCH ---

// Handle submission of people search form
const peopleSearchForm = document.getElementById("people-search-form");
peopleSearchForm?.addEventListener("submit", submitPeopleSearch);

/**
 * Handle the submission of the "Search people" form,
 * and use the inputted name in a request to supabase,
 * then add the HTML template into the page
 */
async function submitPeopleSearch(e) {
	e.preventDefault();
	const peopleSearchInput = e.target["name-search"].value;
	const peopleResults = document.getElementById("people-results");
	peopleResults.innerHTML = "<p>Loading...</p>";
	const { data, error } = await client
		.from("People")
		.select()
		.ilike("Name", `%${peopleSearchInput}%`);

	if (!data?.length > 0) {
		return (peopleResults.innerHTML = "<p>Person not found</p>");
	}

	peopleResults.innerHTML = data
		.map((person) => {
			return renderPersonCard(person);
		})
		.join("");
}

/**
 * Accepting a person record, return a HTML template displaying the given data
 * @param person
 * @returns
 */
function renderPersonCard(person) {
	return `<div class="result-card">
						<img class="result-card-icon" src="assets/user.svg" alt="User Profile Template" />
						<div class="result-card-content">
							<h3 class="result-card-title">${person.Name}</h3>
							<div class="result-attributes">
								<div class="attribute-group">
									<p class="${
										person.Address === null ? "attribute-missing" : ""
									}"><span class="attribute-name">Address </span>${
		person.Address ?? "missing"
	}</p>
									<p class="${
										person.DOB === null ? "attribute-missing" : ""
									}"><span class="attribute-name">DOB </span>${
		person.DOB ?? "missing"
	}</p>
								</div>
								<div class="attribute-group">
									<p class="${
										person.LicenseNumber === null ? "attribute-missing" : ""
									}"><span class="attribute-name">License </span>${
		person.LicenseNumber ?? "missing"
	}</p>
									<p class="${
										person.ExpiryDate === null ? "attribute-missing" : ""
									}"><span class="attribute-name">Expires </span>${
		person.ExpiryDate ?? "missing"
	}</p>
								</div>
							</div>
						</div>
					</div>`;
}

// --- VEHICLES SEARCH ---

// Handle submission of vehicle search form
const vehicleSearchForm = document.getElementById("vehicle-search-form");
vehicleSearchForm?.addEventListener("submit", submitVehicleSearch);

/**
 * Handle the submission of the "Search vehicles" form,
 * and use the inputted license in a request to supabase,
 * then add the HTML template into the page
 */
async function submitVehicleSearch(e) {
	e.preventDefault();
	const vehicleSearchInput = e.target["vehicle-search"].value;
	const vehicleResults = document.getElementById("vehicle-results");

	vehicleResults.innerHTML = "<p>Loading...</p>";
	const { data, error } = await client
		.from("Vehicles")
		.select(
			`
				VehicleID,
				Make,
				Model,
				Colour,
				People (
					Name
				)
			`
		)
		.ilike("VehicleID", `%${vehicleSearchInput}%`);
	console.log("Search Result: ", data);

	if (!data?.length > 0) {
		return (vehicleResults.innerHTML = "<p>Person not found</p>");
	}
	console.log(data);
	vehicleResults.innerHTML = data
		.map((vehicle) => {
			return renderVehicleCard(vehicle);
		})
		.join("");
}

/**
 * Accepting a vehicle record, return a HTML template displaying the given data
 * @param vehicle
 * @returns
 */
function renderVehicleCard(vehicle) {
	return `<div class="result-card">
						<img class="result-card-icon" src="assets/car.svg" alt="Car Icon" />
						<div class="result-card-content">
							<h3 class="result-card-title">${vehicle.VehicleID}</h3>
							<div class="result-attributes">
								<div class="attribute-group">
									<p><span class="attribute-name">Car: </span>${vehicle.Colour} ${vehicle.Make} ${vehicle.Model}</p>
									<p><span class="attribute-name">Owner: </span>${vehicle.People.Name}</p>
								</div>
							</div>
						</div>
					</div>`;
}

// --- NEW VEHICLE ---

const newVehicleForm = document.getElementById("new-vehicle-form");
newVehicleForm?.addEventListener("submit", submitNewVehicle);

async function submitNewVehicle(e) {
	e.preventDefault();
	const vehicleOwner = await findOrCreateOwner(
		e.target["vehicle-owner-name"].value
	);
	const newVehicle = {
		VehicleID: e.target["vehicle-registration"].value,
		Make: e.target["vehicle-make"].value,
		Model: e.target["vehicle-model"].value,
		Colour: e.target["vehicle-colour"].value,
		OwnerID: vehicleOwner.PersonID,
	};
	const { error } = await client.from("Vehicles").insert(newVehicle);
	if (error) {
		e.target.innerHTML = "<div>Error submitting vehicle.</div>";
	}
	e.target.innerHTML = "<div>New Vehicle Created.</div>";
}

/**
 * When given a name, either find the first person with that name,
 * or create a new person recrod using that name
 * @param {string} ownerName
 * @returns Person record
 */
async function findOrCreateOwner(ownerName) {
	if (!ownerName) throw new Error("Invalid owner name provided");

	let owner = await getPersonByName(ownerName);
	if (!owner) {
		owner = await createPerson(ownerName);
	}

	return owner;
}

/**
 * When provided a name, retrieve the first People record with that name
 * @param {string} name
 * @returns Person record
 */
async function getPersonByName(name) {
	const { data, error } = await client
		.from("People")
		.select()
		.ilike("Name", `%${name}%`);
	return data?.[0];
}

/**
 * When provided with a name, create a new People record
 * @param {string} name
 * @returns Person object
 */
async function createPerson(name) {
	const { data, error } = await client
		.from("People")
		.insert({ Name: name })
		.select();
	return data?.[0];
}

document
	.getElementById("incident-search-form")
	?.addEventListener("submit", submitIncidentSearch);

async function submitIncidentSearch(e) {
	e.preventDefault();
	const registration = e.target["incident-search"].value;
	const incidentResults = document.getElementById("incidents-results");
	incidentResults.innerHTML = "<p>Loading...</p>";
	const fines = await getFineByVehicleID(registration);

	if (!fines?.length > 0) {
		incidentResults.innerHTML = "<p>No Incidents Recorded</p>";
		return;
	}

	incidentResults.innerHTML = fines
		.map((incident) => renderIncidentCard(incident))
		.join("");
	console.log(fines);
}

async function getFineByVehicleID(registration) {
	const { data, error } = await client
		.from("Fines")
		.select(
			`
			VehicleID,
			Time,
			OffenceID,
			PersonID,
			Amount,
			OfficerStatement,
			People (
				Name
			)
		`
		)
		.ilike("VehicleID", `%${registration}%`);
	return data;
}

/**
 * Accepting a incident record, return a HTML template displaying the given data
 * @param incident
 * @returns
 */
function renderIncidentCard(incident) {
	return `<div class="result-card">
						<img class="result-card-icon" src="assets/car.svg" alt="User Profile Template" />
						<div class="result-card-content">
							<h3 class="result-card-title">${incident.VehicleID}</h3>
							<div class="result-attributes">
								<div class="attribute-group">
									<p class=""><span class="attribute-name">Offender </span>${incident.People?.Name}</p>
									<p class=""><span class="attribute-name">Date </span>${incident.Time}</p>
								</div>
								<div class="attribute-group">
									<p class=""><span class="attribute-name">Fine </span>£${incident.Amount}</p>
									<p class=""><span class="attribute-name">Statement </span>${incident.OfficerStatement}</p>
								</div>
							</div>
						</div>
					</div>`;
}
