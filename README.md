# Decentralized Betting Awareness Platform

A futuristic, cyberpunk-themed web application designed to combat illegal betting activities and support individuals struggling with gambling addiction. Built with cutting-edge technologies, this platform leverages blockchain, AI, and decentralized storage to ensure transparency, security, and accessibility.

## Overview

The Decentralized Betting Awareness Platform is a full-stack application that allows users to report illegal betting apps and influencers, access emergency support resources, and share experiences via decentralized video uploads. It also features a Companion AI chatbot for emotional support and an admin panel for managing content and influencers.

## Features

- **Illegal Betting Reporting**: Report illegal betting apps and influencers, with reports stored immutably on the blockchain (Sepolia testnet).
- **Influencer Leaderboard**: Reputation scores for influencers decrease based on reports, promoting accountability.
- **Companion AI Chatbot**: Provides motivational support and resources for gambling addiction recovery.
- **Emergency Support**: Tailored resources and country-specific links for scam victims.
- **Experience Sharing**: Upload and share videos via IPFS (Pinata) for decentralized storage.
- **Awareness Articles**: Admins can upload articles (PDFs and media) to educate users.
- **Admin Panel**: Manage influencers, content, and reports through a dedicated admin interface.

## Technologies Used

### Frontend
- **React.js** with **Material UI** for a sleek, cyberpunk-themed user interface.
- **Framer Motion** for animations.

### Backend
- **FastAPI** for a robust and scalable API.
- **MongoDB** for database management.
- **IPFS** (via Pinata) for decentralized video storage.
- **Web3.py** for blockchain interactions.

### Blockchain
- **Solidity** smart contracts deployed on the **Sepolia testnet**.

## Project Structure

```
decentralized-betting-awareness/
├── frontend/                # React.js frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── styles/          # CSS and theme files
│   │   └── App.js           # Main React app
│   └── public/              # Static assets
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py          # API routes and logic
│   │   ├── models.py        # Pydantic models
│   │   ├── utils.py         # Utility functions
│   │   └── contract_abi.json # Smart contract ABI
│   └── requirements.txt     # Backend dependencies
└── smart-contracts/         # Solidity contracts
    ├── BettingAwareness.sol # Main contract
    └── migrations/          # Deployment scripts
```

## Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.9 or higher)
- **MongoDB** (local or cloud instance)
- **MetaMask** (for blockchain interactions)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/decentralized-betting-awareness.git
   cd decentralized-betting-awareness
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following:
     ```
     ALCHEMY_API_URL=<your-alchemy-api-url>
     PRIVATE_KEY=<your-private-key>
     CONTRACT_ADDRESS=<deployed-contract-address>
     MONGO_URI=<your-mongodb-uri>
     HUGGINGFACE_API_TOKEN=<your-huggingface-api-token>
     ```

### Running Locally

1. Start the backend server:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Deployment

### Frontend
- Deployed via **Netlify**:
  - Build command: `npm run build`
  - Publish directory: `frontend/build`

### Backend
- Deployed via **Render** or any hosting service:
  - Start command: `uvicorn app.main:app`

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
