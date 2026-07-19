const API_BASE = 'http://localhost:8000/api';

export interface OrchestratorResponse {
    intent: string;
    selected_agents: string[];
    message: string;
}

export interface NavigationResponse {
    gate: string;
    walking_time: string;
    crowd: string;
    status: string;
}

export interface CrowdResponse {
    zone: string;
    crowd_level: string;
    prediction: string;
}

export interface EmergencyResponse {
    priority: string;
    recommended_action: string;
    eta: string;
}

export interface AccessibilityResponse {
    route: string;
    warnings: string[];
}

async function apiRequest<T>(endpoint: string, payload?: unknown): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload || {}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error(`API call failed to: ${url}`, error);
        throw error;
    }
}

export async function callOrchestrator(query: string): Promise<OrchestratorResponse> {
    return apiRequest<OrchestratorResponse>('/orchestrator', { query });
}

export async function callNavigation(query?: string): Promise<NavigationResponse> {
    return apiRequest<NavigationResponse>('/navigation', { query });
}

export async function callCrowd(query?: string): Promise<CrowdResponse> {
    return apiRequest<CrowdResponse>('/crowd', { query });
}

export async function callEmergency(query?: string): Promise<EmergencyResponse> {
    return apiRequest<EmergencyResponse>('/emergency', { query });
}

export async function callAccessibility(query?: string): Promise<AccessibilityResponse> {
    return apiRequest<AccessibilityResponse>('/accessibility', { query });
}
