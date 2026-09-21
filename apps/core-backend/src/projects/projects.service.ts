export interface ProjectMock {
	id: string;
	challengeId: string;
	status: 'IN_PILOT';
	executionMode: 'DIRECT_RND' | 'DYNAMIC_HACKATHON';
}

export function getProjectMock(id: string): ProjectMock {
	return {
		id,
		challengeId: 'mock-challenge-001',
		status: 'IN_PILOT',
		executionMode: 'DIRECT_RND',
	};
}
