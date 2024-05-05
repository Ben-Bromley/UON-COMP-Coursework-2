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
	const peopleSearchInput = e.target["name"].value;
	const peopleResults = document.getElementById("results");
	const messageElement = document.getElementById("message");
	peopleResults.innerHTML = "";
	messageElement.innerHTML = "<p>Loading...</p>";
	const { data, error } = await client
		.from("People")
		.select()
		.or(
			`Name.ilike.%${peopleSearchInput}%, LicenseNumber.ilike.%${peopleSearchInput}%`
		);

	if (!data?.length > 0) {
		messageElement.innerHTML = "<p>Person not found</p>";
		return;
	}

	messageElement.innerHTML = "<p>Search successful</p>";
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
						<span class="result-card-content">
							<h3 class="result-card-title">${person.Name}</h3>
							<span class="result-attributes">
								<span class="attribute-group">
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
								</span>
								<span class="attribute-group">
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
								</span>
							</span>
						</span>
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
	const vehicleSearchInput = e.target["rego"].value;
	const vehicleResults = document.getElementById("results");
	const vehicleMessage = document.getElementById("message");
	vehicleResults.innerHTML = "";
	vehicleMessage.innerHTML = "<p>Loading...</p>";
	const { data, error } = await client
		.from("Vehicles")
		.select(
			`
				VehicleID,
				Make,
				Model,
				Colour,
				OwnerID,
				People (
					Name
				)
			`
		)
		.ilike("VehicleID", `%${vehicleSearchInput}%`);

	if (!data?.length > 0) {
		vehicleMessage.innerHTML = "<p>Vehicle not found</p>";
		return;
	}

	vehicleMessage.innerHTML = "<p>Search successful</p>";

	const missingOwners = data
		.map((vehicle) => {
			return !vehicle.OwnerID ? vehicle.VehicleID : null;
		})
		.filter((o) => o)
		.join(", ");

	if (missingOwners) {
		vehicleMessage.innerHTML += `<p>No owner found for vehicles: ${missingOwners}</p>`;
	}

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
						<span class="result-card-content">
							<h3 class="result-card-title">${vehicle.VehicleID}</h3>
							<span class="result-attributes">
								<span class="attribute-group">
									<p><span class="attribute-name">Car: </span>${vehicle.Colour} ${vehicle.Make} ${
		vehicle.Model
	}</p>
									<p class="${
										!vehicle.People?.Name ? "attribute-missing" : ""
									}"><span class="attribute-name">Owner: </span>${
		vehicle.People?.Name ?? "missing"
	}</p>
								</span>
							</span>
						</span>
					</div>`;
}

// --- NEW VEHICLE ---

const newVehicleForm = document.getElementById("new-vehicle-form");
newVehicleForm?.addEventListener("submit", submitNewVehicle);
const newVehicleMessage = document.getElementById("message");
const newVehicleOwnerDetailsForm =
	document.getElementById("vehicle-owner-form");
newVehicleOwnerDetailsForm?.addEventListener("submit", submitVehicleOwner);

async function submitNewVehicle(e) {
	e.preventDefault();
	// get owner
	const vehicleOwner = await getPersonByName(
		e.target["vehicle-owner-name"].value
	);
	console.log(vehicleOwner);
	const newVehicle = {
		VehicleID: e.target["vehicle-registration"].value,
		Make: e.target["vehicle-make"].value,
		Model: e.target["vehicle-model"].value,
		Colour: e.target["vehicle-colour"].value,
	};

	if (vehicleOwner) newVehicle.OwnerID = vehicleOwner.PersonID;

	console.log("adding vehicle record");
	const { error } = await client.from("Vehicles").insert(newVehicle);
	if (error) {
		newVehicleMessage.innerHTML = "<p>Error submitting vehicle.</p>";
		return;
	}

	if (!vehicleOwner) {
		// if owner isn't found in database, disable this form and display the owner details form
		newVehicleMessage.innerHTML +=
			"<p>Vehicle Saved. Owner not found in datbase. Please add their details</p>";
		// disable vehicle form and display owner info form
		document.getElementById("new-vehicle-submit-btn").disabled = true;
		e.target["vehicle-registration"].disabled = true;
		e.target["vehicle-make"].disabled = true;
		e.target["vehicle-model"].disabled = true;
		e.target["vehicle-colour"].disabled = true;
		e.target["vehicle-owner-name"].disabled = true;
		newVehicleOwnerDetailsForm.classList.remove("hidden");
	} else {
		newVehicleMessage.innerHTML = "<p>Vehicle added successfully</p>";
	}
}

async function submitVehicleOwner(e) {
	e.preventDefault();
	// create owner
	console.log("creating new person record");
	const vehicleOwner = await findOrCreatePerson(
		e.target["vehicle-owner-id"].value,
		e.target["vehicle-owner-name"].value,
		e.target["vehicle-owner-dob"].value,
		e.target["vehicle-owner-address"].value,
		e.target["vehicle-owner-expirydate"].value,
		e.target["vehicle-owner-license"].value
	);
	console.log("person created");

	// add owner details
	console.log("adding new owner ID to vehicle record");
	const error = await addVehicleOwner(
		document.getElementById("rego").value,
		vehicleOwner.PersonID
	);
	console.log("record updated.");

	if (error) {
		newVehicleMessage.innerHTML = "<p>Error submitting vehicle owner.</p>";
	}
	newVehicleMessage.innerHTML =
		"<p>Vehicle added successfully, owner details saved.</p>";
	// set form elements to empty, so just success message displays
	newVehicleOwnerDetailsForm.innerHTML = "";
	e.target.innerHTML = "";
}

// --- HELPERS ---

/**
 * Use the given registration to retrieve a vehicle record
 * @param {string} registration
 * @returns Vehicle record
 */
async function getVehicleByRegistration(registration) {
	const { data, error } = await client
		.from("Vehicles")
		.select()
		.eq("VehicleID", registration);
	return data?.[0];
}

async function addVehicleOwner(registration, ownerID) {
	const vehicle = getVehicleByRegistration(registration);
	// update vehicle record with owner ID
	const { error } = await client
		.from("Vehicles")
		.update({ OwnerID: ownerID })
		.eq("VehicleID", registration);
	return error;
}

/**
 * Use the given ID to retrieve a person record,
 * or create a new person record using the given data
 * @param {string} personId
 * @param {string} personName
 * @param {string} personDOB
 * @param {string} personAddress
 * @param {string} personLicenseExpiry
 * @param {string} personLicense
 * @returns A People record
 */
async function findOrCreatePerson(
	personId,
	personName,
	personDOB,
	personAddress,
	personLicenseExpiry,
	personLicense
) {
	let owner = null;

	// create a new person record with the provided details
	if (!owner || !personId) {
		owner = await createPerson(
			personId,
			personName,
			personDOB,
			personAddress,
			personLicenseExpiry,
			personLicense
		);
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
 * When given a id, retrieve the corresponding People record
 * @param {string} id The ID of the person to fetch
 * @returns Person record
 */
async function getPersonByID(id) {
	const { data, error } = await client
		.from("People")
		.select()
		.eq("PersonID", id);
	return data?.[0];
}

/**
 * When provided with a name, create a new People record
 * @param {string} name
 * @returns Person object
 */
async function createPerson(
	id,
	name,
	dob = null,
	address = null,
	licenseExpiry = null,
	license = null
) {
	if (!name) {
		throw new Error("Can't create new person without a name");
	}
	const { data, error } = await client
		.from("People")
		.insert({
			PersonID: id,
			Name: name,
			DOB: dob,
			Address: address,
			ExpiryDate: licenseExpiry,
			LicenseNumber: license,
		})
		.select();
	return data?.[0];
}

/**
 * When given a list of vehicle attributes, insert a new record into the Vehicles table, with those attributes
 * @param {number} VehicleID
 * @param {string} VehicleMake
 * @param {string} VehicleModel
 * @param {string} VehicleColour
 * @returns The newly created vehicle record
 */
async function createVehicle(
	VehicleID,
	VehicleMake,
	VehicleModel,
	VehicleColour
) {
	const { data, error } = await client
		.from("Vehicles")
		.insert({
			VehicleID: VehicleID,
			Make: VehicleMake,
			Model: VehicleModel,
			Colour: VehicleColour,
		})
		.select();
	return data?.[0];
}
