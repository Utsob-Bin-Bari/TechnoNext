# Commit 1: Initial Commit
* react-native-screens dependency added and used to optimise screen loading by keeping the screen stack on native catch of android and ios.

# Commit 2: Structure creating for Architectural Design Pattern (Layered) and enabling Hermes Engine.
* Selected Architectural Pattern: Layered Architecture 
Reason: Although MVVC is more popular as Frontend Architectural Pattarn, I used Layerd Architecture because of seperation of concern, Scalability and Testability.
* Hermes & New Architecture (React Native) enabled from Podfile and gradle.properties

# Commit 3: Create dummy screens and implement navigation Between the Screen.
* @react-navigation/bottoms-tabs and it's depenency packages are added and implemented
* All screens needed for phase 1 and phase 2 are created and mapped according to navigation

# Commit 4: Add Logo to the project with react-native-svg.
* react-native-svg package is added for adding icon and logo directly from figma design. It's give us freedom to use any icon from any design. react-native-vector-icons restricts us to use only available icons.

# Commit 5: Update footer (tab navigation bar) with svg icons.
* Select svgs for tab icon and implement it on tab bar.


# Commit 6: Create Resuable Button and TextInput for Login Page.
* Design a Button match with logo and design which is reusable.
* Created GlobalStyle to reuse the styles from other page instead of creating them again and agiain.

# Commit 7: Change the gitIgnore to not upload build specific file of android and ios.
* AI Generated Code for git ignore of React Native added.
* Cause If I upload the build file again and again tester will have to build ios and android on every version of my code due to diffrence on the devices.

# Commit 8: Design Login Page (Keep in mind for portail and landscape mode).
* Assemble all the component on login page.
* Keep landscape mode in mind while designing. I use width as percentage so the field will extend when on landscape mode and keep the screen in scrollview so if anything goes outside of height we can scroll it in.

# Commit 9: Use RTK Qurry, Redux and async-storage for fetching and Storing the data and showing on Diffrent Screen.
* On Successfull login request it will store data on redux and locally so that it can bypass login if user login once.
* Added a logout button to clear both redux and local store for login with another credential. 
* Action, Store and Reducer is designed according to the response of RTK query.
* Home Page fetching data on mount and pull down to refresh option is added. 
* On pressing the product it will take to product details page.

# Commit 10: Update redux, action to keep favourite list and show them on Favourite Page
* Crated reducer, action to keep favourite list and add or remove one product from favourite list. 
* Favourite Page is showing only those product which in favourite list.
* Note: Favourite List is on redux so if we restart favourite list will be empty again.