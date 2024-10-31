---
layout: post
title:  "Analysis of National Chengchi University (NCCU) Basketball Team's Offense"
date:   2021-12-12 04:31:40 +0000
permalink: /posts/:title
categories: [Basketball, UBA]
---
---

## Motivation & Issues

### Motivation
National Chengchi University (NCCU) won last year’s UBA Championship and has maintained strong performance:
- **Ranked 2nd** in overall standings and average points per game.
- Ranked **top 6** in both 2-point and 3-point shooting accuracy.

To understand NCCU's offensive traits, data from their first 6 games in the current season were recorded, capturing every offensive move. The goal of this analysis is to identify potential defensive strategies against them.


### Key Issues Explored
1. What is NCCU's offensive pace and shooting accuracy?
2. Which shooting areas show lower frequency or accuracy?
3. What are the proportions of different shooting types leading to scoring?
4. What are the offensive strengths and weaknesses of key players?

---

## Dataset

The dataset includes detailed records per possession:

- **Number:** Player’s jersey number.
- **Team:** Opponents (CCU, CHU, NTU, VNU, NTNU, FJU).
- **Shooting Form:** Types such as LayUp, Eat Cake, Low Post, Floater, Catch & Shoot, Dribble & Shoot.
- **Shooting Position:** Positions on the court.
- **Offense Type:** Categorized into Early, Set Play, Transition, and Second Chance.
- **Opponent Defense:** Defensive formations (H1, F1, H23, H32, F221, F122).
- **Result:** Outcome (In, Miss, Foul).
- **Time:** Time remaining on the shot clock.

| ![captionless image](/assets/nccu/shotchart.png)|
|:--:| 
| *Coordinate of the court* |

---

## Data Analysis Tools

### Visualization Techniques
Several charts were used for deeper analysis:
- **Shot Chart** and **Hot Zone Chart**: Indicate shooting frequency and accuracy across the court.
- **Radar Chart**: Visualizes shooting tendencies for different offensive forms.
- **Bar Chart**: Shows the success rate and foul ratio for each shooting form.

---

## Analysis Results

### Offensive Pace & Shooting Accuracy

For the entire team, **average offensive pace** was 10.03 seconds, with an **average shooting percentage of 40%**. Additional findings include:
- **Shooting percentage at above-average pace**: 37%
- **Shooting percentage at below-average pace**: 42%
  
#### Recommendations:
A defensive strategy should aim to slow down their offensive pace, potentially reducing their scoring efficiency.

#### Opponent-Specific Insights:
For each opponent, the difference in scoring based on pace was observed. For instance:
- **Against NTU**: Shooting percentage dropped from 53% (below average pace) to 40% (above average).
- **Against FJU**: Low difference with a 6% shooting percentage drop when playing at a slower pace.

### Shooting Distribution and Low-Accuracy Zones

Using the shot and hot zone charts:

- **Least shot attempted area**: Mid-range

| ![captionless image](/assets/nccu/least_rc.png)|
|:--:| 
| *Radar chart of the shooting location* |

- **Lowest shooting percentage zones**: Near the left 45-degree 3-point and mid-range areas.

| ![captionless image](/assets/nccu/least_hc.png)|
|:--:| 
| *Left wing has low shooting percentage* |

This shows that NCCU tends to avoid mid-range shots, likely due to lower success rates.

### Scoring Distribution by Shooting Form

**Top 3 shooting forms contributing to scores**:
1. LayUp
2. Catch & Shoot
3. Eat Cake (high-probability shots in the paint).

| ![captionless image](/assets/nccu/scoring_distribution.png)|
|:--:| 
| |

**Player Analysis**: Key players with high scoring frequency in these forms:

| ![captionless image](/assets/nccu/player_s.png)|
|:--:| 
| |
  
### Individual Player Strengths

#### Ai-Che Yu (游艾喆)
- **Top Shooting Forms**: LayUp, Dribble & Shoot, Floater.
- **Strength**: Strong around the basket, low shooting percentage from the perimeter.

| ![captionless image](/assets/nccu/yu.png)|
|:--:| 
| |

#### Cheng-Ya Zhang (張鎮衙)
- **Top Shooting Forms**: Catch & Shoot, LayUp, Dribble & Shoot.
- **Strength**:  An outside shooter but can also drive to the basket when pressured.

| ![captionless image](/assets/nccu/chang.png)|
|:--:| 
| |

#### Amdy Dieng(丁恩迪)
- **Top Shooting Forms**: Eat Cake, Low Post, LayUp.
- **Strength**: Dominates the paint with a high conversion rate, rarely shoots from outside.

| ![captionless image](/assets/nccu/di.png)|
|:--:| 
| |

---

## Summary

Key defensive strategies to counter NCCU's offense:
1. **Slow down their offensive tempo** to reduce their overall shooting percentage.
2. **Force them to shoot mid-range** by focusing perimeter defense and collapsing into the paint.
3. **Player-specific strategies**:
   - **Ai-Che You**: Encourage perimeter shots by playing off him, limiting his drive opportunities.
   - **Cheng-Ya Zhang**: Constant attention is needed; defenders should stay close.
   - **Amdy Dieng**: Keep him away from the basket and box out aggressively on rebounds to limit his second-chance points.

By focusing on these areas, teams can formulate a more effective defensive approach to challenge NCCU’s powerful offense.
