# Asteroid-Tracker-Notifier

<h3>Introduction:</h3>
According to United Nations Office for Outer Space Affairs (unoosa.org/ ), “Near-Earth Objects, or NEOs, represent
potentially catastrophic threats to our planet. A near-Earth object is an asteroid or comet which passes close to
the Earth’s orbit.” Researchers in astronomy and space objects observers have to study and research on near earth
objects (NEOs) which are approaching earth. Therefore, it is hard for them to constantly go through the raw data
on the website which NASA’s NEOWs (Near Earth Object Web Service) API is providing. In order to solve this
problem, I will be developing a mobile application using NASA’s NEOWs API [API Link] where user can view NEOs
closest approach date, speed and diameter and allow them to set a email notification by closest approach time which
will help astronomy community and it’s fan to get this data in a easy way.

<h3>Approach:</h3>
I have solved this problem by creating a mobile application which can work on both platforms i.e. iOS and Android.
I have used the following software architecture: <br>
<ul>
  <li>React Native</li>
  <li>Node.js</li>
  <li>Javascript</li>
  <li>Firebase</li>
  <li>Expo</li>
</ul>


<h3>Implementation:</h3>
Asteroid Tracker application allows user to display all the (today’s) Near Earth Objects (NEO) by default in a small
view on the front page. The small view of each NEO consists of its:
• name
• time
• hazardous-ness
• Event Timer

image

When one of the NEO is clicked by tapping once it open it’s own page where it shows information about that NEO
in more detail. Details include Absolute magnitude, maximum estimated diameter, minimum estimated diameter,
hazardous-ness, closest approach date, speed, miss distance from Earth and the orbiting body. This page also has
an asteroid image (taken from https://www.pngaaa.com/detail/849234 ) which is used for every NEO which means
it is not the actual image of the asteroid. It gives dynamic look by randomly rotating the image by 360 degree when
this page of each NEO loads.


At this stage, the application also can sort the data by the following:
• Miss Distance (Closest first)
• Time
• Hazardous (shows objects with true hazardous attribute)

At this stage, the user can also select the date and retrieve the data. 

image 


User can also click on the ’three lines’ located on the top left corner of the front page to open the navigation drawer
in order to find more options. The navigation drawer consists of two pages - (i) Home and (ii) Settings. Settings screen
has an area for user to add email address and saving the changed settings. After user saves the updated email address,
it saves to phone’s local storage with the help of Async-Storage (https://react-native-async-storage.github.io/).


image 



<h3>Conclusion:</h3>
The final product is allowing the users to view all the NEOs name, closest approach date, speed, diameter and set a
email reminder for closest approach time.


<h3>Citations:</h3>
• https://www.android.com/intl/en_ca/ </br>
• https://www.apple.com/ca/ios/ios-15/</br>
• https://www.unoosa.org/oosa/en/ourwork/topics/neos/index.html</br>
• https://api.nasa.gov/</br>
• https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY</br>
• https://theskylive.com/near-earth-objects</br>
• https://reactnative.dev/</br>
• https://nodejs.org/en/</br>
• https://www.javascript.com/</br>
• https://firebase.google.com/</br>
• https://expo.dev/</br>
• https://developer.mozilla.org/en-US/docs/Web/API/fetch</br>
• https://www.microsoft.com/en-ca/windows</br>
• https://github.com/wix/react-native-navigation</br>
• https://react-native-async-storage.github.io</br>
• https://www.hihonor.com/global/emui/
