NASA Space Biology Knowledge Engine
NASA Space Apps Challenge 2025 Submission - Solo System Team
An AI-powered research platform that transforms NASA's 608 bioscience publications into mission-critical insights for Artemis and Mars exploration programs.

📋 Overview
The Space Biology Knowledge Engine addresses a critical challenge in space exploration: synthesizing decades of fragmented NASA bioscience research into an integrated, accessible knowledge base. By analyzing 608 publications spanning microgravity physiology, radiation biology, space agriculture, and cellular adaptation, this platform enables evidence-based decision-making for mission planning, research prioritization, and crew health protocols.
Live Demo: https://drive.google.com/file/d/17eOt1QdUwB7Veo1R7z-EHZHO9BuUOPAZ/view?usp=sharing

🎯 Core Capabilities
AI-Powered Analysis

Natural Language Processing: Query the corpus using plain English ("What are radiation risks for Mars?")
Intelligent Summarization: Hugging Face BART Model synthesizes findings across multiple publications
Context-Aware Responses: AI considers publication relevance, research consensus, and knowledge gaps

Interactive Visualizations

Dynamic Dashboard: 10+ real-time charts tracking publication trends, topic distribution, and organism coverage
Knowledge Graph: A Visual network revealing interdisciplinary connections between research domains
Gap Analysis Radar: Quantitative assessment of research completeness across critical areas

Advanced Search & Filtering

Multi-Dimensional Filters: Topic, organism, year, mission parameters
Full-Text Search: Instantly locate publications by title, abstract, or keywords
Smart Results: Publication cards with metadata, abstracts, and direct links to sources

Extensible Data Architecture

CSV Import: Upload additional datasets from NASA OSDR, GeneLab, PubMed
URL Download: Fetch remote CSV files directly into the platform
Live Counter: Publication count updates automatically as data expands

Immersive Experience

Mars Audio: Authentic Perseverance rover recordings provide ambient space environment
Custom Branding: Solo System team logo integration
Professional UI: Dark blue/yellow/white theme optimized for readability and focus


🛠️ Technology Stack
Category: Technology Frontend Framework: React 18 with Hooks Data Visualization: Recharts, Custom SVG AI Integration: Hugging Face API (BART model)Data Processing Parse (CSV parsing) Styling: Tailwind CSS Icons: Lucide React Deployment: Vercel / Netlify

🚀 Quick Start
Prerequisites
bashNode.js 14+ and npm
Git
Installation
bash# Clone repository
git clone https://github.com/Marishov/nasa-space-biology-engine.git
cd nasa-space-biology-engine

# Install dependencies
npm install

# Start development server
npm start
Application opens at http://localhost:3000
Production Build
bash npm run build

📁 Project Structure
my-app/
├── public/
│   ├── audio/
│   │   └── mars-sound.wav      # Mars rover audio
│   ├── data/
│   │   └── SB_publication_PMC.csv  # NASA publications
│   ├── logo.png                # Solo System logo
│   └── index.html
├── src/
│   ├── App.js                  # Main application
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── package.json
└── README.md

🎨 Feature Specifications
Dashboard Tab

Publication Metrics: Total count (dynamically updated), high-impact studies, research topics
Temporal Analysis: Time-series visualization of publication output (2010-2024)
Topic Distribution: Bar chart showing research concentration across 12+ categories
Organism Coverage: Pie chart displaying model organism usage (Human, Mouse, Arabidopsis, etc.)
Gap Analysis Radar: Six-axis visualization quantifying research completeness:

Mars Gravity Effects: 35%
Long-Duration Missions: 45%
Combined Stressors: 50%
Countermeasure Efficacy: 70%
Genetic Factors: 55%
Multi-generational: 20%



Explore Tab

Real-Time Search: Instant filtering across 608+ publications
Multi-Axis Filters: Topic, organism, year, mission
Rich Publication Cards:

Full title and abstract
Author information and publication year
Topic and organism tags
Direct link to original source (PubMed)
Citation count and impact rating


Export Function: Download filtered results as CSV

AI Insights Tab

Query Interface: Natural language input field with example prompts
Pre-Configured Queries:

Microgravity research summary
Radiation biology findings
Plant growth in space
Research gaps and priorities


Smart Responses:

AI-generated summaries from Hugging Face BART
Fallback to local pattern-based analysis if API unavailable
Publication statistics and relevance metrics


Priority Analysis: Color-coded research gap indicators (Critical/Moderate/Well-Studied)

Knowledge Graph Tab

Visual Network: SVG-based interactive graph showing 8+ major research nodes
Connection Strength: Line thickness indicates interdisciplinary research volume
Topic Metrics:

Most Connected Topics (top 5 by publication count)
Cross-Disciplinary Links (Radiation ↔ DNA Damage, etc.)
Emerging Connections (newer research areas with growth potential)



Resources Tab

External Links: Direct access to NASA OSDR, Space Life Sciences Library, Task Book
Data Import Tools:

CSV file upload interface
URL-based CSV download
Import statistics and confirmation


About Section: Team information and project methodology


📊 Dataset
Source: NASA Biological and Physical Sciences Division
Total Publications: 608 (expandable via import tools)
Coverage Areas:

Microgravity effects on human physiology
Space radiation biology and DNA damage
Plant growth and space agriculture
Cellular and molecular adaptation mechanisms
Bone and muscle health countermeasures
Immune system function in spaceflight
Gene expression and epigenetic changes
Cardiovascular health in microgravity

Data Format: CSV with columns: Title, Link, Abstract, Year, Topic, Organism, Mission

🎯 Target Audiences
Research Scientists

Hypothesis Generation: Discover unexplored research questions through gap analysis
Literature Review: Quickly identify relevant prior work across 608 publications
Interdisciplinary Connections: Knowledge graph reveals cross-domain opportunities

Mission Planners & Architects

Evidence-Based Protocols: Access synthesized findings on crew health, nutrition, radiation protection
Risk Assessment: Quantitative data on biological challenges for Moon/Mars missions
Technology Requirements: Informed decisions on life support systems, medical equipment, countermeasure hardware

Program Managers

Investment Priorities: Gap analysis identifies under-researched critical areas
Portfolio Assessment: Track research progress across topics and time periods
ROI Justification: Evidence-based funding allocation for maximum mission impact


🔮 Future Enhancements
Planned Features:

 NASA OSDR API integration for primary experimental data
 Enhanced AI models (GPT-4, Claude) for deeper analysis
 PDF parsing for direct document upload
 Citation network visualization
 Collaborative annotation and note-taking
 Multi-format export (PDF reports, presentations)
 Mobile-responsive design optimization
 Multi-language support for international teams


🏆 NASA Space Apps Challenge Alignment
Challenge: Build a Space Biology Knowledge Engine
Solution Achievements:

✅ Summarizes 608 NASA bioscience publications with AI-powered analysis
✅ Enables interactive exploration through dynamic visualizations and filters
✅ Identifies knowledge gaps with quantitative completeness metrics
✅ Provides actionable insights synthesized across multiple studies
✅ Leverages cutting-edge AI (Hugging Face BART) and knowledge graphs
✅ Creates an intuitive, accessible interface for diverse stakeholders
✅ Supports extensibility through data import tools


👥 Team
Solo System Team
Baitur Marishov - Full Stack Development, AI Integration, Data Visualization, UX Design

📄 License
This project was developed for the NASA Space Apps Challenge 2025.
Source code available under the MIT License.

🙏 Acknowledgments

NASA Biological and Physical Sciences Division for publication dataset
NASA Space Apps Challenge 2025 organizers
Hugging Face for AI model infrastructure
Open source community (React, Recharts, Tailwind CSS, Papa Parse)


📞 Contact
Collaboration & Questions:

GitHub: @Marishov
Email: bajturmarisov2@gmail.com
Project Repository: nasa-space-biology-engine


Enabling evidence-based space exploration through intelligent research synthesis
Transforming decades of NASA bioscience research into mission-ready knowledge for humanity's journey to the Moon, Mars, and beyond.

Note: This README was collaboratively developed with AI assistance to optimize documentation quality under time constraints. All content has been reviewed, verified, and approved by the development team.
