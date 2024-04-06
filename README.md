# COMP1004 Coursework 2

A front-end interface that queries a supabase backend.

## README Requirements

1. The URL to the GitHub Page where the front end is hosted
   - [ben-bromley.github.io/UON-COMP1004-Coursework-2](https://ben-bromley.github.io/UON-COMP1004-Coursework-2/)
   - This is the version that will be used for marking, so please make sure it is working.
     Please do not make any further changes after the submission, otherwise it will be considered
     as late submission (using the last commit date/time).
2. A description of the additional work for HTML, CSS, JavaScript, and/or database. Please see the marking rubrics below for the details about additional work (to achieve full mark
   for each criteria). Please describe separately for each aspect, i.e., HTML/CSS/JavaScript/database, what the additional work is, and where they are (file name and line number)

   - Please say so in this document if you don't attempt any of these.
   - Only the work described will be considered for mark.

## Criteria

#### Criteria - HTML

| Requirement                                                                                                                       | Complete | Hash                                                                                                                | Description |
| --------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1. There are at least three HTML pages, one for each database query/update.                                                       | ✅       | [0244b15](https://github.com/Ben-Bromley/UON-COMP1004-Coursework-2/commit/0244b1591f2bf4034d1aaa63a3df8ba44092281a) |             |
| 2. The files are named correctly.                                                                                                 |          |                                                                                                                     |             |
| 3. The page meta information is included and correct.                                                                             |          |                                                                                                                     |             |
| 4. The heading and text elements are used correctly.                                                                              |          |                                                                                                                     |             |
| 5. All the pages have the same navigation menu and the links works correctly.                                                     |          |                                                                                                                     |             |
| 6. Each page should have four sections: header, main, sidebar, and footer. These are marked up correctly using semantic elements. |          |                                                                                                                     |             |
| 7. There is at least one image or video for each page and all the required information is present and correct.                    |          |                                                                                                                     |             |

#### Criteria - CSS

| Requirement                                                                                                                                    | Complete | Hash | Description |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---- | ----------- |
| 1. All the pages should share the same external CSS file. Justifications are provided (as code comment) for internal or inline CSS formatting. |          |      |             |
| 2. Class is used to selectively style some elements.                                                                                           |          |      |             |
| 3. Location selector is used to selectively style some elements.                                                                               |          |      |             |
| 4. Element border, margin, and padding are changed to improve the style.                                                                       |          |      |             |
| 5. CSS Flex or Grid are used to layout the page                                                                                                |          |      |             |
| 5a. The header should be at the top of a page                                                                                                  |          |      |             |
| 5b. The side bar should be on the left or right of the main content                                                                            |          |      |             |
| 5c. The footer should be at the bottom of a page.                                                                                              |          |      |             |

#### Criteria - JavaScript and database

| Requirement                                                                                                                                                                                                                                                                                                                                                                 | Complete | Commit                                                                                                              | Description                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. The user should be able to look up people by their names or their driving licence number (by typing either of these in to the system). If the person is not in the system it should give an appropriate message.                                                                                                                                                         | ✅       | [2fc586d](https://github.com/Ben-Bromley/UON-COMP1004-Coursework-2/commit/2fc586d900807f11b5b12606829d44175c753e9a) | Using `getElementById` and `addEventListener` I've extracted the value from the text input when the form is submitted for us in the supabase JavaScript client                                                                                                                                                                                                   |
| 1a. This search should not be case sensitive and it should work on partial names, e.g., “John”, “Smith” and “John Smith” would all find John Smith. If there are several people with the same name they should all be listed.                                                                                                                                               | ✅       | [a77ddb5](https://github.com/Ben-Bromley/UON-COMP1004-Coursework-2/commit/a77ddb518b45a11f8dbb24a2b105b3e9af1020d0) | I've used the `ilike` method from supabase in order to do a case-insensitive search on both full and partial matches                                                                                                                                                                                                                                             |
| 2. The user should be able to look up vehicle registration (plate) number. The system will then show details of the car (e.g., type, colour etc.), the ownerʼs name and license number. Allow for missing data in the system (e.g., the vehicle might not be in the system, or the vehicle might be in the system but the owner might be unknown).                          | ✅       | [43dcfc6](https://github.com/Ben-Bromley/UON-COMP1004-Coursework-2/commit/43dcfc69ffba97119ff383363cc5c704f65e0315) | I validate an input form using maxlength, minlength, required etc (see [972a29e](https://github.com/Ben-Bromley/UON-COMP1004-Coursework-2/commit/972a29e00a9c3e8dd30171da2b058122eb648bdd)). Using a similar method to requirement 1, I handle the form submission, and use the data to query supabase via the JS API                                            |
| 3. The user should be able to enter details for a new vehicle. This will include the registration (plate) number, make, model and colour of the vehicle, as well as its owner. If the owner is already in the database, then it should be a matter of selecting that person and assigning them to the new vehicle. If the owner is not in the database they should be added | ✅       | [6a17bef](https://github.com/Ben-Bromley/UON-COMP1004-Coursework-2/commit/6a17befbbab8c9d553eedc6d6bcdb78ea4e1598c) | I've created a bespoke function called `findOrCreateOwner` which accepts a name, and returns a `People` object with a `PersonID` that can be stored alongside the vehicle information, which I'm accessing as properties of `e.target` before submitting via the supabase JS API                                                                                 |
| 3a. (along with personal information including the license number).                                                                                                                                                                                                                                                                                                         |          |                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                  |
| 4. (Only required for the full mark) The user should be able to file a report for an incident                                                                                                                                                                                                                                                                               |          |                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                  |
| 4a. The user should be able to file a report for an incident and retrieve existing reports (e.g., via a search)                                                                                                                                                                                                                                                             | ✅       | [30f19bb](https://github.com/Ben-Bromley/UON-COMP1004-Coursework-2/commit/30f19bbc01a19e57aa39c4fe3aa1b6f9820a6295) | Using a similar function to earlier requirements, I've retrieved the value of the text input, and passed it into a function which does an ilike query of the `Fines` table. It returns an array of objects which I then display in the results section                                                                                                           |
| 4b. Filing new ones will involve submitting a textual statement, recording the time of the incident and the vehicle and person involved. If either the person or the vehicle are new to the system, then appropriate new entry/entries to the database should be added. An user should be able to record the offence from a list of offences contained in the database.     |          |                                                                                                                     | I've created a function that retrieves existing vehicles and people from the database and allows the user to select them as the vehicle/person in the incident, it disables the relevant fields and fills in the data on the users behalf ([99505a1](https://github.com/Ben-Bromley/UON-COMP1004-Coursework-2/commit/99505a152c399214b3a28be6dedba117943d1303)). I then implemented the same logic for the list of offences ([9b2f40d](https://github.com/Ben-Bromley/UON-COMP1004-Coursework-2/commit/9b2f40d378b457ac80d39afe7cf27cbf64dd8c94)). |

### Other TODOs

---

- Add "labels" to inputs? ✅
- use CSS grid in places? ✅
- when creating a new vehicle record, if the owner already exists, should that match up be made on the backend ✅
- validate forms (required, regex etc) ✅
  - Are we writing our own regex to validate license plates via the "pattern" HTML attribute and even on the backend?
- fix gh-pages links (404s due to subdir) ✅
- show messages on screen when form submission is complete ✅
- allow users to search for a vehicle owner when submitting a new vehicle
  - if not, they can fill in the info themselves
- create a functioning toggling navbar?
- embellish requirement descriptions (ie talk about form validation and stuff)
- setup rls / db security?
- stop manually setting `.innerHTML`
- check that there isn't a firstOrCreate method in the supabase JS API that I could use
- convert search results into a table
- validate the PersonIDs and VehicleIDs from the selects?
