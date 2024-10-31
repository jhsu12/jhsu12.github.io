---
layout: post
title:  "Watching a Game: Offensive Score Sheets | Basketball on Paper Ch2"
date:   2022-01-22 04:31:40 +0000
permalink: /posts/:title
categories: [Basketball]
---


This chapter introduces the offensive score sheets and leads to the concept of possessions. After understanding how to calculate possessions we can then evaluate teams by their offensive rating and defensive rating.

Offensive Score Sheets
----------------------

An offensive score sheet records all most everything that happens with the ball, including the passes, the dribbles, the shots, the rebounds, the steals, the fouls, etc. For me it’s like a more detailed play-by-play transcript of the game.

Let’s take [1977 NBA finals G4](https://youtu.be/E9XdKW-4h0g) as an example to demonstrate how Dean Oliver records the score sheet.

|![R](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*jCKxRn8Vxr5N5Jw23xvEpw.jpeg) |
|:--:| 
| *Rosters of the Bulls and the Jazz* |

| ![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*U-5G-pJZD2ilyQHLSag5dw.jpeg) |
|:--:| 
|  |



The Jazz got the first possession. Player 3 had the ball and passed to Player 12, who gave it back to Player 3. Then he passed to Player 14 and Player 14 passed to Player 12 who dribbled. The dribble (D) is usually reserved for when the dribbling is used to gain significant ground, not just a dribble to get balance or a dribble that doesn’t go anywhere beyond where the player is standing.

After Player 12 dribbled, he passed the ball to Player 32 who missed a shot from location B. A missing shot symbolized by the horizontal line and the location of the shot( — location). A made shot without an assist is denoted by (+location), with an assist is denoted by (++location).

| ![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*1w-bBcMfHr-Gnybxp5mHeQ.jpeg) |
|:--:| 
| *R means lay-ups from right side, L for left side. D means dunks.* |



Player 3 was there to rebound (R indicating a rebound), getting it then back out to Player 14 and to Player 12 to reset up on the dribble. He then passed the ball to Player 3 who missed the shot from location Y. The point of the Jazz stayed at 0, the whole possession was ended.

The Important Lesson of the Score Sheet: Possession
---------------------------------------------------

In a game, a team alternates possession with its opponent so that, at the end of the game, each team has just about the same number of possessions on which to try to score. For games involving running or trapping teams, that number of possessions will be high — more than one hundred or 110 in the NBA. For walk-it-up teams, that number of possessions will be low — sometimes fewer than eighty.

How to estimate possession with only FGA, OREB, TOV and FTA?

> **Possessions = FGA-OREB+TOV+0.4*FTA**

It is convenient (and almost correct) to think that there are only three ways for a possession to end: a field goal attempt that is not rebounded by the offense (either a make or a defensive rebound of a miss), a turnover, or some free throws.

We can count these events using some basic stats. A field goal attempt that isn’t rebounded by the offense is simply **FGA-OREB.** A turnover is already counted as **TOV**. Free throws that end possessions are not as well-recorded. Some free throws come in pairs, and the first of the pair can’t end the possession. Some free throws complete three-point plays, which means that the possession is already counted by FGA-OREB term. Dean found that about **40 percent of free throw attempts** end possessions.

A more accurate but complicated formula to estimate possession is

> **Possessions =**
> 
> **FGA-(OREB/ (OREB+DDREB) ) * (FGA-FGM)*1.07+TOV+0.4*FTA**

where DDREB represents the defensive rebounds by the opponents.

Points Per Possession
---------------------

After understanding how to estimate possession with simple stats, we can now evaluate a team’s offensive and defensive ratings. An Offensive Rating is the scoring points per 100 possessions. A Defensive Rating is the scoring points of the opponent per 100 possessions.

A team offense is referred to as good. it’s because they’re efficient, not because they score a lot of points. Let’s say the average score of Team A is 119.9 points per game. The average possessions of Team A is 116.9 possessions. Compared to the average score of Team B 89.0 points and the average possessions per game 86.4. If we just focus on how many points a team scored, we’ll ignore how much effort (possessions) a team have made to score. Offensive Rating is a more objective way to evaluate a team offense. The Offensive Rating of Team A is 102.5 points, where Team B is 103.2 points. According to Offensive Rating, we can know that Team B is slightly more efficient than Team A.