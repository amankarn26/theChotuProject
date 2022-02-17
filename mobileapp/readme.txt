This project is for mobile app development.


Password : chotuapp


——> ionic cordova build android --prod --release


—>copy build APK into main project folder and sign it
—>also copy signing keystore file on same folder

OR 
-> cp platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk .


——> jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore aai.keystore app-release-unsigned.apk aai
——> pass: chotuapp


——> /usr/local/Caskroom/android-sdk/4333796/build-tools/29.0.2/zipalign -v 4 app-release-unsigned.apk AAI.apk