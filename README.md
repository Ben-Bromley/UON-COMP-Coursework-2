# COMP1004 Coursework 2

A front-end interface that queries a supabase backend.

This project uses [http-server](https://www.npmjs.com/package/http-server) to run a local development server.
Playwright is configured to use the npm start script to automate running a dev server whilst testing.

`npm run start`

## README Requirements

   - Please do not make any further changes after the submission, otherwise it will be considered
     as late submission (using the last commit date/time).
   - A description of the additional work for HTML, CSS, JavaScript, and/or database. Please see the marking rubrics below for the details about additional work (to achieve full mark
   for each criteria). Please describe separately for each aspect, i.e., HTML/CSS/JavaScript/database, what the additional work is, and where they are (file name and line number)

   - Please say so in this document if you don't attempt any of these.
   - Only the work described will be considered for mark.

## Criteria

### Criteria - HTML

| Requirement                                                                                                                       | Complete | Hash                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. There are at least three HTML pages, one for each database query/update.                                                       | ✅       | [0244b15](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/0244b1591f2bf4034d1aaa63a3df8ba44092281a)                                                                                                                                                                                                                                                                                                                                                                                                                      | See below                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2. The files are named correctly.                                                                                                 | ✅       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `index.html` for the first page. Used for searching for people records in the system, `vehicles.html` - used for searching for vehicles in the system, and `new-vehicle.html` - used for submitting a new record for a vehicle and corresponding record if the owner is new to the system                                                                                                                                                                                                                                                                          |
| 3. The page meta information includes language, character set, and title.                                                         | ✅       | [0244b15](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/blob/0244b1591f2bf4034d1aaa63a3df8ba44092281a/new-vehicle.html#L2-L8), [43dcfc6](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/blob/43dcfc69ffba97119ff383363cc5c704f65e0315/vehicles.html#L2-L8), [2fc586d](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/blob/2fc586d900807f11b5b12606829d44175c753e9a/index.html#L2-L7), [24743df](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/24743df688ff9d2f72898a8b5d624c199269bdb2) | In the first three listed commits, I created these files with the `lang="en"` & `charset="UTF-8"` attributes, as well as a generic `<title>`. In commit [24743df](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/24743df688ff9d2f72898a8b5d624c199269bdb2) I've added more distinct, descriptive page titles                                                                                                                                                                                                                                      |
| 4. The heading and text elements are used correctly.                                                                              | ✅       | [dce47a9](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/dce47a952b080b4e9d53d08097b99e79bc6802ed)                                                                                                                                                                                                                                                                                                                                                                                                                      | Each page is given a unique heading, identifying the purpose of that page.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 5. An unordered list `<ul>` is used to create the navigation links.                                                               | ✅       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | I'm using a `<ul>` on every page to create the list of navigation links. Inside them is a list of `<li>` elements, which contain an anchor (`<a>`) element, linking to the corresponding page                                                                                                                                                                                                                                                                                                                                                                      |
| 6. All the pages have the same navigation menu and the links works correctly.                                                     | ✅       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Every page uses the same markup for the navigation, with the exception of the `active` class moving to whichever link corresponds to the current page.                                                                                                                                                                                                                                                                                                                                                                                                             |
| 7. Each page should have four sections: header, main, sidebar, and footer. These are marked up correctly using semantic elements. | ✅       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | The header markup uses `<header>`, the sidebar uses `<aside>`, the main section uses `<main>` and the footer uses `<footer>`                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 8. There is at least one image or video for each page and all the required information is present and correct.                    | ✅       | [7779086](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/77790862e1a2f58ed9db6eae10c9163a1cad398a)                                                                                                                                                                                                                                                                                                                                                                                                                      | I've used `<figure>`, `<img>`, and `<figcaption>` to add an image of traffic to my sidebar. The image is from unsplash, a site that provides free copyright license of all their images, meaning they can be used for both non-commercial and commercial purposes without need for attribution. However, in order to fairly accredit the photographer, and ensure any work not produced by me is referenced correctly, I have included the recomended attribution in the figure caption. [Read more](https://unsplash.com/license) about Unsplash photo licensing. |

### Criteria - CSS

| Requirement                                                                                                                                                                                                                                                                                                                                                                                        | Complete | Hash                                                                                                                                                                                      | Description                                                                                                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. All the pages should share the same external CSS file. Justifications are provided (as code comment) for internal or inline CSS formatting.                                                                                                                                                                                                                                                     | ✅       |                                                                                                                                                                                           | All pages use the same style.css file. All styling is done via this file. Default user agent styles may still be present, but some have been overridden, such as margin on header elements, and the list styling of the `<ul>` navigation                                                                             |
| 2. CSS flex is used to place the navigation links horizontally. Class is used to apply CSS flex to the navigation links only and not other `<ul>` element. The links should use all the horizontal space.                                                                                                                                                                                          | ✅       | [d7a2882](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/d7a2882235310ce26a1923586b7ca62cfcb34032#diff-b78be019f1dc6d57753ea900c3805b114cd53ab7c0db836cc081836df1b99b7a) | I've added `display: flex;` to `header nav {}` to arrange the links horizontally. I've used `header nav ul li {}` to add some margin / spacing to the links. Other styles are also included                                                                                                                           |
| 3. Location selector is used to remove the bullet in front of the navigation links. Class or ID is not allowed for this. This should only remove the bullets from the navigation links and not any other unordered list items.                                                                                                                                                                     | ✅       | [d7a2882](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/d7a2882235310ce26a1923586b7ca62cfcb34032#diff-b78be019f1dc6d57753ea900c3805b114cd53ab7c0db836cc081836df1b99b7a) | I've used the location selector `header nav ul li {}` to remove the default list bullets from the navigation links alone                                                                                                                                                                                              |
| 4. Add border, margin, and padding to header, main, sidebar, and footer.                                                                                                                                                                                                                                                                                                                           | ✅       | [9006c15](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/9006c156e3ee0491fa84ff4f0ef6b6b12a2cb03f)                                                                       | I've added some margin, border, and padding to all 4 of the main sections. The sidebar and main section have the same double border style, whilst the header and footer share the same dotted border style. All borders use the complementary colours from my CSS variables which are declared at the top of the file |
| <span>5. Use CSS Grid to layout the page (see the figure below): <ul><li>The header should be at the top of a page, occupying the fully width;</li><li>The side bar should be on the left of the main content; </li><li>The width ratio between the side bar and the main content should be 1:4.</li><li>The footer should be at the bottom of a page, occupying the fully width.</li></ul></span> | ✅       | [f45decd](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/blob/f45decd2330c3726752548e3df2ef96550919676/style.css#L30-L52)                                                       | I elected to use `grid-template-rows`, `grid-template-columns`,`grid-template-areas`, and `grid-area` to clearly set out the layout for all pages                                                                                                                                                                     |

### Criteria - JavaScript and database

| Requirement                                                                                                                                                                                                                                                                                                                                                                 | Complete | Commit                                                                                                                                                                                                                                                                                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. The user should be able to look up people by their names or their driving licence number (by typing either of these in to the system). If the person is not in the system it should give an appropriate message.                                                                                                                                                         | ✅       | [2fc586d](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/2fc586d900807f11b5b12606829d44175c753e9a), [af4b282](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/af4b2829e9a1559ccb8f1666a038571c418e93b7)                                                                                                                      | Using `getElementById` and `addEventListener` I've extracted the value from the text input when the form is submitted for us in the supabase JavaScript client. The second commit listed added a change which used the `.or()` method from the supabase API so it can also query the LicenserNumber field, meaning that the user can enter either a name, or a registration when searching for people.                                                                                                                                                                                                                                                                                                             |
| 1a. This search should not be case sensitive and it should work on partial names, e.g., “John”, “Smith” and “John Smith” would all find John Smith. If there are several people with the same name they should all be listed.                                                                                                                                               | ✅       | [a77ddb5](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/a77ddb518b45a11f8dbb24a2b105b3e9af1020d0)                                                                                                                                                                                                                                           | I've used the `ilike` method from supabase in order to do a case-insensitive search on both full and partial matches                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2. The user should be able to look up vehicle registration (plate) number. The system will then show details of the car (e.g., type, colour etc.), the ownerʼs name and license number. Allow for missing data in the system (e.g., the vehicle might not be in the system, or the vehicle might be in the system but the owner might be unknown).                          | ✅       | [43dcfc6](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/43dcfc69ffba97119ff383363cc5c704f65e0315)                                                                                                                                                                                                                                           | I validate an input form using maxlength, minlength, required etc (see [972a29e](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/972a29e00a9c3e8dd30171da2b058122eb648bdd)). Using a similar method to requirement 1, I handle the form submission, and use the data to query supabase via the JS API                                                                                                                                                                                                                                                                                                                                                                                              |
| 3. The user should be able to enter details for a new vehicle. This will include the registration (plate) number, make, model and colour of the vehicle, as well as its owner. If the owner is already in the database, then it should be a matter of selecting that person and assigning them to the new vehicle. If the owner is not in the database they should be added | ✅       | [6a17bef](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/6a17befbbab8c9d553eedc6d6bcdb78ea4e1598c)                                                                                                                                                                                                                                           | I've created a bespoke function called `findOrCreateOwner` which accepts a name, and returns a `People` object with a `PersonID` that can be stored alongside the vehicle information, which I'm accessing as properties of `e.target` before submitting via the supabase JS API                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 3a. (along with personal information including the license number).                                                                                                                                                                                                                                                                                                         | ✅       | [4936c59](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/4936c594f745954811eaac18e40ad6f58997a466), [0e4dce3](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/0e4dce359c8e72b2aa805c339d6f01bca839e1fa), [8d6743c](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/8d6743cb92e005be2bcee3e89d938b6371932874) | I've built a `<select>` input that gives the user a list of existing people to choose from. If they select a person, then all the inputs for the owners attributes will be prefilled with the existing data and the inputs disabled (this is just intended to show the user that they don't need to input the remaining data manually). When handling the form submission, if the user has selected a person, it will retrieve the People record using the `getPersonByID` helper method. If the user has selected "new person" then the remaining person attribute inputs will be required to be filled in. That data is passed to `createPerson` and will then be inserted into a new record in the People table |


## Additional Work

 - Made design more responsive [caff049](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/caff049b384359293f8e815651fb594bf9450914)
   - adjusting the grid to display flex, in a column so the page appears header, aside, main, footer.
   - tweaked some spacing and sizing to make everything fit on smaller screens - [0670c71](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/0670c7132b52c6ab78c22542fb2a5938173d87b1)
 - Accessibility score of 100
   - Updated text colours and add a new alternate text colour to ensure good contrast [53f52f3](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/commit/53f52f333b105c1fbe1fd8d387654c97a98b35de)


<img width="640" alt="image" src="https://github.com/Ben-Bromley/UON-COMP-Coursework-2/assets/74667456/eab439a9-73c3-472d-a650-f0236a34d810">
<img width="640" alt="image" src="https://github.com/Ben-Bromley/UON-COMP-Coursework-2/assets/74667456/136e30c6-226d-43b9-ac90-89a6bf33faad">
<img width="640" alt="image" src="https://github.com/Ben-Bromley/UON-COMP-Coursework-2/assets/74667456/127d78d9-8b92-4fe2-abba-d671ecb9fe5b">





## Playwright Testing issues

- Common issue where `.fill()` method is timing out despite the target element being present and accessible. Occurring on [GitHub action runs](https://github.com/Ben-Bromley/UON-COMP-Coursework-2/actions/runs/8960176331/job/24606395376) and locally
