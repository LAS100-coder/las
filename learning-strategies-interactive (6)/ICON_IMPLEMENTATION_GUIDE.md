# App Icon Implementation Guide

## Overview
This guide explains how to implement the Learning Anything Strat app icon using the provided scientist character image.

## Required Icon Files
The following placeholder files have been created and need to be replaced with the actual icon:

### 1. Main App Icon
- **File**: `assets/images/icon.png`
- **Size**: 1024x1024px (will be automatically resized by Expo)
- **Format**: PNG with transparency
- **Purpose**: Primary app icon for all platforms

### 2. Android Adaptive Icon
- **File**: `assets/images/adaptive-icon.png`
- **Size**: 1024x1024px
- **Format**: PNG with transparency
- **Purpose**: Android adaptive icon foreground
- **Note**: Should be the icon without background (foreground only)

### 3. Web Favicon
- **File**: `assets/images/favicon.png`
- **Size**: 48x48px or 32x32px
- **Format**: PNG
- **Purpose**: Web browser favicon

### 4. Splash Screen Icon
- **File**: `assets/images/splash-icon.png`
- **Size**: 200x200px (as configured in app.json)
- **Format**: PNG with transparency
- **Purpose**: Icon shown on splash screen

## Implementation Steps

### Step 1: Prepare Icon Variations
Using the provided scientist character image (https://d64gsuwffb70l.cloudfront.net/685aa68419b8363c99a2810b_1750841463966_545c27ba.png):

1. **Main Icon (1024x1024)**:
   - Use the full image with rounded corners
   - Ensure proper padding (about 10% margin)
   - Save as `assets/images/icon.png`

2. **Adaptive Icon (1024x1024)**:
   - Extract just the scientist character (foreground)
   - Remove or make transparent the gradient background
   - Center the character with adequate padding
   - Save as `assets/images/adaptive-icon.png`

3. **Favicon (48x48)**:
   - Resize the main icon to 48x48
   - Ensure visibility at small size
   - Save as `assets/images/favicon.png`

4. **Splash Icon (200x200)**:
   - Resize maintaining aspect ratio
   - Keep transparency for clean splash screen
   - Save as `assets/images/splash-icon.png`

### Step 2: Android Guidelines Compliance
- **Rounded Corners**: Android will automatically apply rounded corners
- **Safe Area**: Keep important elements within 66% of the icon area
- **Background**: The adaptive icon uses backgroundColor: "#ffffff" from app.json

### Step 3: Testing
After replacing the placeholder files:
1. Run `expo prebuild --clean` to regenerate native files
2. Test on various Android devices/emulators
3. Verify icon appears correctly in:
   - Home screen
   - App drawer
   - Recent apps
   - Settings > Apps
   - Google Play Store (when published)

## Current Configuration
The app.json is already configured with:
- Main icon path: `./assets/images/icon.png`
- Adaptive icon foreground: `./assets/images/adaptive-icon.png`
- Adaptive icon background: `#ffffff`
- Splash screen icon: `./assets/images/splash-icon.png`
- Web favicon: `./assets/images/favicon.png`

## Next Steps
1. Replace all placeholder PNG files with actual icon variations
2. Test the app build to ensure icons display correctly
3. Submit to Google Play Store with the new icon assets

The icon will automatically appear in all required locations once the actual image files replace the placeholders.