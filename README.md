<?xml version="1.0" encoding="UTF-8"?>
<README>
    <Title>Discovery Park Map App</Title>

    <Summary>
        The aim of this application is to help university students get around the College of Engineering campus. It is intended to be used to find other resources like restrooms, vending machines, etc.
        The functionality for the app has been implemented by using Dijkstra's algorithm to find the shortest path between two nodes (rooms or resources) in a graph.
        This app will significantly reduce the first-day stress for incoming students and faculty by giving them clear directions around the building.
    </Summary>

    <Features>
        <Feature>Browsable Map</Feature>
        <Feature>Functional map</Feature>
        <Feature>Filter Bar to change filters for amenities</Feature>
        <Feature>Search Bar for room lookup</Feature>
        <Feature>Floor Toggle to change room levels</Feature>
        <Feature>Recent routes</Feature>
        <Feature>Ability to show favorite destinations</Feature>
    </Features>

    <PlatformsAndTechnologies>
        <Platform>iOS and Android</Platform>
        <DevelopmentEnvironment>React Native</DevelopmentEnvironment>
        <Database>Local</Database>
    </PlatformsAndTechnologies>

    <Scope>
        The scope of this project encompasses the development of a cross-platform mobile application (iOS and Android) for indoor navigation. 
        The app will enable users to:
        <Point>Access detailed indoor maps and floor plans</Point>
        <Point>Receive directions to desired destinations</Point>
        <Point>Explore points of interest (POIs) within the indoor area</Point>
        <Point>Search for specific locations and POIs</Point>
        <Point>Ensure user-friendly accessibility</Point>
    </Scope>

    <Requirements>
        <Requirement>The system shall allow the user to search for a destination from a list of classrooms</Requirement>
        <Requirement>The system shall offer navigation for the user from their current location to their destination</Requirement>
        <Requirement>The system shall allow users to filter and show: Bathrooms, Stairs, ATMs, Emergency Exits, and Vending Machines</Requirement>
        <Requirement>The system shall provide a uniform look and feel across the application</Requirement>
    </Requirements>

    <InstallationAndUsage>
        <Step>Clone the repository: <Command>git clone https://github.com/MichaelClark02/DiscoveryParkMapApp.git</Command></Step>
        <Step>Navigate to the project directory: <Command>cd DiscoveryParkMapApp</Command></Step>
        <Step>Install dependencies: <Command>npm install</Command></Step>
        <Step>Start the development server: <Command>npm start</Command></Step>
        <Step>Follow the instructions in the terminal to run the app on your device or emulator.</Step>
    </InstallationAndUsage>

    <Contributing>
        <Step>Fork the repository</Step>
        <Step>Create a new branch: <Command>git checkout -b feature/my-new-feature</Command></Step>
        <Step>Make your changes and commit them: <Command>git commit -am 'Add some feature'</Command></Step>
        <Step>Push to the branch: <Command>git push origin feature/my-new-feature</Command></Step>
        <Step>Submit a pull request</Step>
    </Contributing>

    <FutureImprovements>
        <Improvement>Mapping more wings of Discovery Park</Improvement>
        <Improvement>Expanding on directions with common navigation application features (voice over directions, showing next steps at the top of the screen, etc.)</Improvement>
    </FutureImprovements>

    <LessonsLearned>
        <Lesson>How to utilize the Agile methodology in order to develop quickly</Lesson>
        <Lesson>The workflow for mobile app development</Lesson>
        <Lesson>Usability and UI Design</Lesson>
    </LessonsLearned>

    <Images>
        <LogoImage>logo.png</LogoImage>
        <PlatformImage>platforms.png</PlatformImage>
        <ScopeImage>scope_diagram.png</ScopeImage>
    </Images>

</README>
