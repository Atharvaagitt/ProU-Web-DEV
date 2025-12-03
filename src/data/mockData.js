export const employees = [
    {
        id: 'emp1',
        name: 'Alice Johnson',
        role: 'Frontend Developer',
        avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random',
        email: 'alice@example.com'
    },
    {
        id: 'emp2',
        name: 'Bob Smith',
        role: 'Backend Developer',
        avatar: 'https://ui-avatars.com/api/?name=Bob+Smith&background=random',
        email: 'bob@example.com'
    },
    {
        id: 'emp3',
        name: 'Charlie Brown',
        role: 'Designer',
        avatar: 'https://ui-avatars.com/api/?name=Charlie+Brown&background=random',
        email: 'charlie@example.com'
    },
    {
        id: 'emp4',
        name: 'Diana Prince',
        role: 'Project Manager',
        avatar: 'https://ui-avatars.com/api/?name=Diana+Prince&background=random',
        email: 'diana@example.com'
    },
    {
        id: 'emp5',
        name: 'Evan Wright',
        role: 'DevOps Engineer',
        avatar: 'https://ui-avatars.com/api/?name=Evan+Wright&background=random',
        email: 'evan@example.com'
    }
];

export const initialTasks = [
    {
        id: 'task1',
        title: 'Design Dashboard UI',
        description: 'Create high-fidelity mockups for the main dashboard.',
        status: 'Completed',
        assigneeId: 'emp3',
        dueDate: '2023-10-25',
        reward: true
    },
    {
        id: 'task2',
        title: 'Implement Authentication',
        description: 'Setup JWT auth and login page.',
        status: 'In Progress',
        assigneeId: 'emp2',
        dueDate: '2023-11-01'
    },
    {
        id: 'task3',
        title: 'Frontend Component Library',
        description: 'Build reusable components using Tailwind.',
        status: 'In Progress',
        assigneeId: 'emp1',
        dueDate: '2023-10-30'
    },
    {
        id: 'task4',
        title: 'Database Schema Design',
        description: 'Define tables for users, tasks, and projects.',
        status: 'Completed',
        assigneeId: 'emp2',
        dueDate: '2023-10-20',
        reward: true
    },
    {
        id: 'task5',
        title: 'Client Meeting Preparation',
        description: 'Prepare slides for the weekly sync.',
        status: 'Pending',
        assigneeId: 'emp4',
        dueDate: '2023-11-05'
    },
    {
        id: 'task6',
        title: 'CI/CD Pipeline Setup',
        description: 'Configure GitHub Actions for automated deployment.',
        status: 'Pending',
        assigneeId: 'emp5',
        dueDate: '2023-11-10'
    },
    {
        id: 'task7',
        title: 'Fix Navigation Bug',
        description: 'Mobile menu not closing on selection.',
        status: 'Pending',
        assigneeId: 'emp1',
        dueDate: '2023-10-28'
    }
];
