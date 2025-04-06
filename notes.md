# Time Heist - Multiplayer Game Project

## Overview

**Time Heist** is a multiplayer game where players collaborate to hack a digital vault by stopping a synchronized timer at specific "time windows." One player (the leader) controls when the timer starts and stops, and the timer is synchronized across all devices in the game session.

## Core Game Concept

- Players aim to hit precise time windows displayed on the timer, with a "HACK" button to press at the right moment.
- Points are awarded based on how close players are to hitting the time window.
- Players take on different roles, such as:
  - **Leader**: Controls the timer, starts, and stops the game.
  - **Lookout**: Can see upcoming time windows ahead of other players.
  - **Technician**: Can slow down the timer for a brief period to help with timing accuracy.
  - **Safecracker**: Gets bonus points for hitting the exact time window.

## Gameplay

1. The leader starts the round by pressing a **START** button, which begins the synchronized timer across all players' devices.
2. Time windows appear as target times (e.g., "00:12.45").
3. Players must press the **HACK** button at the exact moment the timer reaches one of the time windows.
4. The round ends when the leader presses **STOP**.
5. Players can use earned points to unlock abilities or advantages in subsequent rounds.

## Pages/Features

Here are the primary pages for the app:

### 1. Login/Join Page

- Players can input their username and game room code.
- Options to create or join a game room.
- Brief visual introduction to the concept of Time Heist.

### 2. Lobby Page

- Displays list of connected players.
- Role selection interface.
- "Ready" button for players to signal they’re ready to start.
- Leader controls to start the game and adjust game settings.

### 3. Main Game Page

- **Timer display** (synchronized across devices).
- **HACK button** for timing actions.
- **Start/Stop buttons** (visible only to the leader).
- **Special ability controls** for the roles.
- Points and success/failure feedback on actions.

### 4. Results/Scoreboard Page

- Displays individual player scores, team performance, and specific stats (e.g., windows hit/missed).
- Players can view rewards for their performance and purchase abilities with points.

### 5. Profile Page

- Displays player's avatar, username, and overall stats (e.g., games played, accuracy %, roles played most, wins).
- Points balance is prominently displayed at the top with an animated shimmer or neon glow.
- Tabbed or segmented control for switching between:
  - **Stats**: Breakdown of performance across games and roles.
  - **Abilities**: View and purchase unlocked abilities using points.
  - **Achievements**: Unlockable badges and milestones with visual flair.
- Visual style should feel futuristic and high-tech — using neon accents (cyan/purple), glowing borders, and radial gradients.
- Avatar can be clicked to open a modal for customization (selecting from preset characters or uploading custom images in the future).
- Includes a “Log Out” or “Change Username” button with a low-emphasis outline style.

### 6. Tutorial Page

- A step-by-step guide to the game rules and mechanics, including explanations of the roles and how to succeed in the game.

### 7. Home Page

- Options for creating a room, joining a room or viewing your profile page

## Color Palette

- **Primary**: Cyan Blue (#0AFFFF)
- **Secondary**: Electric Purple (#8A2BE2)
- **Background**: Deep Navy (#121A2B)
- **Success**: Neon Green (#39FF14)
- **Error**: Crimson Red (#DC143C)
- **Text**: Light Gray (#E0E0E0)

## Key Technical Challenges

- **Timer Synchronization**: Ensuring that the timer is precisely synchronized across multiple devices so that when a player hits a
