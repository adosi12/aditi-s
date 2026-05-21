import { google } from '@ai-sdk/google';
import { streamText, tool, convertToModelMessages } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const modelName = process.env.GEMINI_MODEL || process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-2.5-flash';

  const result = streamText({
    model: google(modelName),
    messages: await convertToModelMessages(messages),
    system: `
      You are Aditi Dosi's AI Portfolio Assistant (Copilot). 
      You are professional, technical, and slightly witty. 
      You know everything about Aditi's career, projects, and skills.

      Context about Aditi:
      - Role: Senior Analyst — Full Stack Developer at Deutsche Bank.
      - Experience: 
        - Deutsche Bank (Present): Java microservices (Axiom), React, TypeScript, GraphQL, JMX, Liquibase. Received "Rising Star" Award.
        - SmartInternz: Salesforce Developer & Android Trainee.
        - Persistent Systems: Martian Intern.
        - Palo Alto Networks: CyberSecurity Intern.
      - Skills:
        - Frontend: React, TypeScript, Next.js, Tailwind CSS, Redux.
        - Backend: Java, Axiom Framework, GraphQL, Node.js, Python, FastAPI.
        - Cloud/DevOps: GCP, AWS, Docker, Kubernetes, CI/CD, Liquibase.
        - Emerging Tech: Agentic AI, LangGraph, CrewAI, AutoGen, Blockchain.
      - Key Projects:
        - TaxMaster India: Gamified MCQ platform (Flutter, Firebase).
        - AI For Medicine: Medical concierge (FastAPI, Gemini AI, React).
        - Freehold Price Predictor: Real estate price prediction (Flask, ML, React).
        - Contestant Disposer: Sports celebrity image classification (OpenCV, ML).
        - CogCrafters: AI Assistant for Dementia Patients (AI, Voice Interface).
        - FarmerConnect: n8n AI Workflow platform for farmers.

      Rules:
      - Answer questions accurately based on the context.
      - If you don't know something, say you're not sure but can help with other things.
      - Use tools when appropriate (e.g., if asked for a resume, contact info, or to filter projects).
      - Keep responses concise and engaging.
      - Matches the site's Tailwind dark mode theme in your descriptions.
    `,
    tools: {
      downloadResume: tool({
        description: 'Provide a link to download Aditi\'s resume.',
        inputSchema: z.object({}),
        execute: async () => ({
          url: '/AditiDosi_Resume2025.pdf',
          message: 'You can download my resume here: [AditiDosi_Resume2025.pdf](/AditiDosi_Resume2025.pdf)',
        }),
      }),
      contactForm: tool({
        description: 'Provide contact information or social links.',
        inputSchema: z.object({}),
        execute: async () => ({
          email: 'aditidosi12@gmail.com',
          linkedin: 'https://www.linkedin.com/in/aditidosi/',
          github: 'https://github.com/adosi12',
          message: 'You can reach me via email at aditidosi12@gmail.com or find me on LinkedIn and GitHub.',
        }),
      }),
      filterProjects: tool({
        description: 'Filter projects by technology or category.',
        inputSchema: z.object({
          tech: z.string().describe('The technology to filter by (e.g., React, AI, Flutter)'),
        }),
        execute: async ({ tech }) => {
          // This is a mock response, in a real app you might redirect or update UI state
          return {
            message: `I found several projects using ${tech}. You should check out the Projects section on the main page!`,
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
