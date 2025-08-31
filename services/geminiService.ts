
import { GoogleGenAI, Type } from "@google/genai";
import { EvidenceSource, Attestation } from '../types';

// This function simulates a call to a secure backend that uses the Gemini API.
// In a real application, I will call the API in a secure, confidential environment.
export const generateAttestation = async (evidence: EvidenceSource[]): Promise<Attestation> => {
  // // --- MOCK DATA FOR DEMO PURPOSES ---
  // console.log("Simulating secure processing and Gemini API call with evidence:", evidence);

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     const mockAttestation: Attestation = {
  //       summary: "The candidate demonstrates strong proficiency in modern backend development, with significant evidence of building scalable and well-tested REST APIs in Golang. Their work shows a consistent application of asynchronous patterns and a solid understanding of microservice architecture. There is also foundational knowledge in DevOps practices, including containerization.",
  //       skills: [
  //         {
  //           skill: "Golang Microservices",
  //           score: 92,
  //           evidence: "Implemented several microservices with clear domain separation and RPC communication in the 'go-microservices-project' repository."
  //         },
  //         {
  //           skill: "REST API Design",
  //           score: 88,
  //           evidence: "Authored robust REST APIs adhering to OpenAPI specs, including rate-limiting and JWT authentication, as seen in performance reviews."
  //         },
  //         {
  //           skill: "Test Coverage",
  //           score: 78,
  //           evidence: "Consistently achieved over 75% test coverage in Go projects, utilizing both unit and integration tests."
  //         },
  //         {
  //           skill: "Docker & Containerization",
  //           score: 85,
  //           evidence: "Provided Dockerfiles for all services, demonstrating proficiency in creating reproducible build and runtime environments."
  //         }
  //       ]
  //     };
  //     resolve(mockAttestation);
  //   }, 4000); // Simulate a 4-second processing time
  // });

  
  // --- REAL GEMINI API IMPLEMENTATION ---


  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const evidenceString = evidence
    .map(e => `- ${e.type}: ${e.identifier}`)
    .join('\n');

  const prompt = `
    You are an expert technical skills evaluator for a system called CVWallet. Your task is to analyze the provided evidence sources and generate a skills attestation for a software engineering candidate.
    
    The evidence sources are:
    ${evidenceString}

    Based on this evidence, generate a professional, evidence-based skills attestation. The output must be a JSON object that strictly adheres to the provided schema. Do not include any markdown formatting like \`\`\`json.

    Your response must contain a 'summary' and a 'skills' array. The summary should be a concise, professional paragraph. Each item in the skills array should include the 'skill' name, a 'score' from 0-100, and a brief 'evidence' string citing where the skill was observed.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A concise, professional paragraph summarizing the candidate's skills."
            },
            skills: {
              type: Type.ARRAY,
              description: "An array of skills with scores and evidence.",
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: {
                    type: Type.STRING,
                    description: "The name of the technical skill."
                  },
                  score: {
                    type: Type.INTEGER,
                    description: "The assessed score for the skill, from 0 to 100."
                  },
                  evidence: {
                    type: Type.STRING,
                    description: "A brief sentence explaining the evidence for the skill assessment."
                  }
                },
                required: ["skill", "score", "evidence"]
              }
            }
          },
          required: ["summary", "skills"]
        },
      },
    });

    const jsonString = response.text.trim();
    const result: Attestation = JSON.parse(jsonString);
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate attestation from Gemini API.");
  }
  
};
