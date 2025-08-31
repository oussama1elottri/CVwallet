# CVWallet: A Decentralized Professional Identity Wallet

CVWallet is a proof-of-concept application demonstrating a new paradigm for professional verification. It empowers individuals to own, manage, and selectively share verified credentials and evidence of their skills, combining the cryptographic security of Verifiable Credentials (VCs) with the analytical power of Large Language Models (LLMs).

This repository contains the frontend prototype of the CVWallet experience, simulating the user journey of a candidate sharing their professional evidence with a potential employer.

## Core Concepts

CVWallet is built on a **Hybrid Proof Model** that provides a rich, trustworthy, and verifiable professional profile.

1.  **Verifiable Credentials (VCs):** At its core, CVWallet uses W3C standard Verifiable Credentials and Decentralized Identifiers (DIDs). These are cryptographically signed, issuer-backed statements (e.g., "Issued by University X: Degree = MSc") that provide immutable, hard-proof anchors for a professional's claims.

2.  **LLM Qualitative Analysis:** To move beyond simple claims, CVWallet integrates LLMs to perform contextual, human-readable evaluations of a candidate's private evidence (e.g., code repositories, project reports, performance reviews). The LLM acts as a qualitative oracle, augmenting VCs with rich, evidence-based skill assessments (e.g., "LLM analysis of GitHub repo shows high competency in asynchronous programming and API design").

## System Architecture (MVP Plan)

The planned architecture is designed for security, scalability, and trust.

-   **Frontend (This Prototype):** A React-based browser extension that serves as the user's wallet. It manages DIDs, connects to data sources (GitHub, etc.), and handles user consent.
-   **Backend (Confidential Compute):** For the MVP, the backend built on confidential compute infrastructure like AWS Nitro Enclaves. The candidate's private data is encrypted and processed within a secure enclave, which returns a signed attestation without exposing the raw data.
-   **LLM Oracle Engine:** A consensus-driven engine using multiple LLM models to analyze evidence. It produces a structured, aggregated score based on a predefined rubric, minimizing bias and improving reliability.
-   **Blockchain Layer:** While private data remains off-chain, hashes of attestations are anchored to a public blockchain (like Ethereum or Polygon). This creates a tamper-evident, publicly verifiable record of a credential's existence and integrity.

## User Workflow

The process is designed to be simple for the candidate and trustworthy for the employer.

```mermaid
flowchart LR
    A[Job page: "Apply with CVWallet"] --> B[CVWallet popup]
    B --> C{Candidate consent?}
    C -->|Yes| D[Collect local docs + VCs + Connectors]
    D --> E[Send encrypted payload to Oracle (Confidential Compute)]
    E --> F[LLM ensemble + static analyzers -> structured verdict]
    F --> G[Aggregate & sign attestation]
    G --> H[Return attestation to site (hash + metadata)]
    H --> I[Employer verifies attestation + displays score]
```

## Features (Prototype)

This prototype demonstrates the core candidate-facing experience:

-   **Step-by-Step Flow:** Guides the user through connecting, consenting, processing, and reviewing their credentials.
-   **Data Source Connection:** Simulates connecting to professional data sources.
-   **Consent Management:** A clear and explicit consent screen, giving the user full control over what they share.
-   **Evidence Review:** Allows the user to preview the information that will be used to generate the attestation.

## Technology Stack 

-   **Frontend:** React, TypeScript, Vite
-   **Dependencies:** `@google/genai` for generative AI features.
-   **Planned Backend:** Node.js, AWS Nitro Enclaves, Multiple LLM APIs
-   **Planned Blockchain:** W3C DIDs/VCs, Ethereum/Polygon

## Getting Started

To run this prototype locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd cvwallet-mvp_v0
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add any necessary API keys (e.g., for the Gemini service).
    ```
    VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
/
├─── App.tsx             # Main application component
├─── index.tsx           # Entry point for the React app
├─── components/         # Reusable UI components for each step of the flow
│    ├─── ConnectStep.tsx
│    ├─── ConsentStep.tsx
│    ├─── ...
│    └─── icons/
├─── services/
│    └─── geminiService.ts # Service for interacting with the Google Gemini API
└─── package.json        # Project dependencies and scripts
```

## Risks & Mitigation

This project acknowledges key challenges and plans for them:

-   **Algorithmic Bias:** Mitigated by using diverse calibration datasets, publishing fairness metrics, and allowing for human review and appeals.
-   **Gaming the System:** Countered by requiring issuer-signed VCs for high-value claims and performing provenance checks on evidence like Git history.
-   **Trust & Legitimacy:** Built through strict adherence to open standards (W3C), third-party audits, and full transparency in the verification process.

## Contributing

We welcome contributions! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.



