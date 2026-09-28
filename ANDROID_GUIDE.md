# 📱 AgriShare Android Application Guide
### Smart India Hackathon (SIH 2026) | Native Android APK & Source Documentation

> **Package ID:** `in.agrishare.app`  
> **App Name:** AgriShare  
> **Compiled APK:** `AgriShare-SIH-2026.apk` (4.53 MB)  
> **Native Project Path:** `frontend/android/`  
> **Target SDK:** Android 36 (Android 16 / 15 / 14 / 13+ compatible, Min SDK 24 / Android 7.0+)

---

## ⚡ 1. Ready-to-Install APK File
The compiled, standalone Android debug APK has been placed directly in your project root:

```
c:\antigravity project\SIH project\AgriShare-SIH-2026.apk
```

### How to Install on Any Physical Android Phone:
1. **Direct Transfer:** Copy `AgriShare-SIH-2026.apk` to your phone via USB cable, Google Drive, or WhatsApp.
2. Tap the file on your phone and tap **Install** (allow *"Install from unknown sources"* if prompted).
3. The **AgriShare** app icon will appear on your home screen.

### How to Install via ADB (USB Debugging):
Connect your phone with a USB cable (with USB debugging enabled in Developer Options) and run:
```bash
adb install -r AgriShare-SIH-2026.apk
```
*(Or run `npm run install:android` from the project root)*.

---

## 🛠️ 2. How to Open & Edit in Android Studio

The complete native Android project is located at [`frontend/android`](file:///c:/antigravity%20project/SIH%20project/frontend/android):

1. Open **Android Studio** (`C:\Program Files\Android\Android Studio`).
2. Click **Open** and select the folder:
   ```
   c:\antigravity project\SIH project\frontend\android
   ```
3. Android Studio will automatically index the Gradle files, Java classes, and assets.
4. You can click the green **Run (▶)** button to launch it directly on an emulator (e.g., your pre-configured **`Pixel_8`** AVD) or connected physical device.

Alternatively, launch Android Studio directly from the terminal:
```bash
npm run open:android
```

---

## 💻 3. How to Run on Android Emulator (`Pixel_8`)

Your system already has the **`Pixel_8`** emulator installed:

1. Launch the emulator:
   ```powershell
   & "$env:USERPROFILE\AppData\AndroidCLI\android.exe" emulator start Pixel_8
   ```
2. Once the emulator boots up, install the APK:
   ```powershell
   & "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" install -r AgriShare-SIH-2026.apk
   ```
3. Launch the app inside the emulator!

---

## 🔄 4. How to Rebuild the APK After Code Changes

If you modify React components, routes, or styles in `frontend/src`:

1. Build the web bundle:
   ```bash
   npm run build --prefix frontend
   ```
2. Sync the updated assets into the native Android folder:
   ```bash
   npx cap sync android --prefix frontend
   ```
3. Compile the new APK:
   ```powershell
   $env:JAVA_HOME = "$env:LOCALAPPDATA\Programs\jdk-21\jdk-21.0.12.1+1"
   $env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
   cd frontend/android
   .\gradlew.bat assembleDebug
   ```
4. The fresh APK will be at:
   ```
   frontend/android/app/build/outputs/apk/debug/app-debug.apk
   ```

---

## 🛡️ 5. Native Device Capabilities & Permissions

The Android app is configured in [`AndroidManifest.xml`](file:///c:/antigravity%20project/SIH%20project/frontend/android/app/src/main/AndroidManifest.xml) with full native hardware integration:

- **`ACCESS_FINE_LOCATION` & `ACCESS_COARSE_LOCATION`**: Native GPS positioning for the Smart Match engine (finding tractors within 5–25 km) and driver live route tracking.
- **`CALL_PHONE`**: One-tap dialing to the 24x7 Kisan Call Center helpline (`1800-180-1551`) and equipment owners.
- **`CAMERA`**: Equipment photo capture when owners register new machinery.
- **`INTERNET`**: REST API communication with the backend.
- **Offline Resilient**: All bundled HTML, JS, Leaflet tiles, and seed data run inside the APK's local asset container, functioning smoothly even without active internet connectivity in remote farm fields.
