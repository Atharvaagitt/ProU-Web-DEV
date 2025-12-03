import React, { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Mail, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Employees = () => {
    const { employees, tasks } = useTaskContext();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTaskCount = (empId) => tasks.filter(t => t.assigneeId === empId).length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
                <div className="relative w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search employees..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEmployees.map((emp) => (
                    <Card key={emp.id} className="overflow-hidden transition-all hover:shadow-md">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <img src={emp.avatar} alt={emp.name} className="h-12 w-12 rounded-full" />
                            <div className="flex flex-col">
                                <CardTitle className="text-lg">{emp.name}</CardTitle>
                                <CardDescription>{emp.role}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    {emp.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Briefcase className="h-4 w-4" />
                                    {getTaskCount(emp.id)} Active Tasks
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Badge variant="secondary">Full Time</Badge>
                                    <Badge variant="outline">Remote</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Employees;
