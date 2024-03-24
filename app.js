const client = supabase.createClient(
	"https://amfifubujyvqxfjljkaq.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZmlmdWJ1anl2cXhmamxqa2FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMDAxNzUsImV4cCI6MjAyNjc3NjE3NX0.Lb_ZhxquAbNseh1R2WylCjeT_KPC9D99Vqbf_Uz6LkI"
);

const peopleSearchForm = document.getElementById("people-search-form");
peopleSearchForm.addEventListener("submit", submitPeopleSearch);

async function submitPeopleSearch(e) {
	e.preventDefault();
	const peopleSearchInput = document.getElementById("name-search").value;
	console.log("Searching for - " + peopleSearchInput);
	const { data, error } = await client
		.from("People")
		.select()
		.eq("Name", peopleSearchInput);
	console.log("Search Result: ", data);
}
