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