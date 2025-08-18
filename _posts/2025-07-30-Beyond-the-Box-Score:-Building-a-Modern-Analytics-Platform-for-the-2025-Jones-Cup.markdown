
---
layout: post
title:  "Beyond the Box Score: Building a Modern Analytics Platform for the 2025 Jones Cup"
date:   2025-07-30 04:31:40 +0000
permalink: /posts/:title
categories: [Basketball]
---

#### The "Why": A Need for Deeper Insight

After getting the incredible opportunity to be the attaché for the Taiwan National A team, I knew I wanted to contribute in a unique way. As a long-time follower of the Jones Cup, I was aware of a gap: the [official stats](https://jonescup.meetagile.com/) were often limited to basic box scores. For coaches and scouts trying to gain a competitive edge, this wasn't enough. It's hard to understand a team's true strengths and weaknesses at a glance without clear visualizations and the advanced metrics that have become standard in modern basketball.

This gap became my project. I decided to create a full-stack web application dedicated to providing accessible, visualized, and insightful analytics for the tournament.

#### The "What": An Interactive Scouting Hub

The result is the [Jones Cup Basketball Analytics](https://jonescup.web.app/) website. It’s a centralized hub designed for coaches, scouts, and fans to explore the tournament's statistical landscape. The platform is built around a few core features:

* **Team Efficiency Landscape:** Instead of just seeing points and rebounds, you can immediately assess a team's strategic identity. This dashboard visualizes key advanced metrics like **Pace** (Possessions per 40 minutes), **Offensive Rating** (Points per 100 possessions), and **Defensive Rating**. It also breaks down Dean Oliver's **Four Factors** (Shooting, Turnovers, Rebounding, and Free Throws) into clear, comparative charts, allowing for quick analysis of how teams win games.

* **Interactive Player Stat Explorer:** This is the core of the platform. It allows for deep dives into player performance across the entire tournament. Users can filter by team and position, and most importantly, create their own scatter plots by selecting different metrics for the X and Y axes. Want to see which high-usage players are also the most efficient? Or which players get the most steals relative to their minutes played? This tool makes it possible in seconds.

* **Shot Attempt Charts & Offensive Engine:** To quickly understand a team's offensive style, the site includes shot distribution charts. It also features an "Offensive Engine" module that immediately highlights the top three players on any given team by Usage Percentage, showing who the offense truly runs through.

#### The "How": A Modern, Efficient Architecture

Building a "full-stack" website for a two-week tournament presented a unique challenge. A traditional, database-heavy approach would be too slow to develop and overkill for the short-term nature of the event. Instead, I opted for a modern, serverless, and highly efficient workflow.

The main design is a **"Static First"** approach. The backend is not a traditional server that's always running. Instead, it's a series of automated scripts.

1.  **Data Extraction (The Backend):** A Python script, which you can see in the [GitHub repository](https://github.com/jhsu12/jones_cup_backend), runs on a schedule. It calls several of the Jones Cup's internal API endpoints to gather all the raw data for teams, players, and game statistics.

2.  **Transformation & Calculation:** Once the raw data is fetched, the script cleans it, organizes it, and—most importantly—calculates all the advanced metrics. This includes everything from Usage Rate (USG) to True Shooting Percentage (TS%) and team-level stats.

3.  **Loading (The "Database"):** Instead of loading this data into a traditional database, the script saves the processed data as a series of optimized JSON files. These files act as a static, pre-computed database that is then uploaded to a cloud storage bucket.

4.  **The Frontend & Visualizations (D3.js):** The website's frontend is built with a focus on powerful, custom data visualization. Instead of using a large framework, it leverages the D3.js library to directly manipulate data and draw the complex, interactive charts that are central to the platform. When a user visits, the site fetches the small, pre-computed JSON files, and D3.js goes to work, creating the dynamic scatter plots, bar charts, and shot distribution maps. This approach provides complete control over the visualizations, making them both fast and highly tailored to the specific needs of basketball scouting. The website is a fast, modern single-page application. When a user visits, it doesn't query a slow database. It simply fetches the small, pre-computed JSON files. This makes loading data, filtering, and creating visualizations incredibly fast for the end-user.

To ensure the data remained current throughout the tournament, the entire process was automated. I set up a Cloud Scheduler to trigger the Python script every night after all the day's games were finished. This automation would automatically fetch the new game data, recalculate all the tournament-long statistics, and upload the updated JSON files to Cloud Storage. This meant that every morning, coaches and fans would wake up to a fully updated website reflecting the latest results without any manual intervention.

#### The Future: Integrating AI

This platform has built a strong foundation, but the work isn't done. The next phase of this project is to integrate AI to make these analytics even more powerful and intuitive.

* **Short-Term Goal: Conversational Data Analysis.** The next feature I plan to add is an AI-powered chatbox. This will allow coaches to ask complex questions in natural language and get immediate answers. For example, instead of manually filtering data, a coach could simply ask, *"Who has the highest 3-point percentage among all players with more than 50 three-point attempts?"* The AI would understand the query, process the data, and provide a direct answer instantly.

* **Mid-Term Goal: Automated Shot Tracking.** The next major step is to create an AI model that can analyze game footage. This model would be trained to automatically detect and record the on-court position of every shot taken by every player, along with whether it was a make or a miss. This would unlock a new dimension of analysis, automatically generating the kind of detailed shot charts and player heatmaps that are currently only available at the highest levels of professional basketball.

* **Long-Term Goal: Real-Time Strategic AI.** The ultimate vision for this platform is to evolve it into an in-game decision-making tool for coaches. By feeding live game data into a sophisticated AI model, the system could provide real-time suggestions for things like player substitutions based on fatigue and efficiency, identify opponent defensive schemes as they happen, and recommend adjustments to the game plan on the fly. This would transform the tool from a post-game analysis platform into a true digital assistant on the sidelines.

This project was a fantastic blend of my passions for basketball and technology. I hope it proves to be a valuable tool for the teams involved and for any fan who wants to look beyond the box score.
