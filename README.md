# NASA Space Biology Knowledge Engine

**!!!This README was made with the help of AI as I needed to distribute my time mainly on code; however, I reviewed, checked, and made corrections on its final version**


**NASA Space Apps Challenge 2025 Submission**

An AI-powered interactive dashboard that transforms 608 NASA bioscience publications into actionable insights for scientists, mission planners, and space exploration stakeholders.


## 📋 Overview

The Space Biology Knowledge Engine addresses a critical challenge: making decades of NASA bioscience research accessible and actionable. With 608 publications spanning multiple research domains, our tool leverages AI and interactive visualizations to help users quickly identify research trends, knowledge gaps, and evidence-based insights.

### 🎯 Key Features

- **📊 Interactive Dashboard**: Real-time analytics with 10+ dynamic visualizations
- **🔍 Advanced Search Engine**: Multi-filter publication explorer with instant results
- **🤖 AI Research Assistant**: Natural language query system for intelligent insights
- **🕸️ Knowledge Graph**: Visual network showing research relationships and connections
- **📈 Gap Analysis**: Identifies under-researched areas requiring further investigation
- **💡 Actionable Insights**: Synthesized findings for mission planning and research direction

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Visualizations**: Recharts (charts), Custom SVG (knowledge graph)
- **Styling**: Tailwind CSS utilities
- **Icons**: Lucide React
- **Deployment**: [Vercel/Netlify/GitHub Pages]

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/nasa-space-biology-engine.git
cd nasa-space-biology-engine

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
nasa-space-biology-engine/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🎨 Features Deep Dive

### Dashboard Tab
- **Statistics Overview**: Total publications, research topics, missions, high-impact studies
- **Publication Trends**: Time-series analysis of research output
- **Topic Distribution**: Breakdown by research area (microgravity, radiation, plant biology, etc.)
- **Organism Analysis**: Research distribution across model organisms
- **Knowledge Gap Radar**: Visual representation of research completeness by area

### Explore Tab
- **Smart Search**: Full-text search across titles, abstracts, and keywords
- **Advanced Filters**: By topic, organism, year, and mission
- **Rich Results**: Publication cards with metadata, abstracts, and quick actions
- **Export Capability**: Download filtered results for offline analysis

### AI Insights Tab
- **Natural Language Queries**: Ask questions about the research corpus
- **Intelligent Summaries**: Synthesized findings across multiple publications
- **Quick Insights**: Pre-configured queries for common research questions
- **Priority Analysis**: Highlights critical research gaps requiring attention

### Knowledge Graph Tab
- **Interactive Visualization**: Network diagram of research relationships
- **Connection Analysis**: Identifies cross-disciplinary links
- **Emerging Trends**: Highlights new research connections
- **Topic Clustering**: Visual grouping of related research areas

## 📊 Data Source

This application processes **608 NASA bioscience publications** from the NASA Biological and Physical Sciences Division. The publications cover:

- Human spaceflight physiology
- Plant growth in microgravity
- Radiation biology
- Cellular and molecular responses
- Countermeasure development
- Life support systems

## 🎯 Target Audiences

### Scientists & Researchers
- Generate new hypotheses based on existing research
- Identify gaps in current knowledge
- Find relevant prior work quickly

### Mission Planners & Architects
- Access evidence-based insights for Moon and Mars missions
- Understand biological risks and countermeasures
- Make informed decisions about crew health protocols

### Program Managers
- Identify investment opportunities
- Track research progress over time
- Assess research portfolio coverage

## 🔮 Future Enhancements

- [ ] Integration with NASA OSDR for primary data access
- [ ] Real-time AI using OpenAI/Claude API
- [ ] PDF text extraction and processing
- [ ] Citation network analysis
- [ ] Collaborative annotation features
- [ ] Export to various formats (CSV, PDF reports)
- [ ] Multi-language support
- [ ] Mobile app version


### Challenge Goals Addressed

✅ Summarizes 608 NASA bioscience publications  
✅ Enables interactive exploration of research impacts  
✅ Identifies knowledge gaps and research priorities  
✅ Provides actionable insights for mission planning  
✅ Leverages AI and knowledge graphs  
✅ Creates accessible, user-friendly interface  

## 👥 Team

- **[Baitur Marishov]** - Full Stack Development, AI Integration, Data Visualization

## 📄 License

This project is developed for the NASA Space Apps Challenge 2025. The source code is available under the MIT License.

## 🙏 Acknowledgments

- NASA Biological and Physical Sciences Division for the research data
- NASA Space Apps Challenge organizers
- Open source community for amazing tools and libraries

## 📞 Contact

For questions or collaboration opportunities:
- GitHub: [@Marishov](https://github.com/Marishov)
- Email: bajturmarisov2@gmail.com

---

**Made with 💜 for space exploration and scientific discovery**

*Enabling humanity's journey to the Moon, Mars, and beyond through data-driven insights*

