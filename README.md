# Calibre_app
This is the repository for the development of the on-device application of Calibre. 
It follows the specified MVP guidelines which incl. the features Discover People, Meetup map and Messages
 
The testing of the application is being done using Expo Go 

React Native illustrations - Codecademy 


# The Expo development environment
<img width="737" alt="Expo Go" src="https://user-images.githubusercontent.com/44964494/148650659-5fc72322-a60b-4030-bb18-e776ce34e12f.png">
<img width="759" alt="Macaron" src="https://user-images.githubusercontent.com/44964494/148650679-db2f8550-14e2-43a6-96cf-1b8a9f8b7985.png">


## Native Rendering
<img width="866" alt="React Native" src="https://user-images.githubusercontent.com/44964494/148650684-fb8f261c-4f48-4993-80b7-173522f37c62.png">

In our previous example, we used the <Text> component to render text. There are a few other components like <Text> which ship with React Native; we call these core components. React Native knows how to render these on a specific platform because they are tied to a native component counterpart.

By creating components and rendering them, you tell React Native what to render. The JavaScript with the components is bundled in your app and executed in a separate thread from the native UI. This JS thread instructs React Native what it needs to render. Splitting this into a JS thread and a UI thread allows the platform to understand what needs to be rendered without blocking the actual interface components.

To visualize these two threads, consider a highway with only a single lane for traffic. With both slow and fast traffic combined on this lane, some traffic might slow down others. Adding another lane allows the faster traffic to run independently of the slower traffic. While JS isn’t necessarily slow traffic, it can still block the UI thread and cause stuttering in visible animations.

Besides the visible UI components, the native UI thread is also handling native API requests. Some functionality, like GPS location, needs to be requested from the native APIs. If your JS code uses this kind of functionality, it interacts with the native API using native code. The data from this native code is sent back to the JS code and handled in your app.

## Cross-Platform Differences
<img width="628" alt="Android" src="https://user-images.githubusercontent.com/44964494/148650691-94005ddc-1a9d-4839-90d3-ecdf22eb7992.png">

A lot of Expo and React Native code can be reused across multiple native platforms, but there are some differences you should be aware of. Native components may look different because of the platform-provided design guidelines. On iOS, Apple implemented their Human Interface guidelines while Android provides their Material Design guidelines. Some of the core components might look different on other platforms because of this.

## Arugments for using Expo React Native? 
<img width="674" alt="Screenshot 2021-12-11 at 16 17 39" src="https://user-images.githubusercontent.com/44964494/148650713-d44b053b-3229-41cd-85f2-54071cf4abc5.png">


Expo and React Native provide a comprehensive framework with a big community. There are thousands of prebuilt packages that you can use directly in your app. Just like every other framework, Expo and React Native aren’t a silver bullet solution.

For most apps, Expo and React Native are a good choice:

* Apps built with Expo or React Native can run on multiple platforms. That means faster development and less code to maintain while sharing most of the code.
* It provides direct access to native functionality, allowing developers to make the app as performant as pure native apps.
* Getting started with Expo and React Native only requires basic web development and basic native platform understanding.

Big companies like Bloomberg, Shopify, and Coinbase are using React Native for their mobile apps. Coinbase started with native and moved to React Native with great success. You can find more companies listed in the React Native documentation!

In some areas, React Native doesn’t do well:

* Pure native apps have a higher performance ceiling compared to Expo and React Native apps.
* Expo and React Native are abstractions on top of the native platform. They need to follow the latest changes and functionality from the native platforms.
* Complex apps often require you to optimize and customize native code— that requires a good understanding of every platform you need to support.

Airbnb is one company that started with React Native but later switched to a different toolset.


What is a core component?
￼
You can import these components from the react-native package. In the previous lesson, we already imported the View and Text core components. During this lesson, we will dig deeper in View, Text, Image, Button, TextInput, and ScrollView. These components are essential for every Expo and React Native apps.

