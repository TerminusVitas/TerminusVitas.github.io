# Grim Tally: how to publish

This folder is the whole app, ready to put online. The Android app (the .apk and .aab files) gets built from the online version by the free tool PWABuilder, so there are three parts:

1. Put the app online (free, about 15 minutes)
2. Turn it into an Android app (free, about 10 minutes)
3. Publish on Google Play ($25 once, plus a 14-day test)

A computer makes Part 1 much easier than a phone.

---

## Part 1: Put the app online with GitHub Pages

1. Make a free account at **github.com**.
2. Click **+** (top right), then **New repository**.
   - Name it exactly **`YOURUSERNAME.github.io`**, using your own GitHub username. This name matters: Android needs the app to sit at the top of the web address.
   - Set it to **Public**, then click **Create repository**.
3. On the new repository page, click **uploading an existing file**.
4. Unzip this package, then drag **all the files** into the upload box. All the files are at the top level, so there are no folders to upload, apart from the `.well-known` folder handled in Part 2.
   - Include the hidden `.nojekyll` file. To see it, press **Cmd + Shift + .** on a Mac. On Windows, turn on **View → Show → Hidden items** in File Explorer.
5. Click **Commit changes**.
6. Go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then click **Save**.
7. After a minute or two, your app is live at **https://YOURUSERNAME.github.io**.

**Try it:**
- **Android:** open the link in Chrome, tap **⋮**, then **Install app**.
- **iPhone:** open it in Safari, tap **Share**, then **Add to Home Screen**.
- After opening it once, it works with **no internet**.

**Before going further:** open `privacy.html`, replace `[your email address]` with a contact email, and upload it again. Google Play requires a privacy policy, and this one is already written for this app: it collects no data.

---

## Part 2: Build the Android app with PWABuilder

1. Go to **pwabuilder.com**, paste `https://YOURUSERNAME.github.io`, and click **Start**.
2. Click **Package For Stores**, then **Android**, then **Generate Package**. Open **All Settings** and set:
   - **Package ID:** `com.dandeco.grimtally` (it must match `.well-known/assetlinks.json`; if you change one, change both)
   - **App name:** Grim Tally: Life Counter
   - **Launcher name:** Grim Tally
   - **Start URL:** `/?store=play`. This hides the Buy Me a Coffee button inside the Play Store version, because Google Play doesn't allow outside payment or tip links in apps. Your website version keeps the button.
   - **Display mode:** Fullscreen
   - **Signing key:** Create new
3. Click **Download**. The zip contains:
   - an **`.aab`** file, which is what you upload to Google Play
   - an **`.apk`** file, for installing on your own phone to test
   - **`signing.keystore`** and **`signing-key-info.txt`**. ⚠️ **Back these up somewhere safe**, like a USB drive or cloud storage. Without them you can never update the app on Google Play.
   - an **`assetlinks.json`**
4. In your GitHub repository, click **Add file → Create new file**. For the name, type `.well-known/assetlinks.json` (typing the slash creates the folder). Open the `assetlinks.json` from PWABuilder's zip in a text editor, copy everything, paste it in, and click **Commit changes**. This proves the app and the website belong together, so the app opens without a browser address bar.
5. **Test:** copy the `.apk` to your Android phone and open it. Allow "install unknown apps" if asked, and tap **Install anyway** if Android warns about an unverified developer.

---

## Part 3: Publish on Google Play

1. Go to **play.google.com/console** and sign up for a **personal** developer account. It costs **$25 one time**, and Google will verify your ID.
2. Click **Create app**: name **Grim Tally: Life Counter**, **App**, **Free**.
3. **Store listing.** You'll need:
   - the app icon, `play-icon-512.png` from the store-assets zip
   - a **feature graphic**, 1024 × 500
   - **at least 2 phone screenshots**
   - a short and a full description
4. **App content** section:
   - **Privacy policy:** `https://YOURUSERNAME.github.io/privacy.html`
   - **Data safety:** the app collects and shares **no data**
   - **Ads:** no ads
   - Fill in the content rating questionnaire and target audience (13+ is simplest)
5. **Closed testing (required for new personal accounts):**
   - Under **Testing → Closed testing**, create a track and upload the **`.aab`**.
   - Add the Gmail addresses of **at least 12 testers**. Your playgroup works.
   - Each tester opens the opt-in link and installs the app. They need to stay opted in for **14 days in a row**.
6. After 14 days, click **Apply for production**. Google usually reviews within about a week.

### Keep the listing clear of Wizards' trademarks
- Don't use "Magic: The Gathering", "MTG", or Wizards' logos in the app name, icon, or screenshots' captions.
- Describing it as "a life counter for Commander and other card games" is fine.
- The app already shows Wizards' required Fan Content Policy notice at the bottom of its menu. Keep the app **free**.

---

## Updating the app later
- **Website / installed web app:** upload the changed files to GitHub. Also change `CACHE='gt-v2'` in `sw.js` to `gt-v3` (then `v3`, and so on) so phones pick up the new version.
- **Play Store app:** most changes come through the website automatically, because the Android app loads it. Only rebuild with PWABuilder, using the **same signing key**, if you change the name, icon or package settings.

## Apple's App Store
APK files are Android-only. The Apple App Store needs a Mac with Xcode and Apple's $99/year developer program. Until then, iPhone users can use the **Add to Home Screen** version from Part 1, which works offline too.
